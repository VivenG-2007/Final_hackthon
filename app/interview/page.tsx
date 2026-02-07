"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useUser } from "@clerk/nextjs";
import { Mic, MicOff, Video, VideoOff, StopCircle, RefreshCw, Webcam, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import dynamic from 'next/dynamic';
import { fetchWithFallback, MOCK_DATA } from '../lib/api-config';

// Lazy load Background component for better initial performance
const Background = dynamic(() => import('../../components/Background'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-background -z-10" />
});

export default function MockInterview() {
  const { isLoaded, user } = useUser();
  const [active, setActive] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [transcript, setTranscript] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const recognitionRef = useRef<any>(null);
  const isRecognizingRef = useRef(false);

  // Robust Text to Speech Function
  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined') return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.name.includes('Google UK English Female') || v.name.includes('Samantha')) || voices[0];
    if (voice) utterance.voice = voice;

    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.volume = 1;

    // Optional: Pause recognition while speaking to avoid feedback loop
    const wasMicOn = micOn;
    if (wasMicOn) setMicOn(false);

    utterance.onend = () => {
      if (wasMicOn && active) setMicOn(true);
    };

    window.speechSynthesis.speak(utterance);
  }, [micOn, active]);

  // Safe Recognition Methods
  const safeStartRecognition = useCallback(() => {
    if (recognitionRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current.start();
        isRecognizingRef.current = true;
      } catch (e) {
        console.warn("Recognition start skipped:", e);
      }
    }
  }, []);

  const safeStopRecognition = useCallback(() => {
    if (recognitionRef.current && isRecognizingRef.current) {
      try {
        recognitionRef.current.stop();
        isRecognizingRef.current = false;
      } catch (e) {
        console.warn("Recognition stop skipped:", e);
      }
    }
  }, []);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            handleUserResponse(event.results[i][0].transcript);
          }
        }
      };

      recognition.onstart = () => {
        isRecognizingRef.current = true;
      };

      recognition.onend = () => {
        isRecognizingRef.current = false;
        // Auto-restart with a slight delay to avoid 'aborted' race conditions
        if (micOn && active) {
          setTimeout(() => {
            if (micOn && active) safeStartRecognition();
          }, 300);
        }
      };

      recognition.onerror = (event: any) => {
        // Filter out noisy/expected errors
        if (event.error === 'aborted' || event.error === 'no-speech') return;

        console.error("Speech Protocol Error:", event.error);
        if (event.error === 'not-allowed') setMicOn(false);
      };
    }

    return () => {
      safeStopRecognition();
      window.speechSynthesis.cancel();
    };
  }, [active, micOn]); // Added micOn to sync restart logic safely

  // Mic Toggle Effect
  useEffect(() => {
    if (micOn && active) {
      safeStartRecognition();
    } else {
      safeStopRecognition();
    }
  }, [micOn, active, safeStartRecognition, safeStopRecognition]);

  // Camera Toggle Effect
  useEffect(() => {
    if (camOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch(() => setCamOn(false));
    } else {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [camOn]);

  const handleUserResponse = async (userText: string) => {
    if (!userText.trim()) return;

    setTranscript(prev => [...prev, { role: 'user', text: userText }]);
    const userId = user?.id || 'user_demo';

    try {
      const data = await fetchWithFallback(
        '/api/webhook/voice/process',
        {
          method: 'POST',
          body: JSON.stringify({
            user_id: userId,
            data: {
              transcript: userText,
              current_question: transcript.at(-1)?.text || "",
              context: {
                question_index: transcript.filter(t => t.role === 'ai' && !t.isSystem).length,
                total_questions: config.num_questions,
                next_question: questions[transcript.filter(t => t.role === 'ai' && !t.isSystem).length]?.text || "Interview Complete"
              }
            }
          })
        },
        MOCK_DATA.interview.voice_process
      );

      if (data.evaluation) {
        setTranscript(prev => [...prev, {
          role: 'ai',
          text: `✓ Analysis complete`,
          evaluation: data.evaluation,
          isSystem: true
        }]);
      }

      if (data.response_text) {
        setTimeout(() => {
          setTranscript(prev => [...prev, { role: 'ai', text: data.response_text }]);
          speak(data.response_text);
        }, 500);
      }
    } catch (e) {
      console.error(e);
      setTranscript(prev => [...prev, { role: 'ai', text: "✓ Answer recorded", isSystem: true }]);
    }
  };

  const [config, setConfig] = useState({
    domain: "frontend",
    role: "",
    difficulty: "intermediate",
    num_questions: 5
  });

  const startInterview = async () => {
    setActive(true);
    setCamOn(true);
    setMicOn(true);
    const userId = user?.id || 'user_demo';

    try {
      const data = await fetchWithFallback(
        '/api/webhook/interview/start',
        {
          method: 'POST',
          body: JSON.stringify({
            user_id: userId,
            data: {
              domain: config.domain,
              role: config.role,
              difficulty: config.difficulty,
              num_questions: config.num_questions
            }
          })
        },
        MOCK_DATA.interview.session
      );

      if (data.questions) setQuestions(data.questions);

      const firstQuestion = data.questions?.[0]?.text || "Tell me about yourself.";
      setTranscript([{ role: 'ai', text: firstQuestion }]);

      // READ FIRST QUESTION
      setTimeout(() => speak(firstQuestion), 1000);

    } catch (e) {
      const msg = "Initial protocol engaged. Tell me about your background.";
      setTranscript([{ role: 'ai', text: msg }]);
      speak(msg);
    }
  };

  const endInterview = () => {
    setActive(false);
    setCamOn(false);
    setMicOn(false);
    setTranscript([]);
    window.speechSynthesis.cancel();
  };

  const [userInput, setUserInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [transcript]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  if (!isLoaded || !isMounted) return <div className="min-h-screen flex items-center justify-center">Loading Systems...</div>;

  const handleSendText = () => {
    if (!userInput.trim()) return;
    handleUserResponse(userInput);
    setUserInput('');
  };

  return (
    <div className="min-h-screen relative transition-colors duration-300 font-sans">
      <Background />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 pb-12">

        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[var(--primary-cyan)]/10 border border-[var(--primary-cyan)]/20">
            <Video className="w-5 h-5 text-[var(--primary-cyan)]" />
            <span className="text-xs font-black text-[var(--primary-cyan)] uppercase tracking-widest">AI Interview Pilot</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight bg-gradient-to-r from-[var(--primary-blue)] via-[var(--primary-purple)] to-[var(--primary-pink)] bg-clip-text text-transparent">
            Scale Your Potential.
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg font-medium">
            Practice real-time voice interviews with our sophisticated AI. Get precision scoring and feedback instantly.
          </p>
        </header>

        <div className="flex flex-col gap-10 min-h-[600px]">

          {/* TOP SECTION: Video / Camera */}
          <section className="flex flex-col gap-6 max-w-5xl mx-auto w-full" aria-label="Visual Interaction Area">
            <div className="aspect-video glass rounded-[2.5rem] relative overflow-hidden bg-black/40 border border-white/10 shadow-2xl transition-all duration-700">
              {camOn ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" aria-label="Camera Feed" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                    <Webcam className="w-10 h-10 text-white" />
                  </div>
                  <p className="font-black uppercase tracking-widest text-[10px]">Visual Standby</p>
                </div>
              )}

              <div className="absolute top-6 left-6 z-20">
                <div className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 ${active ? 'bg-red-500 text-white' : 'bg-white/10 text-white'}`}>
                  <div className={`w-2 h-2 rounded-full ${active ? 'bg-white animate-pulse' : 'bg-white/30'}`} />
                  {active ? 'LIVE SESSION' : 'SYSTEM IDLE'}
                </div>
              </div>
            </div>

            <div className="glass rounded-[2rem] p-4 flex flex-wrap items-center justify-center gap-4 border border-white/10">
              <button
                onClick={() => setMicOn(!micOn)}
                aria-label={micOn ? "Turn off Microphone" : "Turn on Microphone"}
                className={`p-6 rounded-2xl transition-all ${micOn ? 'bg-[var(--primary-cyan)] text-white shadow-lg' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
              >
                {micOn ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
              </button>

              <button
                onClick={() => setCamOn(!camOn)}
                aria-label={camOn ? "Turn off Camera" : "Turn on Camera"}
                className={`p-6 rounded-2xl transition-all ${camOn ? 'bg-[var(--primary-blue)] text-white shadow-lg' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
              >
                {camOn ? <Video className="w-8 h-8" /> : <VideoOff className="w-8 h-8" />}
              </button>

              {active && (
                <button
                  onClick={endInterview}
                  aria-label="Terminate Interview Session"
                  className="px-10 py-6 bg-red-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
                >
                  <StopCircle className="w-5 h-5" /> Terminate
                </button>
              )}
            </div>
          </section>

          {/* BOTTOM SECTION: Chat / Deployment Config */}
          <section className="w-full" aria-label="Control and Transcript Area">
            {!active ? (
              <div className="glass rounded-[2.5rem] p-10 flex flex-col border border-white/10 shadow-2xl relative overflow-hidden max-w-4xl mx-auto mb-20 animate-enter">
                <h2 className="text-3xl font-black mb-10 flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--primary-cyan)] to-[var(--primary-blue)]">
                    <RefreshCw className="w-6 h-6 text-white" />
                  </div>
                  Deployment Config
                </h2>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Professional Role</label>
                    <input
                      type="text"
                      value={config.role}
                      onChange={(e) => setConfig({ ...config, role: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold placeholder:opacity-20 focus:border-[var(--primary-cyan)]/50 transition-all"
                      placeholder="e.g. Lead Architect"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Industry Domain</label>
                    <select
                      value={config.domain}
                      onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold focus:border-[var(--primary-cyan)]/50 transition-all cursor-pointer"
                    >
                      <option value="frontend">Frontend Architecture</option>
                      <option value="backend">Backend Engineering</option>
                      <option value="fullstack">Full Stack Strategy</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3 mb-10">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Number of Questions</label>
                    <span className="text-[var(--primary-cyan)] font-black">{config.num_questions}</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={config.num_questions}
                    onChange={(e) => setConfig({ ...config, num_questions: parseInt(e.target.value) })}
                    className="w-full accent-[var(--primary-cyan)] h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer"
                  />
                </div>

                <button
                  onClick={startInterview}
                  className="w-full py-6 bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all hover:bg-[var(--primary-blue)]"
                >
                  Initiate Protocol
                </button>
              </div>
            ) : (
              <div className="glass rounded-[2.5rem] flex flex-col border border-white/10 shadow-2xl relative overflow-hidden max-w-5xl mx-auto h-[500px] mb-20 animate-enter">
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                  {transcript.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-3 animate-enter`} style={{ animationDelay: `${i * 0.05}s` }}>
                      <div className={`max-w-[85%] p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed ${msg.role === 'user'
                        ? 'bg-[var(--primary-cyan)]/20 text-[var(--primary-cyan)] rounded-tr-none border border-[var(--primary-cyan)]/20 glass shadow-sm'
                        : msg.isSystem
                          ? 'bg-[var(--primary-purple)]/10 text-[var(--primary-purple)] rounded-2xl border border-[var(--primary-purple)]/10 italic text-xs'
                          : 'bg-white/5 border border-white/10 rounded-tl-none glass'
                        }`}>
                        {msg.text}
                      </div>

                      {msg.role === 'ai' && msg.evaluation && (
                        <div className="w-full glass p-6 rounded-[2rem] border-l-4 border-[var(--primary-cyan)] shadow-xl animate-enter">
                          <div className="flex justify-between items-center mb-6">
                            <span className="text-[10px] font-black text-[var(--primary-cyan)] uppercase tracking-widest">Performance Metrics</span>
                            <span className="text-3xl font-black bg-gradient-to-r from-[var(--primary-cyan)] to-[var(--primary-blue)] bg-clip-text text-transparent">{msg.evaluation.score}%</span>
                          </div>
                          <p className="text-xs font-medium italic opacity-70 mb-4">{msg.evaluation.feedback}</p>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-green-500/10 p-4 rounded-2xl border border-green-500/10">
                              <p className="text-[10px] font-black text-green-400 mb-2 uppercase tracking-tight">Strengths</p>
                              <ul className="text-[10px] opacity-70 space-y-1">
                                {msg.evaluation.strengths?.map((s: string, idx: number) => <li key={idx}>• {s}</li>)}
                              </ul>
                            </div>
                            <div className="bg-orange-500/10 p-4 rounded-2xl border border-orange-500/10">
                              <p className="text-[10px] font-black text-orange-400 mb-2 uppercase tracking-tight">Focus Area</p>
                              <ul className="text-[10px] opacity-70 space-y-1">
                                {msg.evaluation.improvements?.map((im: string, idx: number) => <li key={idx}>• {im}</li>)}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-white/5 bg-black/20">
                  <div className="flex gap-4 p-2 bg-black/40 rounded-[1.2rem] border border-white/10 max-w-4xl mx-auto focus-within:border-[var(--primary-cyan)]/40 transition-all">
                    <input
                      type="text"
                      className="flex-1 bg-transparent px-6 py-3 outline-none text-sm font-medium"
                      placeholder="Input Protocol..."
                      value={userInput}
                      aria-label="Text Input for Interview Response"
                      onChange={(e) => {
                        setUserInput(e.target.value);
                        if (micOn) setMicOn(false);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                    />
                    <button
                      onClick={handleSendText}
                      aria-label="Send Text Response"
                      className="w-12 h-12 bg-[var(--primary-cyan)] rounded-xl flex items-center justify-center text-white transition-transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                      <ChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
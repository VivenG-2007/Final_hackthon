"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from "@clerk/nextjs";
import { Mic, MicOff, Video, VideoOff, MessageSquare, Play, StopCircle, RefreshCw, Webcam, Sparkles, ChevronRight } from 'lucide-react';
import Background from '../../components/Background';
import { fetchWithFallback, MOCK_DATA } from '../lib/api-config';

export default function MockInterview() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [active, setActive] = useState(false);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [transcript, setTranscript] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            const finalTranscript = event.results[i][0].transcript;
            handleUserResponse(finalTranscript);
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognitionRef.current.onend = () => {
        if (micOn) recognitionRef.current.start();
      };
    }
  }, [micOn]); // Fixed dependency

  // Toggle Speech Recognition
  useEffect(() => {
    if (micOn) {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error("Speech Recognition Start Error:", e);
      }
      setIsListening(true);
    } else {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
  }, [micOn]);

  // Toggle Camera
  useEffect(() => {
    if (camOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        })
        .catch((err) => {
          console.error("Camera Error:", err);
          setCamOn(false);
        });
    } else {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(t => t.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [camOn]);

  const handleUserResponse = async (userText: string) => {
    setTranscript(prev => [...prev, { role: 'user', text: userText }]);
    const userId = user?.username || user?.id || 'user_demo';

    try {
      const data = await fetchWithFallback(
        '/api/webhook/voice/process',
        {
          method: 'POST',
          body: JSON.stringify({
            user_id: userId,
            data: {
              transcript: userText,
              current_question: transcript[transcript.length - 1]?.text || "",
              context: {
                question_index: 0,
                total_questions: 5
              }
            }
          })
        },
        MOCK_DATA.interview.voice_process
      );

      if (data.response_text) {
        setTranscript(prev => [...prev, { role: 'ai', text: data.response_text }]);
      }

    } catch (e) {
      console.error(e);
      setTranscript(prev => [...prev, { role: 'ai', text: "That's interesting. Tell me more about your experience." }]);
    }
  };

  const startInterview = async () => {
    setActive(true);
    setCamOn(true);
    setMicOn(true);
    const userId = user?.username || user?.id || 'user_demo';

    try {
      const data = await fetchWithFallback(
        '/api/webhook/interview/start',
        {
          method: 'POST',
          body: JSON.stringify({
            user_id: userId,
            data: {
              domain: "frontend",
              role: "React Developer",
              difficulty: "intermediate",
              num_questions: 5
            }
          })
        },
        MOCK_DATA.interview.session
      );

      if (data.interview_id) setInterviewId(data.interview_id);

      const firstQuestion = data.questions?.[0]?.text || "Tell me about yourself.";
      setTranscript([{ role: 'ai', text: firstQuestion }]);

    } catch (e) {
      console.error(e);
      setTranscript([{ role: 'ai', text: "Hello! I'm your AI interviewer. Let's start with: Tell me about a challenging technical problem you solved recently." }]);
    }
  };

  const endInterview = () => {
    setActive(false);
    setCamOn(false);
    setMicOn(false);
    setTranscript([]);
    setInterviewId(null);
  };

  const [userInput, setUserInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleSendText = () => {
    if (!userInput.trim()) return;
    handleUserResponse(userInput);
    setUserInput('');
  };

  // Switch to Text Mode - Disable Voice
  const handleTextInputChange = (val: string) => {
    setUserInput(val);
    if (val.trim().length > 0 && micOn) {
      setMicOn(false);
    }
  };

  const handleInputFocus = () => {
    if (micOn) setMicOn(false);
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      <Background />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-24 pb-12">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Video className="w-5 h-5 text-cyan-500" />
            <span className="text-sm font-semibold text-cyan-500">AI Mock Interview</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
            Interview Simulator
          </h1>
          <p className="opacity-70 max-w-2xl mx-auto text-lg">
            Practice real-time technical interviews with our advanced voice-enabled AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[500px] lg:h-[650px]">

          {/* Main Interface (Video/Controls) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Video Area */}
            <div className="flex-1 glass card-shadow rounded-2xl relative overflow-hidden bg-black/40 flex items-center justify-center group hover:shadow-cyan-500/10 hover:border-cyan-500/30 transition-all duration-500">
              {camOn ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
              ) : (
                <div className="flex flex-col items-center opacity-50">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <Webcam className="w-10 h-10" />
                  </div>
                  <p>Camera is off</p>
                </div>
              )}

              {/* Overlay Status */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 ${active ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-500/50 text-white'}`}>
                  <div className={`w-2 h-2 rounded-full ${active ? 'bg-white' : 'bg-gray-400'}`} />
                  {active ? 'LIVE' : 'IDLE'}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="h-24 glass card-shadow rounded-2xl flex items-center justify-center gap-4 md:gap-8 px-4 hover:shadow-cyan-500/10 transition-all duration-500">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`p-4 rounded-full transition-all hover:scale-110 active:scale-95 ${micOn ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-red-500 text-white hover:bg-red-600'}`}
              >
                {micOn ? <Mic className="w-6 h-6 animate-pulse" /> : <MicOff className="w-6 h-6" />}
              </button>

              {!active ? (
                <button
                  onClick={startInterview}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white rounded-full font-bold shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Start Interview
                </button>
              ) : (
                <button
                  onClick={endInterview}
                  className="px-8 py-4 bg-red-500 text-white rounded-full font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30"
                >
                  <StopCircle className="w-5 h-5" />
                  End Session
                </button>
              )}

              <button
                onClick={() => setCamOn(!camOn)}
                className={`p-4 rounded-full transition-all hover:scale-110 active:scale-95 ${camOn ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-red-500 text-white hover:bg-red-600'}`}
              >
                {camOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Transcript / AI Avatar Area */}
          <div className="glass card-shadow rounded-2xl p-6 flex flex-col h-full hover:shadow-blue-500/10 transition-all duration-500">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">AI Interviewer</h3>
                <p className="text-xs opacity-60">Status: {active ? (micOn ? "Listening..." : "Waiting") : "Offline"}</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar mb-4">
              {transcript.length === 0 && (
                <div className="text-center opacity-50 mt-10">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Start the interview to begin the conversation.</p>
                </div>
              )}
              {transcript.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                    ? 'bg-cyan-500/20 text-cyan-200 rounded-tr-none border border-cyan-500/20'
                    : 'bg-white/5 border border-white/10 rounded-tl-none'
                    }`}>
                    {msg.text}
                  </div>

                  {msg.role === 'ai' && msg.evaluation && (
                    <div className="max-w-[90%] w-full glass p-4 rounded-xl border-l-4 border-cyan-500 animate-in slide-in-from-left-2 duration-300">
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Question Stats</span>
                          <div className="h-4 w-[1px] bg-white/10" />
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${msg.evaluation.score >= 80 ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                            Grade: {msg.evaluation.grade}
                          </span>
                        </div>
                        <span className="text-lg font-black text-white">{msg.evaluation.score}%</span>
                      </div>

                      <p className="text-xs opacity-80 mb-3 italic">"{msg.evaluation.feedback}"</p>

                      <div className="grid grid-cols-2 gap-3 text-[10px]">
                        <div>
                          <p className="font-bold text-green-400 mb-1 uppercase tracking-tighter">Strengths</p>
                          <ul className="space-y-1 opacity-70">
                            {msg.evaluation.strengths?.map((s: string, idx: number) => (
                              <li key={idx}>• {s}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-bold text-orange-400 mb-1 uppercase tracking-tighter">To Improve</p>
                          <ul className="space-y-1 opacity-70">
                            {msg.evaluation.improvements?.map((im: string, idx: number) => (
                              <li key={idx}>• {im}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {active && micOn && (
                <div className="flex justify-end">
                  <div className="bg-cyan-500 text-white px-3 py-1 rounded-full text-[10px] font-bold animate-pulse">
                    LISTENING...
                  </div>
                </div>
              )}
            </div>

            {/* Text Input Option */}
            {active && (
              <div className="mt-auto flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => handleTextInputChange(e.target.value)}
                  onFocus={handleInputFocus}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendText()}
                  placeholder="Type your answer..."
                  className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-cyan-500/50 transition-all text-sm"
                />
                <button
                  onClick={handleSendText}
                  className="p-2 bg-cyan-500 rounded-xl text-white hover:bg-cyan-600 transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
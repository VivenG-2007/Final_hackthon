"use client"
import React, { useState } from 'react';
import { useUser } from "@clerk/nextjs";
import { CheckCircle, XCircle, AlertCircle, Trophy, Target, Award, PlayCircle } from 'lucide-react';
import Background from '../../components/Background';
import { fetchWithFallback, MOCK_DATA } from '../lib/api-config';

function SkillQuiz() {
  const { user, isLoaded } = useUser();
  const [skill, setSkill] = useState('');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [evaluating, setEvaluating] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setUserAnswers({});
    setSubmitted(false);
    setEvaluation(null);

    const userId = user?.username || user?.id || 'user_demo';

    try {
      const payload = {
        user_id: userId,
        data: {
          skill,
          difficulty,
          num_questions: numQuestions
        }
      };

      const data = await fetchWithFallback(
        '/api/webhook/quiz/generate',
        {
          method: 'POST',
          body: JSON.stringify(payload)
        },
        MOCK_DATA.quiz.generate
      );

      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = async () => {
    setEvaluating(true);
    const userId = user?.username || user?.id || 'user_demo';

    try {
      const payload = {
        user_id: userId,
        data: {
          skill: result.skill,
          questions: result.questions,
          answers: Object.values(userAnswers)
        }
      };

      const data = await fetchWithFallback(
        '/api/webhook/quiz/evaluate',
        {
          method: 'POST',
          body: JSON.stringify(payload)
        },
        MOCK_DATA.quiz.evaluate
      );

      setEvaluation(data);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to evaluate quiz.");
    } finally {
      setEvaluating(false);
    }
  };

  const handleAnswerSelect = (index: number, option: string) => {
    if (submitted) return;
    const letter = option.charAt(0); // Extract 'A', 'B', etc.
    setUserAnswers((prev: any) => ({ ...prev, [index]: letter }));
  };

  if (!isLoaded) return <div className="min-h-screen flex items-center justify-center text-purple-500">Loading...</div>;

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      <Background />

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 lg:py-32 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-semibold text-yellow-500">Skill Mastery</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Assessment Center
          </h1>
          <p className="text-xl opacity-70 max-w-2xl mx-auto">
            Validate your expertise with AI-generated quizzes tailored to your skill level.
          </p>
        </div>

        {/* Configuration Card */}
        {!result && (
          <div className="glass card-shadow rounded-2xl p-6 md:p-10 animate-in slide-in-from-bottom-4">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block font-semibold mb-3 opacity-80">Target Skill</label>
                <input
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  placeholder="e.g. React, Python"
                  className="w-full px-4 py-3 rounded-xl input-glass focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block font-semibold mb-3 opacity-80">Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl input-glass focus:ring-2 focus:ring-purple-500 outline-none transition-all cursor-pointer"
                >
                  <option value="beginner" className="text-black">Beginner</option>
                  <option value="intermediate" className="text-black">Intermediate</option>
                  <option value="advanced" className="text-black">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-3 opacity-80">Questions</label>
                <select
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl input-glass focus:ring-2 focus:ring-purple-500 outline-none transition-all cursor-pointer"
                >
                  <option value={3} className="text-black">3 Questions</option>
                  <option value={5} className="text-black">5 Questions</option>
                  <option value={10} className="text-black">10 Questions</option>
                </select>
              </div>
            </div>

            <button
              onClick={generateQuiz}
              disabled={loading || !skill.trim()}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Processing...</>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5" />
                  Start Assessment
                </>
              )}
            </button>
          </div>
        )}

        {/* Quiz Interface */}
        {result && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            {/* Quiz Header */}
            <div className="glass card-shadow rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Target className="w-6 h-6 text-purple-500" />
                  {result.skill} Assessment
                </h2>
                <p className="opacity-70 text-sm mt-1">Difficulty: {difficulty} • {result.questions.length} Questions</p>
              </div>
              {evaluation && (
                <div className={`px-6 py-3 rounded-xl font-bold text-white ${evaluation.result.passed ? 'bg-green-500' : 'bg-red-500'} shadow-lg`}>
                  Score: {evaluation.result.score}%
                </div>
              )}
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {result.questions.map((q: any, i: number) => (
                <div key={i} className={`glass card-shadow rounded-2xl p-6 md:p-8 transition-all ${submitted
                  ? userAnswers[i] === q.correct
                    ? 'border-green-500/50 bg-green-500/5'
                    : 'border-red-500/50 bg-red-500/5'
                  : ''
                  }`}>
                  <h3 className="text-lg md:text-xl font-semibold mb-6 flex gap-3">
                    <span className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0 text-sm">
                      {i + 1}
                    </span>
                    {q.question}
                  </h3>

                  <div className="grid md:grid-cols-2 gap-3">
                    {q.options.map((opt: string) => {
                      const letter = opt.charAt(0);
                      const isSelected = userAnswers[i] === letter;
                      const isCorrect = q.correct === letter;

                      let btnClass = "input-glass hover:bg-purple-500/5"; // default
                      if (isSelected) btnClass = "bg-purple-500 text-white border-purple-500";

                      if (submitted) {
                        if (isCorrect) btnClass = "bg-green-500 text-white border-green-500";
                        else if (isSelected && !isCorrect) btnClass = "bg-red-500 text-white border-red-500";
                        else btnClass = "input-glass opacity-50";
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswerSelect(i, opt)}
                          disabled={submitted}
                          className={`p-4 rounded-xl text-left transition-all font-medium ${btnClass}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-4 p-4 rounded-xl bg-black/5 text-sm opacity-80 flex gap-2">
                      <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Actions */}
            {!submitted ? (
              <button
                onClick={calculateScore}
                disabled={Object.keys(userAnswers).length !== result.questions.length || evaluating}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 transition-all shadow-lg disabled:opacity-50"
              >
                {evaluating ? "Evaluating..." : "Submit Assessment"}
              </button>
            ) : (
              <button
                onClick={() => setResult(null)}
                className="w-full py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 transition-all border border-white/20"
              >
                Start New Quiz
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillQuiz;
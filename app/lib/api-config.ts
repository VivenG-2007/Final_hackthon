export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
// On server, we skip the Next.js proxy and go to backend directly to avoid auth/middleware loops
export const API_BASE_URL = typeof window !== 'undefined' ? '' : BACKEND_URL;

// Mock data for fallback when API is unavailable
export const MOCK_DATA = {
    dashboard: {
        stats: {
            stats: {
                skills_assessed: 3,
                achievements: 5,
                profile_score: 78,
                streak_days: 12,
                interviews_completed: 2,
                resumes_analyzed: 1
            }
        }
    },
    resume: {
        analysis: (payload: any) => {
            const data = payload?.data || {};
            const role = data.target_role || "General";
            return {
                status: "ok",
                analysis: {
                    score: Math.floor(Math.random() * (85 - 65) + 65), // Random score between 65-85
                    grade: 'B',
                    summary: `Strong technical background for ${role}, but could use more quantifiable achievements.`,
                    categories: {
                        format: Math.floor(Math.random() * 5 + 15),
                        experience: Math.floor(Math.random() * 5 + 15),
                        skills: Math.floor(Math.random() * 5 + 20),
                        education: 10,
                        achievements: 5
                    },
                    strengths: ['Relevant Tech Stack', 'Leadership experience'],
                    improvements: ['Add metrics to experience', 'Include more keywords relevant to ' + role],
                    keywords_missing: ['AWS', 'Kubernetes', 'System Design'],
                    market_readiness: 'medium'
                }
            };
        },
        enhanced: (payload: any) => {
            const data = payload?.data || {};
            const original = data.resume_text || "";
            return {
                status: "ok",
                enhanced: {
                    enhanced_resume: `## Enhanced Profile\n\n**${data.target_role || "Professional"}**\n\n${original}\n\n### Key Improvements\n- Added strong action verbs.\n- Structure optimized for ATS.`,
                    changes: ["Added action verbs", "Quantified achievements", "Optimized keywords"],
                    ats_score_before: 45,
                    ats_score_after: Math.floor(Math.random() * (95 - 80) + 80)
                }
            };
        },
        generate: (payload: any) => {
            const data = payload?.data || {};
            const info = data.personal_info || {};
            const exp = data.experience || [];
            const skills = data.skills || [];

            // Construct dynamic markdown based on input
            let resumeMD = `# ${info.name || "Candidate Name"}\n\n`;
            resumeMD += `**${data.target_role || "Target Role"}**\n\n`;

            const contactParts = [info.email, info.phone, info.location, info.linkedin].filter(Boolean);
            resumeMD += `${contactParts.join(' | ')}\n\n`;

            if (data.summary) {
                resumeMD += `## Summary\n${data.summary}\n\n`;
            }

            if (exp.length > 0) {
                resumeMD += `## Experience\n`;
                exp.forEach((job: any) => {
                    resumeMD += `**${job.title}** | ${job.company} (${job.duration || "N/A"})\n`;
                    if (job.highlights && job.highlights.length > 0) {
                        job.highlights.forEach((h: string) => resumeMD += `- ${h}\n`);
                    }
                    resumeMD += '\n';
                });
            }

            if (data.education && data.education.length > 0) {
                resumeMD += `## Education\n`;
                data.education.forEach((edu: any) => {
                    resumeMD += `**${edu.degree}**\n${edu.institution} (${edu.year})\n\n`;
                });
            }

            if (skills.length > 0) {
                resumeMD += `## Skills\n- ${skills.join(', ')}\n\n`;
            }

            return {
                status: "ok",
                resume: resumeMD
            };
        }
    },
    interview: {
        session: (payload: any) => {
            const data = payload?.data || {};
            const role = data.role || "Software Engineer";
            const domain = (data.domain || "general").toLowerCase();
            const count = data.num_questions || 5;

            const questions = [
                {
                    text: `Explain one of your most challenging projects as a ${role}.`,
                    type: "technical",
                    expected_points: ["Problem statement", "Your specific contribution", "Impact"],
                    difficulty: "medium"
                },
                {
                    text: `How do you stay updated with the latest trends in ${domain}?`,
                    type: "technical",
                    expected_points: ["Resources used", "Learning method", "Recent trend"],
                    difficulty: "medium"
                },
                {
                    text: "Tell me about a time you had to deal with a difficult team member.",
                    type: "behavioral",
                    expected_points: ["Conflict context", "Action taken", "Resolution"],
                    difficulty: "easy"
                },
                {
                    text: `What are the core principles of ${domain} that you follow in your daily work?`,
                    type: "technical",
                    expected_points: ["Best practices", "Scalability", "Maintainability"],
                    difficulty: "hard"
                },
                {
                    text: "Where do you see your career path evolving in the next 3 years?",
                    type: "behavioral",
                    expected_points: ["Growth goals", "Skill acquisition", "Role aspiration"],
                    difficulty: "medium"
                }
            ];

            return {
                status: "ok",
                interview_id: `int_${Math.random().toString(36).substr(2, 9)}`,
                questions: questions.slice(0, count)
            };
        },
        evaluation: {
            status: "ok",
            evaluation: {
                score: Math.floor(Math.random() * 30 + 60),
                grade: "B",
                feedback: "Good understanding of basics but lacks depth in edge cases.",
                strengths: ["Mentioned core concepts"],
                improvements: ["Add examples", "Discuss error handling"],
                would_hire: false
            }
        },
        voice_process: (payload: any) => {
            const data = payload?.data || {};
            const context = data.context || {};
            const idx = context.question_index || 0;
            const userResponse = data.transcript || "";

            const positivePhrases = ["Good point.", "I see.", "That makes sense.", "Interesting perspective.", "Okay, good."];
            const randomPhrase = positivePhrases[Math.floor(Math.random() * positivePhrases.length)];

            const nextQuestions = [
                "Can you elaborate on the technical challenges?",
                "How did you handle the testing for that?",
                "What would you do differently next time?",
                "Do you have experience with CI/CD?",
                "That concludes our technical session. Do you have any questions?"
            ];

            const nextQ = context.next_question || nextQuestions[idx] || "Thank you, the interview is complete.";
            const isComplete = idx >= (context.total_questions || 4);
            const score = Math.min(95, 40 + (userResponse.length / 5));

            return {
                status: "ok",
                evaluation: {
                    score: Math.round(score),
                    grade: score > 80 ? "A" : score > 60 ? "B" : "C",
                    feedback: "Good structured response. Keep providing specific examples.",
                    strengths: ["Clear communication", "Relevant terminology"],
                    improvements: ["Provide more quantitative results"]
                },
                response_text: `${randomPhrase} ${nextQ}`,
                is_complete: isComplete
            };
        }
    },
    quiz: {
        generate: (payload: any) => {
            const data = payload?.data || {};
            const skill = data.skill || "General";

            const pythonQuestions = [
                { q: "What is a decorator?", o: ["A) A function affecting another function", "B) A class attribute", "C) A fast compiler", "D) A database connector"], c: "A", e: "Decorators modify the behavior of functions or classes." },
                { q: "What is the difference between list and tuple?", o: ["A) Tuple is immutable", "B) List is immutable", "C) They are same", "D) Tuple can only store numbers"], c: "A", e: "Tuples cannot be changed after creation." },
                { q: "How is memory managed in Python?", o: ["A) Manual allocation", "B) Private heap space", "C) No memory management", "D) Stack only"], c: "B", e: "Python assumes a private heap managed by the interpreter." },
                { q: "What is PEP 8?", o: ["A) A game", "B) Style guide for Python", "C) A compiler", "D) A web framework"], c: "B", e: "PEP 8 is the standard style guide for Python code." }
            ];

            const reactQuestions = [
                { q: "What is the Virtual DOM?", o: ["A) A copy of the real DOM in memory", "B) A browser plugin", "C) A database", "D) A CSS file"], c: "A", e: "React uses Virtual DOM to optimize updates." },
                { q: "What hook is used for side effects?", o: ["A) useState", "B) useEffect", "C) useReducer", "D) useContext"], c: "B", e: "useEffect handles side effects like data fetching definitions." },
                { q: "What is JSX?", o: ["A) Java XML", "B) JavaScript XML", "C) JSON XML", "D) Java Syntax"], c: "B", e: "JSX produces React 'elements'." }
            ];

            let pool = [];
            if (skill.toLowerCase().includes('python')) pool = pythonQuestions;
            else if (skill.toLowerCase().includes('react')) pool = reactQuestions;
            else pool = [
                { q: `What is a key feature of ${skill}?`, o: [`A) High performance`, `B) Loose typing`, `C) Compiled execution`, `D) None of the above`], c: "A", e: `${skill} is known for its capabilities.` },
                { q: `Which paradigm does ${skill} primarily support?`, o: [`A) Object Oriented`, `B) Functional`, `C) Procedural`, `D) Multi-paradigm`], c: "D", e: `Most modern languages like ${skill} are multi-paradigm.` }
            ];

            const outputQuestions = pool.sort(() => 0.5 - Math.random()).slice(0, 3).map(item => ({
                question: item.q,
                options: item.o,
                correct: item.c,
                explanation: item.e
            }));

            return {
                status: "ok",
                skill: skill,
                questions: outputQuestions
            };
        },
        evaluate: (payload: any) => {
            const data = payload?.data || {};
            const questions = data.questions || [];
            const answers = data.answers || [];

            let correctCount = 0;
            const details = questions.map((q: any, i: number) => {
                const isCorrect = q.correct === answers[i];
                if (isCorrect) correctCount++;
                return {
                    question: i + 1,
                    correct: isCorrect,
                    your_answer: answers[i],
                    correct_answer: q.correct,
                    explanation: "Correct logic applied."
                };
            });

            const score = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

            return {
                status: "ok",
                result: {
                    score: score,
                    correct: correctCount,
                    total: questions.length,
                    passed: score >= 70,
                    feedback: score >= 70 ? "Great job!" : "Keep practicing!",
                    details: details
                },
                quiz_id: "quiz_" + Math.random().toString(36).substr(2, 9)
            };
        }
    },
    jobs: {
        recommend: (payload: any) => {
            const data = payload?.data || {};
            const role = data.target_role || "Developer";
            return {
                status: "ok",
                jobs: [
                    {
                        title: `Senior ${role}`,
                        match_percent: Math.floor(Math.random() * (98 - 85) + 85),
                        skills_matched: data.skills || ["React", "Node.js"],
                        skills_to_learn: ["System Design", "Cloud Architecture"],
                        salary_range_usd: "$120,000 - $160,000",
                        growth_outlook: "strong"
                    },
                    {
                        title: `Lead ${role}`,
                        match_percent: Math.floor(Math.random() * (85 - 70) + 70),
                        skills_matched: [(data.skills?.[0] || "Coding")],
                        skills_to_learn: ["Team Leadership", "Strategic Planning"],
                        salary_range_usd: "$140,000 - $190,000",
                        growth_outlook: "very strong"
                    }
                ]
            };
        },
        market: {
            skills: {
                technical_skills: [
                    { "skill": "AI/Machine Learning", "demand": "critical", "growth": "65%" },
                    { "skill": "Cloud Computing", "demand": "critical", "growth": "45%" }
                ],
                soft_skills: [
                    { "skill": "Adaptability", "demand": "high" },
                    { "skill": "Communication", "demand": "high" }
                ]
            },
            summary: {
                fastest_growing: [
                    { "role": "AI/ML Engineer", "growth": "55%+", "demand": "very_high" }
                ],
                declining: [
                    { "role": "Data Entry Clerk", "decline": "-30%", "automation_risk": "very_high" }
                ],
                hot_skills: ["AI/ML", "Cloud", "Cybersecurity"],
                outdated_skills: ["COBOL", "Flash"]
            },
            salaries: {
                roles: [
                    { "role": "Backend Engineer", "range": "$120k - $180k" },
                    { "role": "ML Engineer", "range": "$130k - $200k" },
                    { "role": "Frontend Architect", "range": "$130k - $190k" }
                ]
            },
            industry: (industry: string) => {
                const data: any = {
                    technology: { "outlook": "positive", "growth_rate": "12%" },
                    healthcare: { "outlook": "stable", "growth_rate": "8%" },
                    finance: { "outlook": "transforming", "growth_rate": "5%" }
                };
                return data[industry] || { "outlook": "neutral", "growth_rate": "0%" };
            },
            skill_gap: (payload: any) => {
                const target = payload?.target_role || "Engineer";
                const skills = payload?.skills || [];
                return {
                    target_role: target,
                    skills_matched: skills.slice(0, 2),
                    skills_missing: ["Kubernetes", "GraphQL", "System Design"],
                    match_percent: Math.min(100, (skills.length * 10) + 20),
                    priority_skills: ["Kubernetes", "System Design"]
                };
            }
        }
    },
    learning: {
        generate: (payload: any) => {
            const data = payload?.data || {};
            const gaps = data.gaps || ["New Skill"];
            const role = data.target_role || "Expert";

            const plan = gaps.map((gap: string) => ({
                skill: gap,
                priority: "high",
                resources: [
                    { title: `Mastering ${gap} for ${role}`, type: "course", platform: "Udemy" },
                    { title: `${gap} Best Practices`, type: "practice", platform: "Official Docs" }
                ]
            }));

            return {
                status: "ok",
                plan_id: `plan_${Date.now()}`,
                plan: plan
            };
        }
    }
};

// API utility functions
export async function fetchWithFallback<T>(
    endpoint: string,
    options?: RequestInit,
    mockData?: T | ((payload: any) => T)
): Promise<T> {
    try {
        // We use relative URLs for proxies. 
        // fetchWithFallback(endpoint) where endpoint = "/api/..."
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.warn(`API call failed, using mock data for ${endpoint}:`, error);

        if (mockData) {
            if (typeof mockData === 'function') {
                try {
                    const payload = options?.body ? JSON.parse(options.body as string) : {};
                    // @ts-ignore
                    return mockData(payload);
                } catch (e) {
                    console.error("Failed to generate dynamic mock data", e);
                }
            }
            return mockData as T;
        }
        throw error;
    }
}

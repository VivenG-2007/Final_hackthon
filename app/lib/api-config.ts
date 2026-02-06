export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Mock data for fallback when API is unavailable
export const MOCK_DATA = {
    dashboard: {
        stats: {
            skills_assessed: 3,
            achievements: 5,
            profile_score: 78,
            streak_days: 0,
            interviews_completed: 2,
            resumes_analyzed: 1
        }
    },
    resume: {
        analysis: {
            status: "ok",
            analysis: {
                score: 72,
                grade: 'B',
                summary: 'Strong technical background with room for improvement in quantifiable achievements.',
                categories: {
                    format: 15,
                    experience: 20,
                    skills: 22,
                    education: 10,
                    achievements: 5
                },
                strengths: ['Python expertise', 'Leadership experience'],
                improvements: ['Add metrics', 'Include certifications'],
                keywords_missing: ['AWS', 'Kubernetes'],
                market_readiness: 'medium'
            }
        },
        enhanced: {
            status: "ok",
            enhanced: {
                enhanced_resume: "## John Doe\n\n**Backend Developer**\n\n- Passionate developer with 5+ years of experience...\n- Built scalable REST APIs using FastAPI and PostgreSQL.",
                changes: ["Added action verbs", "Quantified achievements"],
                ats_score_before: 45,
                ats_score_after: 78
            }
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
        session: {
            status: "ok",
            interview_id: "int_abc123",
            questions: [
                {
                    text: "Explain the difference between a list and tuple in Python.",
                    type: "technical",
                    expected_points: ["Mutability", "Performance", "Use cases"],
                    difficulty: "medium"
                },
                {
                    text: "Tell me about a challenging project you worked on.",
                    type: "behavioral",
                    expected_points: ["Problem description", "Actions taken", "Results"],
                    difficulty: "medium"
                }
            ]
        },
        evaluation: {
            status: "ok",
            evaluation: {
                score: 68,
                grade: "C+",
                feedback: "Good understanding of basics but lacks depth in edge cases.",
                strengths: ["Mentioned HTTP methods correctly"],
                improvements: ["Add examples", "Discuss error handling"],
                would_hire: false
            }
        },
        voice_process: {
            status: "ok",
            evaluation: {
                score: 65,
                grade: "C",
                feedback: "Mentioned relevant frameworks but lacks specific examples...",
                strengths: ["Relevant tech stack"],
                improvements: ["Give concrete project examples"]
            },
            response_text: "Good start. Next: What databases have you worked with?",
            is_complete: false
        }
    },
    quiz: {
        generate: {
            status: "ok",
            skill: "Python",
            questions: [
                {
                    question: "What will `[1,2,3] * 2` return?",
                    options: [
                        "A) [2, 4, 6]",
                        "B) [1, 2, 3, 1, 2, 3]",
                        "C) [1, 2, 3, 2]",
                        "D) Error"
                    ],
                    correct: "B",
                    explanation: "The * operator replicates the list."
                }
            ]
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
                quiz_id: "quiz_abc123"
            };
        }
    },
    jobs: {
        recommend: {
            status: "ok",
            jobs: [
                {
                    title: "Backend Developer",
                    match_percent: 90,
                    skills_matched: ["Python", "FastAPI", "PostgreSQL", "Docker"],
                    skills_to_learn: ["AWS", "Kubernetes"],
                    salary_range_usd: "$90,000 - $130,000",
                    growth_outlook: "strong"
                },
                {
                    title: "DevOps Engineer",
                    match_percent: 65,
                    skills_matched: ["Docker", "Python"],
                    skills_to_learn: ["Terraform", "CI/CD"],
                    salary_range_usd: "$100,000 - $150,000",
                    growth_outlook: "strong"
                }
            ]
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
                    { "role": "ML Engineer", "range": "$130k - $200k" }
                ]
            },
            industry: (industry: string) => {
                const data: any = {
                    technology: { "outlook": "positive", "growth_rate": "12%" },
                    healthcare: { "outlook": "stable", "growth_rate": "8%" }
                };
                return data[industry] || { "outlook": "neutral", "growth_rate": "0%" };
            },
            skill_gap: {
                target_role: "ML Engineer",
                skills_matched: ["python"],
                skills_missing: ["tensorflow", "pytorch", "mlops"],
                match_percent: 25,
                priority_skills: ["tensorflow", "pytorch"]
            }
        }
    },
    learning: {
        generate: {
            status: "ok",
            plan_id: "plan_abc123",
            plan: [
                {
                    skill: "AWS",
                    priority: "high",
                    resources: [
                        { title: "AWS Certified Solutions Architect", type: "course", platform: "Udemy" },
                        { title: "AWS Free Tier Hands-on", type: "practice", platform: "AWS" }
                    ]
                },
                {
                    skill: "Kubernetes",
                    priority: "high",
                    resources: [
                        { title: "Kubernetes Basics", type: "course", platform: "Coursera" }
                    ]
                }
            ]
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
            // Check if mockData is a function (dynamic generator)
            if (typeof mockData === 'function') {
                try {
                    // Start mainly for the resume generation case
                    const payload = options?.body ? JSON.parse(options.body as string) : {};
                    // @ts-ignore - We know it's a function based on the check above
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

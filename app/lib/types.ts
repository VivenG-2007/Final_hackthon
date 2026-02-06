export interface ApiResponse<T> {
    status: "ok" | "error";
    message?: string;
}


export interface ResumeAnalyzeRequest {
    user_id: string;
    data: {
        resume_text: string;
        target_role: string;
    };
}

export interface ResumeAnalyzeResponse {
    status: "ok" | "error";
    analysis?: {
        score: number;
        grade: string;
        summary: string;
        categories: {
            format: number;
            experience: number;
            skills: number;
            education: number;
            achievements: number;
        };
        strengths: string[];
        improvements: string[];
        keywords_missing: string[];
        market_readiness: "low" | "medium" | "high";
    };
    message?: string;
}

export interface ResumeEnhanceRequest {
    user_id: string;
    data: {
        resume_text: string;
        target_role: string;
    };
}

export interface ResumeEnhanceResponse {
    status: "ok" | "error";
    enhanced?: {
        enhanced_resume: string;
        changes: string[];
        ats_score_before: number;
        ats_score_after: number;
    };
    message?: string;
}

export interface ResumeGenerateRequest {
    user_id: string;
    data: {
        personal_info: {
            name: string;
            email: string;
            phone: string;
            location: string;
            linkedin: string;
        };
        summary: string;
        experience: {
            title: string;
            company: string;
            duration: string;
            highlights: string[];
        }[];
        education: {
            degree: string;
            institution: string;
            year: string;
        }[];
        skills: string[];
        certifications: string[];
        target_role: string;
    };
}

export interface ResumeGenerateResponse {
    status: "ok" | "error";
    resume?: string;
    message?: string;
}


export interface InterviewStartRequest {
    user_id: string;
    data: {
        domain: string;
        role: string;
        difficulty: "beginner" | "intermediate" | "advanced";
        num_questions: number;
    };
}

export interface InterviewQuestion {
    text: string;
    type: "technical" | "behavioral";
    expected_points: string[];
    difficulty: "easy" | "medium" | "hard";
}

export interface InterviewStartResponse {
    status: "ok" | "error";
    interview_id?: string;
    questions?: InterviewQuestion[];
    message?: string;
}

export interface InterviewEvaluateRequest {
    user_id: string;
    data: {
        question: string;
        answer: string;
        expected_points: string[];
    };
}

export interface InterviewEvaluateResponse {
    status: "ok" | "error";
    evaluation?: {
        score: number;
        grade: string;
        feedback: string;
        strengths: string[];
        improvements: string[];
        would_hire: boolean;
    };
    message?: string;
}

export interface VoiceProcessRequest {
    user_id: string;
    data: {
        transcript: string;
        current_question: string;
        context: {
            question_index: number;
            total_questions: number;
            next_question?: string;
        };
    };
}

export interface VoiceProcessResponse {
    status: "ok" | "error";
    evaluation?: {
        score: number;
        grade: string;
        feedback: string;
        strengths: string[];
        improvements: string[];
        would_hire: boolean;
    };
    response_text?: string;
    is_complete?: boolean;
    message?: string;
}


export interface QuizGenerateRequest {
    user_id: string;
    data: {
        skill: string;
        difficulty: "beginner" | "intermediate" | "advanced";
        num_questions: number;
    };
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correct: string;
    explanation: string;
}

export interface QuizGenerateResponse {
    status: "ok" | "error";
    skill?: string;
    questions?: QuizQuestion[];
    quiz_id?: string;
    message?: string;
}

export interface QuizEvaluateRequest {
    user_id: string;
    data: {
        skill: string;
        questions: {
            question: string;
            options: string[];
            correct: string;
            explanation?: string;
        }[];
        answers: string[];
    };
}

export interface QuizEvaluateResponse {
    status: "ok" | "error";
    result?: {
        score: number;
        correct: number;
        total: number;
        passed: boolean;
        feedback: string;
        details: {
            question: number;
            correct: boolean;
            your_answer: string;
            correct_answer: string;
            explanation: string;
        }[];
    };
    quiz_id?: string;
    message?: string;
}


export interface JobRecommendRequest {
    user_id: string;
    data: {
        skills: string[];
        experience_years: number;
        target_role: string;
        location: string;
    };
}

export interface JobRecommendation {
    title: string;
    match_percent: number;
    skills_matched: string[];
    skills_to_learn: string[];
    salary_range_usd: string;
    growth_outlook: string;
}

export interface JobRecommendResponse {
    status: "ok" | "error";
    jobs?: JobRecommendation[];
    message?: string;
}

export interface LearningGenerateRequest {
    user_id: string;
    data: {
        gaps: string[];
        target_role: string;
    };
}

export interface LearningResource {
    title: string;
    type: string;
    platform: string;
}

export interface LearningPlanItem {
    skill: string;
    priority: string;
    resources: LearningResource[];
}

export interface LearningGenerateResponse {
    status: "ok" | "error";
    plan_id?: string;
    plan?: LearningPlanItem[];
    message?: string;
}

export interface SkillGapRequest {
    skills: string[];
    target_role: string;
}

export interface SkillGapResponse {
    target_role: string;
    skills_matched: string[];
    skills_missing: string[];
    match_percent: number;
    priority_skills: string[];
}

export interface MarketSkillsResponse {
    technical_skills: {
        skill: string;
        demand: string;
        growth: string;
    }[];
    soft_skills: {
        skill: string;
        demand: string;
    }[];
}

export interface MarketSummaryResponse {
    fastest_growing: {
        role: string;
        growth: string;
        demand: string;
    }[];
    declining: {
        role: string;
        decline: string;
        automation_risk: string;
    }[];
    hot_skills: string[];
    outdated_skills: string[];
}

export interface DashboardStatsResponse {
    stats: {
        skills_assessed: number;
        achievements: number;
        profile_score: number;
        streak_days: number;
        interviews_completed: number;
        resumes_analyzed: number;
    };
}

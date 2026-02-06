import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userId = body.user_id;

        // Return mock data for demonstration
        return NextResponse.json({
            status: "ok",
            analysis: {
                score: 72,
                grade: "B",
                summary: "Strong technical background with room for improvement in quantifiable achievements.",
                categories: {
                    format: 15,
                    experience: 20,
                    skills: 22,
                    education: 10,
                    achievements: 5
                },
                strengths: ["Python expertise", "Leadership experience"],
                improvements: ["Add metrics", "Include certifications"],
                keywords_missing: ["AWS", "Kubernetes"],
                market_readiness: "medium"
            }
        });
    } catch (error) {
        console.error('[resume/analyze] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

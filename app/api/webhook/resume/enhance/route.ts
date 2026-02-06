import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return NextResponse.json({
            status: "ok",
            enhanced: {
                enhanced_resume: "## John Doe\n\n**Backend Developer**\n\n- Passionate developer with 5+ years of experience...\n- Built scalable REST APIs using FastAPI and PostgreSQL.",
                changes: ["Added action verbs", "Quantified achievements"],
                ats_score_before: 45,
                ats_score_after: 78
            }
        });
    } catch (error) {
        console.error('[resume/enhance] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

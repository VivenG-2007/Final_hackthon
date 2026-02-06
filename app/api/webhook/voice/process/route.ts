import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return NextResponse.json({
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
        });
    } catch (error) {
        console.error('[voice/process] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return NextResponse.json({
            status: "ok",
            evaluation: {
                score: 68,
                grade: "C+",
                feedback: "Good understanding of basics but lacks depth in edge cases.",
                strengths: ["Mentioned HTTP methods correctly"],
                improvements: ["Add examples", "Discuss error handling"],
                would_hire: false
            }
        });
    } catch (error) {
        console.error('[interview/evaluate] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

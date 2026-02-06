import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return NextResponse.json({
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
        });
    } catch (error) {
        console.error('[interview/start] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

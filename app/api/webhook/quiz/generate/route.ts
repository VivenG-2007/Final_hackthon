import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return NextResponse.json({
            status: "ok",
            skill: body.data?.skill || "Python",
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
        });
    } catch (error) {
        console.error('[quiz/generate] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

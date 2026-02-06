import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = body.data || {};
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

        return NextResponse.json({
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
        });
    } catch (error) {
        console.error('[quiz/evaluate] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id');

    // In a real app, we would fetch from a database using userId
    return NextResponse.json({
        stats: {
            skills_assessed: 3,
            achievements: 5,
            profile_score: 78,
            streak_days: 0,
            interviews_completed: 2,
            resumes_analyzed: 1
        }
    });
}

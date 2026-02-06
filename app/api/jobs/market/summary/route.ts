import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    return NextResponse.json({
        fastest_growing: [
            { "role": "AI/ML Engineer", "growth": "55%+", "demand": "very_high" }
        ],
        declining: [
            { "role": "Data Entry Clerk", "decline": "-30%", "automation_risk": "very_high" }
        ],
        hot_skills: ["AI/ML", "Cloud", "Cybersecurity"],
        outdated_skills: ["COBOL", "Flash"]
    });
}

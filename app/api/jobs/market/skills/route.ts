import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    return NextResponse.json({
        technical_skills: [
            { "skill": "AI/Machine Learning", "demand": "critical", "growth": "65%" },
            { "skill": "Cloud Computing", "demand": "critical", "growth": "45%" }
        ],
        soft_skills: [
            { "skill": "Adaptability", "demand": "high" },
            { "skill": "Communication", "demand": "high" }
        ]
    });
}

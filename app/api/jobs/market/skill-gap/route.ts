import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return NextResponse.json({
            target_role: body.target_role || "ML Engineer",
            skills_matched: ["python"],
            skills_missing: ["tensorflow", "pytorch", "mlops"],
            match_percent: 25,
            priority_skills: ["tensorflow", "pytorch"]
        });
    } catch (error) {
        return NextResponse.json({ status: "error", message: "Failed to analyze skill gap" }, { status: 500 });
    }
}

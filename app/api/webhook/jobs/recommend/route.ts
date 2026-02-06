import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return NextResponse.json({
            status: "ok",
            jobs: [
                {
                    title: "Backend Developer",
                    match_percent: 90,
                    skills_matched: ["Python", "FastAPI", "PostgreSQL", "Docker"],
                    skills_to_learn: ["AWS", "Kubernetes"],
                    salary_range_usd: "$90,000 - $130,000",
                    growth_outlook: "strong"
                },
                {
                    title: "DevOps Engineer",
                    match_percent: 65,
                    skills_matched: ["Docker", "Python"],
                    skills_to_learn: ["Terraform", "CI/CD"],
                    salary_range_usd: "$100,000 - $150,000",
                    growth_outlook: "strong"
                }
            ]
        });
    } catch (error) {
        console.error('[jobs/recommend] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

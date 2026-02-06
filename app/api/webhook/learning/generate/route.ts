import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        return NextResponse.json({
            status: "ok",
            plan_id: "plan_abc123",
            plan: [
                {
                    skill: "AWS",
                    priority: "high",
                    resources: [
                        { title: "AWS Certified Solutions Architect", type: "course", platform: "Udemy" },
                        { title: "AWS Free Tier Hands-on", type: "practice", platform: "AWS" }
                    ]
                },
                {
                    skill: "Kubernetes",
                    priority: "high",
                    resources: [
                        { title: "Kubernetes Basics", type: "course", platform: "Coursera" }
                    ]
                }
            ]
        });
    } catch (error) {
        console.error('[learning/generate] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

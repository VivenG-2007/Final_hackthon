import { NextResponse } from 'next/server';

export async function GET(
    req: Request,
    { params }: { params: { industry: string } }
) {
    // Await params to ensure it is resolved before access
    const resolvedParams = await Promise.resolve(params);
    const industry = resolvedParams.industry;

    return NextResponse.json({
        industry: industry,
        outlook: "Positive",
        growth_rate: "5%",
        top_companies: ["Company A", "Company B"],
        trends: ["Remote work", "AI integration"]
    });
}

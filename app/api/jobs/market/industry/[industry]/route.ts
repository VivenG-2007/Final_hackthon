import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/app/lib/api-config';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ industry: string }> }
) {
    const { searchParams } = new URL(req.url);
    const resolvedParams = await params;
    const industry = resolvedParams.industry;

    try {
        const response = await fetch(`${BACKEND_URL}/api/jobs/market/industry/${industry}?${searchParams.toString()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(`[market/industry/${industry}] Error:`, error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

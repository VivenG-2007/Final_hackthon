import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/app/lib/api-config';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    try {
        const response = await fetch(`${BACKEND_URL}/api/jobs/market/summary?${searchParams.toString()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[market/summary] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

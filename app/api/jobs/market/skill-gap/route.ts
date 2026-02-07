import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/app/lib/api-config';

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const body = await req.json();

        const userId = body.user_id || searchParams.get('user_id');
        const dataToSend = body.data || body; // Support both wrapped and unwrapped

        const response = await fetch(`${BACKEND_URL}/api/jobs/market/skill-gap?user_id=${userId || ''}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[market/skill-gap] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/app/lib/api-config';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const response = await fetch(`${BACKEND_URL}/api/webhook/quiz/evaluate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[quiz/evaluate] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

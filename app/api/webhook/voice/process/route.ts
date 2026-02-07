import { NextResponse } from 'next/server';
import { BACKEND_URL, MOCK_DATA } from '@/app/lib/api-config';

export async function POST(req: Request) {
    let body;
    try {
        body = await req.json();

        const response = await fetch(`${BACKEND_URL}/api/webhook/voice/process`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.warn('[voice/process] Backend unavailable, using mock data:', error.message);

        // Fallback to mock data on ANY error (net connection or response error)
        const mockResponse = typeof MOCK_DATA.interview.voice_process === 'function'
            ? MOCK_DATA.interview.voice_process(body)
            : MOCK_DATA.interview.voice_process;

        return NextResponse.json(mockResponse);
    }
}

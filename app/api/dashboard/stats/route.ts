import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/app/lib/api-config';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id');

    try {
        const response = await fetch(`${BACKEND_URL}/api/dashboard/stats?user_id=${userId || ''}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Backend responded with ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('[dashboard/stats] Error:', error);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

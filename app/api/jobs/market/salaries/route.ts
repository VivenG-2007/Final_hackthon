import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    return NextResponse.json({
        roles: [
            { "role": "Backend Engineer", "range": "$120k - $180k" },
            { "role": "ML Engineer", "range": "$130k - $200k" }
        ]
    });
}

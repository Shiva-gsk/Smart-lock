import { NextRequest, NextResponse } from 'next/server';
let unlock = false;

export async function GET(req: NextRequest) {
    
    return NextResponse.json({data: unlock });
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    unlock = !unlock;
    setTimeout(() => {
        unlock = !unlock;
    }, 5000);
    return NextResponse.json({ message: 'Unlocked'}, { status: 200 });
}
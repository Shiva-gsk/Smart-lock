import { NextRequest, NextResponse } from 'next/server';
let status = false;

export async function GET(req: NextRequest) {
    
    return NextResponse.json({data: status });
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    status = data;
    
    return NextResponse.json({ data: status}, { status: 200 });
}
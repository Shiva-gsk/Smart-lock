import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'; // adjust import if needed

// ✅ GET: fetch lock status from DB
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lockId = searchParams.get("lock_id");

    if (!lockId) {
      return NextResponse.json({ error: "lock_id is required" }, { status: 400 });
    }

    const lock = await db.lock.findUnique({
      where: { id: Number(lockId) },
    });

    if (!lock) {
      return NextResponse.json({ error: "Lock not found" }, { status: 404 });
    }

    return NextResponse.json({ data: lock.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch lock status" }, { status: 500 });
  }
}

// ✅ POST: update lock status in DB
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lock_id, status } = body;

    if (lock_id === undefined || status === undefined) {
      return NextResponse.json({ error: "lock_id and status are required" }, { status: 400 });
    }

    const updatedLock = await db.lock.update({
      where: { id: Number(lock_id) },
      data: { status: Boolean(status) },
    });
    console.log(updatedLock);

    return NextResponse.json({ data: updatedLock }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update lock status" }, { status: 500 });
  }
}

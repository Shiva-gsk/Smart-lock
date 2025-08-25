import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lock_id, rfidTag } = body;

    console.log(lock_id, rfidTag);
    if (lock_id === undefined || rfidTag === undefined) {
      return NextResponse.json({ error: "lock_id and rfid are required" }, { status: 400 });
    }

    // Find the lock with the given lock_id and check if it has the given rfidTag
    const lock = await db.lock.findUnique({
      where: { id: Number(lock_id) },
      include: { rfidCards: true },
    });

    if (!lock) {
      return NextResponse.json({ error: "Lock not found" }, { status: 404 });
    }

    const hasRfid = lock.rfidCards.some(card => card.rfidTag === rfidTag);

    if (!hasRfid) {
      console.log("RFID tag not associated with this lock");
      await db.accessLog.create({
        data: {
          lockId: lock.id,
          eventType: 'unlock',
          timestamp: new Date(),
          accessGranted: false,
          rfidTag: rfidTag,
        },
      });
      return NextResponse.json({ error: "RFID tag not associated with this lock" }, { status: 403 });
    }

    await db.accessLog.create({
      data: {
        lockId: lock.id,
        eventType: 'unlock',
        timestamp: new Date(),
        accessGranted: true,
        rfidTag: rfidTag,
      },
    });

    // Continue with your logic, e.g., update lock status or whatever is needed
    // Example: just return the lock for now
    const updatedLock = lock;

    return NextResponse.json({ data: "success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update lock status" }, { status: 500 });
  }
}
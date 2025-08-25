import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lock_id, rfidTag } = body;

    if (lock_id === undefined || rfidTag === undefined) {
      return NextResponse.json({ error: "lock_id and rfid are required" }, { status: 400 });
    }

    // const updatedLock = await db.lock.update({
    //   where: { id: Number(lock_id) },
    //   data: { status: Boolean(status) },
    // });
    // console.log(updatedLock);
    const lock = await db.lock.findUnique({
      where: { id: Number(lock_id) },
      include: { rfidCards: true },
    });

    if (!lock) {
      return NextResponse.json({ error: "Lock not found" }, { status: 404 });
    }

    const newRfidCards = lock.rfidCards.filter(card => card.rfidTag != rfidTag);
    const hasRfid = lock.rfidCards.some(card => card.rfidTag === rfidTag);

    // Update the lock's rfidCards to remove the specified rfidTag
    await db.lock.update({
      where: { id: Number(lock_id) },
      data: {
        rfidCards: {
          set: newRfidCards,
        },
      },
    });

    if (!hasRfid) {
      return NextResponse.json({ error: "RFID tag not associated with this lock" }, { status: 403 });
    }

    return NextResponse.json({ data: "success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update lock status" }, { status: 500 });
  }
}
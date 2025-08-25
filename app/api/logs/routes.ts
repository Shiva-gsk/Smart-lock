import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lock_id, rfid, accessGranted } = body;

    if (lock_id === undefined || rfid === undefined) {
      return NextResponse.json({ error: "lock_id and rfid are required" }, { status: 400 });
    }

    const log = db.accessLog.create({
        data:{
            rfidTag: String(rfid),
            lockId: Number(lock_id),
            accessGranted: Boolean(accessGranted),
            eventType: "UNLOCK"
        }
    })

    return NextResponse.json({ data: log }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update lock status" }, { status: 500 });
  }
}
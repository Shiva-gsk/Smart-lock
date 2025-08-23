// import { NextRequest, NextResponse } from 'next/server';
// let unlock = false;

// export async function GET(req: NextRequest) {
    
//     return NextResponse.json({data: unlock });
// }

// export async function POST(req: NextRequest) {
//     const data = await req.json();
//     unlock = !unlock;

//     setTimeout(() => {
//         unlock = !unlock;
//     }, 5000);
//     return NextResponse.json({ message: 'Unlocked'}, { status: 200 });
// }


import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
let unlock = false;

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");
  const password = req.headers.get("x-password");

  if (!userId || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  try {
    // Find user in DB
    const user = await db.user.findUnique({
      where: { username: userId }, // or "id" depending on your schema
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Update lock
    const update = await db.lock.update({
      where: { id: 1 }, // or pass lock_id via query params if multiple locks
      data: { status: true },
    });

    // Auto lock after 20 seconds
    setTimeout(async () => {
      await db.lock.update({
        where: { id: 1 },
        data: { status: false },
      });
      console.log("Lock is now locked");
    }, 20000);

    return NextResponse.json({ message: "Unlocked", lock: update });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to unlock" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    const data = await req.json();
    unlock = !unlock;

    setTimeout(() => {
        unlock = !unlock;
    }, 5000);
    return NextResponse.json({ message: 'Unlocked'}, { status: 200 });
}
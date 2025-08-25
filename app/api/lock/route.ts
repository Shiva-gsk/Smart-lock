
import { revalidate } from '@/app/actions/revalidate';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // const userId = req.headers.get("x-user-id");
  // const password = req.headers.get("x-password");

  // if (!userId || !password) {
  //   return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  // }
  const body = await req.json();
  const userId = body.username;
  const password = body.password;

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
    const lock = await db.lock.findFirst({
      where: { username: userId },
    });
    if (!lock) {
      return NextResponse.json({ error: "Lock not found for user" }, { status: 404 });
    }

    // Unlock the lock
    // setTimeout(async () => {
      await db.lock.update({
        where: { id: lock.id },
        data: { webunlock: false, },
      });
    //   revalidatePath("/dashboard");
    await revalidate();
    //   await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate`, {
    //     method: "POST",
    //   });
      console.log("Lock is now locked");
    // }, 5000);
    return NextResponse.json({ message: 'Unlocked' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to unlock" }, { status: 500 });
  }
}

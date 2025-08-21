import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJwt } from "@/lib/jwt";
import { db } from "@/lib/db"; // Assuming you have a db module to handle database operations

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await db.user.findUnique({ where: { username } });
  console.log(bcrypt.hashSync(password, 12));


  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT
  const token = signJwt({ username: user.username });

  // Return token in response body
  return NextResponse.json({ token });
}

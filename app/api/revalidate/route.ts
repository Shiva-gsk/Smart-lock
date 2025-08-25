// app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidatePath("/dashboard");
  return NextResponse.json({ revalidated: true });
}

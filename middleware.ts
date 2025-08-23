// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// // const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// export function middleware(req: NextRequest) {
//     const authHeader = req.headers.get('authorization');
//     const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
//     console.log("Token from middleware:", token);
//     if (!token) {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
    
//     try {
//         jwt.verify(token, process.env.JWT_SECRET|| "smart-lock-app179");
//         console.log("Here");
//         return NextResponse.next();
//     } catch (err) {
//         console.log("Not Here");
//         return NextResponse.redirect(new URL('/login', req.url));
//     }
// }

// export const config = {
//     matcher: ['/api/unlock', '/api/status'],
// };


import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import { db} from "@/lib/db"
import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

export async function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
    console.log("Authorization Header:", authHeader);
  let token: string | undefined;
  if (authHeader) {
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7);
        try {
            const decoded = jwt.decode(token);
            console.log("Decoded Token:", decoded);
            // jwt.verify(token, process.env.JWT_SECRET || "smart-lock-app179");
            const requestHeaders = new Headers(req.headers);
            let username = "";
            if (decoded && typeof decoded === "object" && "username" in decoded) {
              username = String((decoded as { username?: string }).username);
            }
            requestHeaders.set("x-user-id", username);
            // requestHeaders.set("x-username", decoded?.);
          return NextResponse.next();
        } catch (err) {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      }
    // return NextResponse.redirect(new URL("/login", req.url));
  }


  // --- Case 1: JWT Token ---

  // --- Case 2: Username + Password (Basic Auth) ---
//   if (authHeader.startsWith("Basic ")) {
//     const base64Credentials = authHeader.split(" ")[1];
//     const credentials = Buffer.from(base64Credentials, "base64").toString("utf8");
//     const [username, password] = credentials.split(":");
  const username = req.headers.get("x-user-id") ;
  const password = req.headers.get("x-password") ;
    // const user = await db.user.findUnique({
    //   where: {  username: username  },
    // });

    // if (!user) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }

    // const isValid = await bcrypt.compare(password, user.passwordHash);

    // if (isValid) {
        
    //   return NextResponse.next();
    // } else {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }
//   }

  // If neither JWT nor Basic Auth was used
  if(!username || !password){
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/unlock", "/api/status"],
};

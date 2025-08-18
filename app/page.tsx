"use client"
import { Button } from "@/components/ui/button";
import Navbar from "./components/Navbar";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

// gsap.registerPlugin(useGSAP);

export default function Home() {

    useGSAP(() => {
    gsap.fromTo(
      ".main-page", {opacity: 0, y: 50}, {opacity: 1, y: 0, duration: 1}
    );
  });
  return (
    <main className="gradient overflow-hidden">

      <div className="main-page">
        {/* <Navbar /> */}
        {/* <h1 className="text-7xl font-thin">Welcome to the Smart Lock App</h1> */}
        <div className="gradient-title text-2xl md:text-6xl sm:text-3xl p-2 flex items-center justify-center text-center h-[100vh] ">
          <div className="flex flex-col gap-4 ">
            <div className="">
              Welcome to the Smart Lock
            </div>
            <div>
              App
            </div>

          <div className='flex justify-center items-center pt-5 gap-2'>
            <Link href="/login">
              <Button  className="cursor-pointer bg-white text-black hover:bg-zinc-200">
                <div className='text-xs md:text-sm '>Login</div>
              </Button>
            </Link>
            <Link href="/signup">
              {/* <Button variant={'ghost'} className="cursor-pointer">
                <div className='text-xs md:text-sm '>Sign Up</div>
              </Button> */}
            </Link>
          </div>
          </div>

        </div>
      </div>
    </main>
  );
}

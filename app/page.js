"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress,
      imageUrl: user?.imageUrl,
      username: user?.fullName,
    });
    console.log(result);
  };

  return (
    <div className="min-h-screen bg-gradient flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Link href={'/'}>
        <Image src={"/logo.svg"} alt="logo" width={170} height={120} />
        </Link>
      </div>

      {/* Content */}
      <div className="text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Simplify <span className="text-red-500">PDF</span>{" "}
          <span className="text-blue-500">Note-Taking</span> with{" "}
          <span className="text-black">AI-Powered</span>
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Elevate your note-taking experience with our AI-powered PDF app.
          Seamlessly extract key insights, summaries, and annotations from any
          PDF with just a few clicks.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <Link href={'/dashboard'} className="bg-black text-white px-6 py-3 rounded-full text-lg font-medium hover:opacity-90">
            Get started
          </Link>
          <Link href={'/dashboard'} className="border-2 border-black text-black px-6 py-3 rounded-full text-lg font-medium hover:bg-black hover:text-white">
            Learn more
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 flex justify-around w-full max-w-2xl text-gray-500 text-center">
        <div>
          <h3 className="font-bold">The lowest price</h3>
          
        </div>
        <div>
          <h3 className="font-bold">The fastest on the market</h3>
          
        </div>
        <div>
          <h3 className="font-bold">The most loved</h3>
          
        </div>
      </div>
    </div>
  );
}

"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React from "react";
import { Layout, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import UploadPdfDialog from "./UploadPdfDialog";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

function SideBar() {
  const { user } = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress,
  });
  return (
    <div className="shadow-md h-screen p-7">
      <Link href={'/'}>
      <Image src={"/logo.svg"} alt="logo" width={170} height={120} />
      </Link>
      <div className="mt-10">
        <UploadPdfDialog>
        <Button className="w-full">+ Upload PDF</Button>
        </UploadPdfDialog>

        <div className="flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Layout />
          <h2>WorkSpace</h2>
        </div>
        
      </div>

      <div className="absolute bottom-10 w-[80%]">
        <Progress value={(fileList?.length/10)*100}/>
        <p className="text-sm mt-1">{fileList?.length} Out of 10 pdf uploaded</p>

        
      </div>
    </div>
  );
}

export default SideBar;

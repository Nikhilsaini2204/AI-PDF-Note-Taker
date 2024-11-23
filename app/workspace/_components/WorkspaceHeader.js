import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader({fileName}) {
  return (
    <div className='p-4 flex justify-between shadow-md'>
    <Link href={'/dashboard'}>
        <Image src={"/logo.svg"} alt='logo' width={140} height={100}/>
      </Link>
        <h2 className='font-bold'>{fileName}</h2>
        <div className='flex gap-2 items-center'>
          {/* <Button>Save</Button> */}
        <UserButton/>
        </div>
    </div>
  )
}

export default WorkspaceHeader

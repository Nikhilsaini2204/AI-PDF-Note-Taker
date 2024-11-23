"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import { useQueries, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FileEdit } from 'lucide-react';
import TextEditor from '../_components/TextEditor';

function WorkSpace() {
    const {fileId} = useParams();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
        fileId:fileId
    });

    useEffect(()=>{
        console.log(fileInfo)
    },[fileInfo]);

  return (
    <div>
        <WorkspaceHeader fileName = {fileInfo?.fileName}/>

        <div className='grid grid-cols-2 gap-5'>
            <div>
                {/* Text Editor */}
                <TextEditor fileId={fileId}/>
            </div>
            <div>
                {/* PDF Viewer */}
                <PdfViewer fileUrl = {fileInfo?.fileUrl}/>
            </div>
        </div>
    </div>
  )
}

export default WorkSpace
import { chatSession } from '@/config/AiModel';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useAction, useMutation } from 'convex/react';
import { Bold, Italic, Sparkles } from 'lucide-react'
import { useParams } from 'next/navigation';
import React from 'react'
import { toast } from 'sonner';

function EditorExtension({editor}) {
    const {fileId} = useParams();
    const SearchAi = useAction(api.myActions.search);
    const saveNotes = useMutation(api.notes.AddNotes);
    const {user} = useUser();
    const onAiClick = async () => {
      toast('AI is getting your answer...');
        const SelectedText = editor.state.doc.textBetween(
          editor.state.selection.from,
          editor.state.selection.to,
          ' '
        );
      
        if (!SelectedText.trim()) {
          console.error("No text selected");
          return;
        }
      
        console.log("SelectedText", SelectedText);
      
        
          const result = await SearchAi({
            query: SelectedText,
            fileId: fileId,
          });
          const UnformattedAns = JSON.parse(result);
          let AllUnformattedAns = '';
          UnformattedAns&&UnformattedAns.forEach(item=>{
            AllUnformattedAns=AllUnformattedAns+item.pageContent
        }) 

        const PROMPT = "For question"+SelectedText+"and with the given content as answer,"+
        "please give appropiate answer in HTML format and only in p tag . The answer content is:" +AllUnformattedAns;

        const AiModelResult = await chatSession.sendMessage(PROMPT);
        console.log(AiModelResult.response.text());
        const FinalAns = AiModelResult.response.text().replace('```', '').replace('html','').replace('```', '');

        const AllText = editor.getHTML();
        editor.commands.setContent(AllText+'<p> <strong>Answer: </strong>'+FinalAns+' </p>')

        saveNotes({
          notes:editor.getHTML(),
          fileId:fileId,
          createdBy:user?.primaryEmailAddress.emailAddress
        })

      };
  return editor&&(
    <div className='p-5 '>
        <div className="control-group">
        <div className="button-group flex gap-3">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "text-blue-500" : ""}
          >
            <Bold/>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'text-blue-500' : ''}
          >
            <Italic/>
          </button>
          <button
            onClick={() => onAiClick()}
            className={'hover:text-blue-500'}
          >
            <Sparkles/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditorExtension
import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfUrl ="https://little-retriever-534.convex.cloud/api/storage/3fdb2f54-6085-4873-9782-07b22402c148";

export async function GET(req) {
  const reqUrl = req.url;
  const {searchParams} = new URL(reqUrl);
  const pdfUrl = searchParams.get('pdfUrl');
  console.log(pdfUrl); 

  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent += doc.pageContent;
  });


  // 2. Split the text into small chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  
  const output = await splitter.createDocuments([pdfTextContent]);

  let splitterList = [];
  output.forEach(doc=>{
    splitterList.push(doc.pageContent);
  })

  return NextResponse.json({ result: splitterList });
}

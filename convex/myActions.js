import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Prepare metadata with fileId
    const metadata = { fileId: args.fileId };

    // Manually add metadata to each text and store it
    const textsWithMetadata = args.splitText.map((text) => ({
      text,
      metadata: { fileId: args.fileId },  // Ensure each document has fileId as metadata
    }));

    await ConvexVectorStore.fromTexts(
      textsWithMetadata.map(item => item.text),  // Only pass the text part
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyB0wHvu0agxXUJXgJ_pbM7ryAGT5XpdD6I",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx, metadata }  // Pass metadata as part of the options
    );

    return "completed..";
  },
});


export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: "AIzaSyB0wHvu0agxXUJXgJ_pbM7ryAGT5XpdD6I",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    console.log(args.fileId);

    const resultOne = (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter((doc) => {
      // Convert metadata object to a string
      const metadataFileId = Object.values(doc.metadata).join("");

      console.log("Metadata as string:", metadataFileId);  // Log the converted string
      return metadataFileId === args.fileId;  // Compare metadata string with fileId
    });

    console.log(resultOne);

    return JSON.stringify(resultOne);
  },
});

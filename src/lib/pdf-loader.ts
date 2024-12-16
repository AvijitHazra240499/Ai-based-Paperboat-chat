// import "pdf-parse"; // Peer dep
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { env } from "./config";
import { readdirSync } from 'fs';

export async function getChunkedDocsFromPDF() {
  try {
    
    console.log(
      '\n\n====================== pdf loader path================================\n'
        );
    const files = readdirSync(process.cwd(), { withFileTypes: true });
    files.forEach(file => {
      console.log(
        file.name,
        file.isDirectory() ? 'Directory' : 'File'
      );
    });

    console.log(
      '\n====================== pdf loader path================================\n\n'
        );
    // const loader = new PDFLoader(env.PDF_PATH);
    // const docs = await loader.load();

    // // From the docs https://www.pinecone.io/learn/chunking-strategies/
    // const textSplitter = new RecursiveCharacterTextSplitter({
    //   chunkSize: 1000,
    //   chunkOverlap: 200,
    // });

    // const chunkedDocs = await textSplitter.splitDocuments(docs);

    // return chunkedDocs;
  } catch (e) {
    console.error(e);
    throw new Error("PDF docs chunking failed !");
  }
}



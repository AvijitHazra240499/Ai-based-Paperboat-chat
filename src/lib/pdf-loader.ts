// import "pdf-parse"; // Peer dep
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { env } from "./config";

export async function getChunkedDocsFromPDF() {
  try {
    throw Error('\n\n====================== pdf loader path================================\n'+process.cwd()+'\n====================== pdf loader path================================\n\n')

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

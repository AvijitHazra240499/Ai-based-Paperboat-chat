import { env } from './config';
import { FreeEmbeddings } from "./embeddings";
import { PineconeStore } from "@langchain/pinecone"

// Using free embeddings (no API key required)
const embeddings = new FreeEmbeddings();

export async function embedAndStoreDocs(
  client: any,
  // @ts-ignore docs type error
  docs: Document<Record<string, any>>[]
) {
  /*create and store the embeddings in the vectorStore*/
  try {
    const index = client.Index(env.PINECONE_INDEX_NAME, `${env.PINECONE_INDEX_NAME}-1iymld5.svc.aped-4627-b74a.pinecone.io`);
    // embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      textKey: "text"
    });
   
  } catch (error) {
    console.log('error ', error);
    throw new Error('Failed to load your docs !');
  }
}

// Returns vector-store handle to be used a retrievers on langchains
export async function getVectorStore(client: any) {
  try {
    const index = client.Index(env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: 'text',
    });
    return vectorStore;
  } catch (error) {
    console.log('error ', error);
    throw new Error('Something went wrong while getting vector store !');
  }
}

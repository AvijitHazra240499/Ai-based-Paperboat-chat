import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { preparedoc } from "@/scripts/pinecone-prepare-pdf";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
 
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Use project's tmp directory (matches PDF_PATH in .env.local)
    const docsDir = path.join(process.cwd(), 'tmp');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const uint8Array = new Uint8Array(bytes);

    const docstargetPath = path.join(docsDir, 'target-docs.pdf');
    
    // Write file synchronously to ensure it exists before preparedoc runs
    fs.writeFileSync(docstargetPath, uint8Array);
    
    // Verify file was written
    if (!fs.existsSync(docstargetPath)) {
      throw new Error('Failed to write PDF file');
    }
    
    console.log('PDF saved to:', docstargetPath);
    
    await preparedoc();

    return NextResponse.json(
      { message: 'File uploaded successfully & deployed' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

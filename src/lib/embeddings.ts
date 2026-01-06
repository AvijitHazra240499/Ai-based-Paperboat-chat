import { Embeddings } from "@langchain/core/embeddings";

// You can get a free Voyage AI API key at https://www.voyageai.com/ (50M free tokens)
// Or set VOYAGE_API_KEY in .env.local
export class FreeEmbeddings extends Embeddings {
  private apiKey: string;

  constructor() {
    super({});
    this.apiKey = process.env.VOYAGE_API_KEY || '';
  }

  async embedDocuments(texts: string[]): Promise<number[][]> {
    if (!this.apiKey) {
      console.log('No VOYAGE_API_KEY found, using fallback embeddings');
      return texts.map(text => this.fallbackEmbedding(text));
    }

    const response = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        input: texts,
        model: 'voyage-2'
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Voyage API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.data.map((item: any) => item.embedding);
  }

  async embedQuery(text: string): Promise<number[]> {
    const embeddings = await this.embedDocuments([text]);
    return embeddings[0];
  }

  // Fallback: TF-IDF style embedding when no API key
  private fallbackEmbedding(text: string): number[] {
    const dimensions = 1024; // voyage-2 uses 1024 dimensions
    const embedding = new Array(dimensions).fill(0);
    const words = text.toLowerCase().split(/\s+/);
    
    for (const word of words) {
      let hash = 0;
      for (let i = 0; i < word.length; i++) {
        hash = ((hash << 5) - hash) + word.charCodeAt(i);
        hash = hash & hash;
      }
      const idx = Math.abs(hash) % dimensions;
      embedding[idx] += 1;
    }
    
    // Normalize
    const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0)) || 1;
    return embedding.map(val => val / magnitude);
  }
}

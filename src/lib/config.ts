import z from 'zod';

const envSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1).optional(), // Optional - only needed for embeddings
  OPENROUTER_API_KEY: z.string().trim().min(1),
  OPENROUTER_BASE_URL: z.string().trim().min(1).default("https://openrouter.ai/api/v1"),
  OPENROUTER_MODEL: z.string().trim().min(1).default("openai/gpt-4o-mini"),
  PINECONE_API_KEY: z.string().trim().min(1),
  PINECONE_ENVIRONMENT: z.string().trim().min(1),
  PINECONE_INDEX_NAME: z.string().trim().min(1),
  PDF_PATH: z.string().trim().min(1),
  INDEX_INIT_TIMEOUT: z.coerce.number().min(1),
});

export const env = envSchema.parse(process.env);

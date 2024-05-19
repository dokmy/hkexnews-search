import { NextRequest, NextResponse } from 'next/server';
import { Pinecone } from '@pinecone-database/pinecone';
import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    console.log('Received search query:', query);

    // Embed the query using OpenAI API
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: query,
    });

    const embedding = response.data[0].embedding;
    console.log('Generated embedding:', embedding);

    // Initialize Pinecone client
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY || '',
    });
    const index = pc.index('hkexnews');

    // Perform vector search in Pinecone
    const queryResponse = await index.namespace('').query({
      vector: embedding,
      topK: 10,
      includeMetadata: true,
    });

    console.log('Pinecone search results:', queryResponse);

    return NextResponse.json(queryResponse);
  } catch (error) {
    console.error('Error during vector search:', error);
    return NextResponse.json({ error: 'An error occurred during vector search.' }, { status: 500 });
  }
}
import OpenAI from "openai";
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI();

interface neutral_cit_filter {
  neutral_cit: string
}

// The function `getContext` is used to retrieve the context of a given message
export const getContext = async (message: string, filter:string, maxTokens = 25000): Promise<any> => {

  // Get the embeddings of the input message
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: message,
  });

  const embedding = response.data[0].embedding;

  const url_filter = {"URL": filter}

  console.log("Context.ts -  Here is my filter: " + JSON.stringify(url_filter))

  // Retrieve the matches for the embeddings from the specified namespace
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || '',
  });
  const index = pc.index('hkexnews');

  // Perform vector search in Pinecone
  const queryResponse = await index.namespace('').query({
    vector: embedding,
    topK: 10,
    filter: url_filter,
    includeMetadata: true,
  });

  console.log('Pinecone search results:', queryResponse);

  const matches = queryResponse.matches;

  let text_array: any[] = []
  matches.map((match) => {
    let text = "";
    const metadata = match.metadata;
    if (metadata == undefined) {
      text = "No context found.";
      return;
    }
  
    const _node_content = metadata._node_content;
    if (typeof _node_content === "string") {
      const node_content = JSON.parse(_node_content);
      text = node_content.text;
    } else {
      text = "Invalid node content.";
    }
  
    text_array.push(text);
    // console.log(text_array);
  });

  const context_text = text_array.join("\n").substring(0, maxTokens)
  console.log("Context.ts -  Here is the context text that I will send back to the API:\n" + context_text)
  return context_text
}

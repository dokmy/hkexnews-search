import OpenAI from "openai";
import { Pinecone } from '@pinecone-database/pinecone';
import { encoding_for_model } from 'tiktoken';

const openai = new OpenAI();

// The function `getContext` is used to retrieve the context of a given message
export const getContext = async (message: string, filter:string, maxTokens = 7000): Promise<any> => {

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
  });

  const combinedText = text_array.join('\n');

  // Tokenize the combined text and truncate to the desired maxTokens
  const encoding = encoding_for_model('text-embedding-ada-002');
  const tokens = encoding.encode(combinedText);

  // Truncate to maxTokens
  const truncatedTokens = tokens.slice(0, maxTokens);
  const truncatedText = encoding.decode(truncatedTokens);

  console.log('Context.ts - Number of tokens in combined text: ' + tokens.length);
//   console.log('Context.ts - Here is the context text that I will send back to the API:\n' + truncatedText);
  return truncatedText;
}

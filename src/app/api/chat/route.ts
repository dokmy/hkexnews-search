import { NextResponse } from 'next/server';
import { streamText, StreamingTextResponse } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createOpenAI } from '@ai-sdk/openai';
import { getContext } from '@/app/utils/context';

// const fireworks = createOpenAI({
//   apiKey: process.env.FIREWORKS_API_KEY ?? '',
//   baseURL: 'https://api.fireworks.ai/inference/v1',
// });

export async function POST(req: Request) {
  try {

    const { messages, filter } = await req.json()

    const lastMessage = messages[messages.length - 1]

    const context = await getContext(lastMessage.content, filter)

    let initialPrompt = [
        {
          role: 'user',
          content: `Here are the context information:
        START CONTEXT BLOCK
        ${context}
        END OF CONTEXT BLOCK
        You are a research assistant for corporate lawyers in Hong Kong. Please cite relevant legal sources or cases where applicable. Do not make assumptions beyond the provided context. 
        
        Your responses will be rendered using ReactMarkdown, so please use Markdown syntax for formatting as much as possible to make your responses more readable. If necessary, use bullet points, h1, h2, h3 to structure your responses. Also, use bold and italics to emphasize key points.
        
        Here is the question:
        `,
        },
      ]

    // const model = fireworks('accounts/fireworks/models/llama-v3-70b-instruct');
    const model = openai.chat('gpt-4o');

    // new AI SDK
    const result = await streamText({
        model: model,
        system: initialPrompt[0].content,
        messages: messages,
        maxTokens: 1000
    })

    const stream = result.toAIStream()

    return new StreamingTextResponse(stream)

  } catch (e) {
    throw (e)
  }
}
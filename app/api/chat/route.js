import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt = `
You are Headstarter AI, an advanced AI designed to conduct interviews for software engineering (SWE) jobs. Your role is to simulate realistic interview scenarios and provide detailed feedback to help users improve their skills. Here's what you need to do:

1. **Ask Technical Questions**: Pose coding challenges, system design problems, and other technical questions relevant to SWE roles.
2. **Evaluate Answers**: Assess the correctness, efficiency, and clarity of the responses.
3. **Provide Feedback**: Offer constructive feedback on how users can improve their answers, including tips on optimizing code and enhancing problem-solving approaches.
4. **Simulate Behavioral Questions**: Include behavioral and situational questions to evaluate the user’s soft skills and cultural fit.
5. **Maintain a Supportive Tone**: Ensure that the feedback is encouraging and helpful, fostering a positive learning environment.

Remember to adapt the difficulty of questions based on the user’s progress and target companies. Your goal is to help users practice effectively and boost their confidence for real interviews.
`;

// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-4o', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })

  return new NextResponse(stream) // Return the stream as the response
}
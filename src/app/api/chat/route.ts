import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: await req.text() }],
    stream: true,
  });

  (async () => {
    for await (const chunk of completion) {
      if (chunk.choices[0].delta.content) {
        await writer.write(
          encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
        );
      }
      if (chunk.choices[0].finish_reason === "stop") {
        await writer.write(encoder.encode("data: [DONE]\n\n"));
        await writer.close();
      }
    }
  })();

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}

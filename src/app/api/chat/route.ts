import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const api_base = process.env.OPENAI_API_BASE;
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: api_base?.slice(-1) == "/" ? api_base + "v1" : api_base + "/v1",
  });
  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // 使用正确的模型名称
      messages: [{ role: "user", content: await req.text() }],
      stream: true,
    });

    (async () => {
      try {
        for await (const chunk of completion) {
          if (chunk.choices[0]?.delta?.content) {
            await writer.write(
              encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`)
            );
          }
          if (chunk.choices[0]?.finish_reason === "stop") {
            await writer.write(encoder.encode("data: [DONE]\n\n"));
            await writer.close();
          }
        }
      } catch (error) {
        console.error("流处理错误:", error);
        await writer.abort();
      }
    })();

    return new NextResponse(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("API 错误:", error);
    return NextResponse.json({ error: "内部服务器错误" }, { status: 500 });
  }
}

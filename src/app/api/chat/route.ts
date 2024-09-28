import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqJson = await req.json();
    let api_base;
    let api_key;

    if (reqJson.secret && reqJson.secret == process.env.SECRET_KEY) {
      api_base =
        reqJson.baseUrl ||
        process.env.OPENAI_API_BASE ||
        "https://api.openai.com";
      api_key = reqJson.key || process.env.OPENAI_API_KEY;
    } else {
      api_base = reqJson.baseUrl || "https://api.openai.com";
      api_key = reqJson.key || "";
    }

    if (api_key == "") {
      return NextResponse.json(
        { msg: { error: "api_key is not set" }, code: 400 },
        { status: 400 }
      );
    }

    const openai = new OpenAI({
      apiKey: api_key,
      baseURL: api_base?.slice(-1) == "/" ? api_base + "v1" : api_base + "/v1",
    });
    
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    const completion = await openai.chat.completions.create({
      model: reqJson.model, // 使用正确的模型名称
      messages: [
        { role: "system", content: reqJson.systemPrompt },
        ...reqJson.historyMsgList,
      ],
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
        // console.error("流处理错误:", error);
        await writer.abort();
      }
    })();

    return new NextResponse(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error: any) {
    // console.error("API 错误:", error);
    if (error.error) {
      return NextResponse.json({ msg: { error: error.error }, code: 500 }, { status: 500 });
    } else {
      return NextResponse.json({ msg: { error: "api error, please check your api key and model name" }, code: 500 }, { status: 500 });
    }
  }
}

export async function GET() {
  return NextResponse.json({ msg: "hello" });
}

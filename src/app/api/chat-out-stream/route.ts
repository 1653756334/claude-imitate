import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqJson = await req.json();

    let api_base = reqJson.baseUrl || process.env.OPENAI_API_BASE || "https://api.openai.com";
    let api_key = reqJson.key || process.env.OPENAI_API_KEY;

    if (!api_key) {
      return NextResponse.json({ msg: { error: "api_key is not set" } }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: api_key,
      baseURL: api_base?.slice(-1) == "/" ? api_base + "v1" : api_base + "/v1",
    });

    const completion = await openai.chat.completions.create({
      model: reqJson.model,
      messages: [
        { role: "system", content: reqJson.systemPrompt },
        ...reqJson.historyMsgList,
      ],
      stream: false,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ msg: response });

  } catch (error: any) {
    return NextResponse.json({ msg: error.message }, { status: 500 });
  }
}

// GET 函数保持不变
export async function GET() {
  return NextResponse.json({ msg: "hello" });
}
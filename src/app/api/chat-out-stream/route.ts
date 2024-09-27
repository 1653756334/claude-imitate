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

    const completion = await openai.chat.completions.create({
      model: reqJson.model,
      messages: [
        { role: "system", content: reqJson.systemPrompt },
        ...reqJson.historyMsgList,
      ],
      stream: false,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ msg: response, code: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { msg: error.message, code: 500 },
      { status: 500 }
    );
  }
}

// GET 函数保持不变
export async function GET() {
  return NextResponse.json({ msg: "hello" });
}

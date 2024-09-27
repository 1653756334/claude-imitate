import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const secret = formData.get("secret") as string;
  let filePostUrl = formData.get("filePostUrl") as string;

  if (!filePostUrl && secret == process.env.SECRET_KEY) {
    filePostUrl = process.env.FILE_POST_URL || "";
  } else if (!filePostUrl) {
    return NextResponse.json(
      { msg: { error: "没有配置文件上传接口，请配置 文件接口 或者 密钥" } },
      { status: 401 }
    );
  }

  if (!file) {
    return NextResponse.json(
      { msg: { error: "没有上传文件" } },
      { status: 400 }
    );
  }

  const serverFormData = new FormData();
  serverFormData.append("file", file, file.name);

  if (!filePostUrl) {
    throw new Error("环境变量中未定义 FILE_POST_URL");
  }
  try {
    const response = await fetch(filePostUrl, {
      method: "POST",
      body: serverFormData,
      redirect: "follow",
    });

    if (!response.ok) {
      const res = await response.text();
      console.log("---处理文件时出错:", res);
      throw new Error(`HTTP 错误！状态码: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("处理文件时出错:", error);
    return NextResponse.json(
      { msg: { error: "处理文件时出错" } },
      { status: 500 }
    );
  }
}

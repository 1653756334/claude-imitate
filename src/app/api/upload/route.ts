import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '没有找到文件' }, { status: 400 });
    }

    // 这里应该添加您的文件处理逻辑
    // 例如,保存文件到服务器或者上传到云存储等

    // 模拟文件上传成功
    return NextResponse.json({ message: '文件上传成功', fileName: file.name }, { status: 200 });
  } catch (error) {
    console.error('文件上传错误:', error);
    return NextResponse.json({ error: '文件上传失败' }, { status: 500 });
  }
}

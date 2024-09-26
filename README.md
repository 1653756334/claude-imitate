本项目是一个基于Next.js的聊天机器人项目，使用了OpenAI的API格式发送数据。

对于其他的api如 claude 可以使用 [one-api](https://github.com/songquanpeng/one-api) 进行转发

本项目模仿 claude 的 ui 和交互，代码块的功能暂时没有实现

上传文件续自备接口，接口格式满足
### 文件上传接口描述

```javascript
let formdata = new FormData();
formdata.append("file", fileInput.files[0], "200.txt");

let requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://xxxx", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

返回接口

```json
{
  "code": 0,
  "msg": "ok",
  "data": {
    "url": "https://xxx",
    "filename": "200.txt",
    "image": false
  }
}
```

run 
```bash
pnpm dev
```
to test this project

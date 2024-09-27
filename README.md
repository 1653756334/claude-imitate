本项目是一个基于Next.js的聊天机器人项目，使用了OpenAI的API格式发送数据。

对于其他的api如 claude 可以使用 [one-api](https://github.com/songquanpeng/one-api) 进行转发

本项目模仿 claude 的 ui 和交互，代码块的功能暂时没有实现，后续会尝试补充

做了简单的移动端适配，但是可能存在一些问题，欢迎提issue

目前i18n仅做了中英文

### 项目运行

```bash
pnpm install
# 开发环境
pnpm dev
# 生产环境
pnpm build
pnpm start
```

欢迎各位使用



### 文件上传接口描述
**没有最单独的文件上传相关内容，仅仅是将文件URL发送给AI，需要你的AI模型支持文件才能使用**
上传文件续自备接口，接口格式满足

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

### 效果演示

[首页](./images/Snipaste_2024-09-27_19-12-12.png)

[聊天页面](./images/Snipaste_2024-09-27_19-14-53.png)

[设置](./images/Snipaste_2024-09-27_19-15-27.png)

[历史记录](./images/Snipaste_2024-09-27_19-24-26.png)


export const DEFAULT_MODEL = "gpt-4o-mini";

export const DEFAULT_MODEL_LIST = [
  { value: "gpt-3.5-turbo", label: "GPT3.5 Turbo" },
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o mini" },
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-4-turbo-preview", label: "GPT-4 Turbo Preview" },
  { value: "gpt-4-vision-preview", label: "GPT-4 Vision Preview" },
  { value: "claude-3-5-sonnet-20240620", label: "Claude 3.5 Sonnet" },
  { value: "claude-3-opus-20240229", label: "Claude 3 Opus" },
  { value: "claude-3-haiku-20240307", label: "Claude 3 Haiku" },
  { value: "o1-mini", label: "o1-mini" },
  { value: "o1-preview", label: "o1-preview" },
];

export const FILE_POST_URL_DESC =
  "### 文件上传接口描述\n" +
  "```javascript\n" +
  `let formdata = new FormData();
formdata.append("file", fileInput.files[0], "200.txt");

let requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://xxxx", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));\n` +
  "```" +
  "\n" +
  `返回接口\n` +
  "```json\n" +
  `{
    code: 0,
    msg: "ok",
    data: {
      url: "https://xxx",
      filename: "200.txt",
      image: false,
    },
   }\n` +
  "```";

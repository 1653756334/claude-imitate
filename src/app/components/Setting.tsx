import React, { useState } from "react";
import { Slider, Dropdown, Button, InputNumber, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

export default function Setting() {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [modelNames, setModelNames] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [temperature, setTemperature] = useState(0.5);
  const [historyCount, setHistoryCount] = useState(5);
  const [systemPrompt, setSystemPrompt] = useState("");

  const modelOptions = [
    { key: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
    { key: "gpt-4o", label: "gpt-4o" },
    { key: "gpt-4o-mini", label: "gpt-4o-mini" },
    { key: "gpt-4-turbo", label: "gpt-4-turbo" },
    { key: "claude-3-5-sonnet-20240620", label: "Claude 3.5 Sonnet" },
  ];

  const handleModelChange = (modelInfo: { key: string }) => {
    const model = modelOptions.find((item) => item.key === modelInfo.key);
    if (!model) return;
    setModel(model.label);
  };

  return (
    <div className="bg-white shadow-md rounded-lg md:w-[500px] max-md:w-[95vw] mx-auto text-gray-700">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">设置</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              自定义接口
            </label>
            <div className="w-1/2 flex items-center">
              <Input
                onChange={(e) => setApiEndpoint(e.target.value)}
                placeholder="https://api.openai.com/v1/"
                value={apiEndpoint}
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              自定义模型名
            </label>
            <div className="w-1/2 flex items-center">
              <Input
                type="text"
                value={modelNames}
                onChange={(e) => setModelNames(e.target.value)}
                placeholder="model1,model2,model3"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              模型
            </label>
            <Dropdown
              menu={{
                items: modelOptions,
                onClick: (e) => handleModelChange(e),
              }}
            >
              <Button>
                {model}
                <DownOutlined />
              </Button>
            </Dropdown>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              历史记录条数
            </label>
            <div className="w-1/2 flex items-center">
              <Slider
                min={0}
                max={16}
                step={1}
                value={historyCount}
                onChange={(value) => setHistoryCount(value)}
                className="w-4/5"
              />
              <InputNumber
                min={1}
                max={20}
                style={{ margin: "0 16px" }}
                value={historyCount}
                onChange={(value) => setHistoryCount(value || 0)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              随机性
            </label>
            <div className="w-1/2 flex items-center">
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={temperature}
                onChange={(value) => setTemperature(value)}
                className="w-4/5"
              />
              <InputNumber
                min={0}
                max={1}
                step={0.1}
                style={{ margin: "0 16px" }}
                value={temperature}
                onChange={(value) => setTemperature(value || 0)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              系统提示词
            </label>
            <div className="w-1/2 flex items-center">
              <TextArea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="请输入系统提示词"
                autoSize={{ minRows: 3, maxRows: 5 }}
                className="scrollbar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

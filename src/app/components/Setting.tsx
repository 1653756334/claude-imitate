import React, { useState } from "react";

export default function Setting() {
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [modelNames, setModelNames] = useState("");
  const [model, setModel] = useState("");
  const [temperature, setTemperature] = useState(0.5);
  const [historyCount, setHistoryCount] = useState(5);
  const [maxTokens, setMaxTokens] = useState(4000);

  return (
    <div className="bg-white shadow-md rounded-lg w-[500px] mx-auto">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">设置</h2>
      </div>
      <div className="p-6">
        <p className="text-sm text-gray-600 mb-4">所有设置选项</p>

        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              自定义接口
            </label>
            <div className="w-1/2 flex items-center">
              <input
                className="p-2 border rounded-md text-sm outline-none w-full"
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
            <input
              type="text"
              value={modelNames}
              onChange={(e) => setModelNames(e.target.value)}
              className="w-1/2 p-2 border rounded-md text-sm"
              placeholder="model1,model2,model3"
            />
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              模型 (model)
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-1/2 p-2 border rounded-md text-sm"
            >
              <option value="gpt-3.5-turbo(OpenAI)">
                gpt-3.5-turbo(OpenAI)
              </option>
              {/* Add other model options here */}
            </select>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              历史记录条数
            </label>
            <div className="w-1/2 flex items-center">
              <input
                type="range"
                min="0"
                max="16"
                step="1"
                value={historyCount}
                onChange={(e) => setHistoryCount(parseInt(e.target.value))}
                className="w-3/4 mr-2"
              />
              <input
                type="number"
                value={historyCount}
                onChange={(e) => setHistoryCount(parseInt(e.target.value))}
                className="w-1/4 p-1 border rounded-md text-sm"
                min="0"
                max="16"
                step="1"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              随机性 (temperature)
            </label>
            <div className="w-1/2 flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-3/4 mr-2"
              />
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-1/4 p-1 border rounded-md text-sm"
                min="0"
                max="1"
                step="0.1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

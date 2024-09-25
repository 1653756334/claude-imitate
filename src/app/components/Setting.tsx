import React, { useState, useEffect } from "react";
import { Slider, Dropdown, Button, InputNumber, Input, Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import { useSettingStore } from "../lib/store";

interface SettingProps {
  t: Global.Dictionary;
}

export default function Setting({ t }: SettingProps) {
  const { settings, saveOneSettingToLocal } = useSettingStore();

  const handleModelChange = (model: Store.Model) => {
    saveOneSettingToLocal("currentDisplayModel", model.label);
    saveOneSettingToLocal("currentModel", model.value);
  };

  return (
    <div className="bg-white shadow-md rounded-lg md:w-[500px] max-md:w-[95vw] mx-auto text-gray-700">
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-xl font-semibold">{t.setting.title}</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              {t.setting.api_endpoint}
            </label>
            <div className="w-1/2 flex items-center">
              <Input
                onChange={(e) => saveOneSettingToLocal("baseUrl", e.target.value)}
                placeholder="https://api.openai.com/"
                value={settings.baseUrl}
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              {t.setting.api_key}
            </label>
            <div className="w-1/2 flex items-center">
              <Input
                type="text"
                value={settings.APIKey}
                onChange={(e) => saveOneSettingToLocal("APIKey", e.target.value)}
                placeholder="sk-xxx"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              {t.setting.custom_model}
            </label>
            <div className="w-1/2 flex items-center">
              <Input
                type="text"
                value={settings.customerModels.join(",")}
                onChange={(e) => saveOneSettingToLocal("customerModels", e.target.value.split(",").map((model) => model.trim()))}
                placeholder="model1,model2,model3"
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              {t.setting.model}
            </label>
            <Select 
              defaultValue={settings.currentDisplayModel}
              optionFilterProp="label"
              onChange={(_, option) => handleModelChange(option as Store.Model)}
              options={settings.models}
              showSearch
              style={{ width: "50%" }}
            >
            </Select>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              {t.setting.history_count}
            </label>
            <div className="w-1/2 flex items-center">
              <Slider
                min={0}
                max={16}
                step={1}
                value={settings.historyNum}
                onChange={(value) => saveOneSettingToLocal("historyNum", value)}
                className="w-4/5"
              />
              <InputNumber
                min={1}
                max={20}
                style={{ margin: "0 16px" }}
                value={settings.historyNum}
                onChange={(value) => saveOneSettingToLocal("historyNum", value || 0)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              {t.setting.random}
            </label>
            <div className="w-1/2 flex items-center">
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={settings.random}
                onChange={(value) => saveOneSettingToLocal("random", value)}
                className="w-4/5"
              />
              <InputNumber
                min={0}
                max={1}
                step={0.1}
                style={{ margin: "0 16px" }}
                value={settings.random}
                onChange={(value) => saveOneSettingToLocal("random", value || 0)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <label className="w-1/2 text-sm font-medium text-gray-700">
              {t.setting.system_prompt}
            </label>
            <div className="w-1/2 flex items-center">
              <TextArea
                value={settings.sysPrompt}
                onChange={(e) => saveOneSettingToLocal("sysPrompt", e.target.value)}
                placeholder={t.setting.system_prompt_placeholder}
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

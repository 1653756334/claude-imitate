import { Input, message } from "antd";
import React, { useRef } from "react";
import { useUserStore } from "../../lib/store";
import Image from "next/image";
import { UploadOutlined } from "@ant-design/icons";

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function User({ t }: { t: Global.Dictionary }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { user, setOneUserInfoToLocal } = useUserStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // 限制在2M
    if (!file) {
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      message.error(t.setting.image_size_limit);
      return;
    }
    if (file) {
      getBase64(file).then((base64) => {
        setOneUserInfoToLocal("avatar", base64);
      });
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-4">
        <div className="flex items-center">
          <label className="w-1/2 text-sm font-medium text-gray-700">
            {t.setting.nickname}
          </label>
          <div className="w-1/2 flex items-center">
            <Input
              type="text"
              value={user.name}
              onChange={(e) => setOneUserInfoToLocal("name", e.target.value)}
              placeholder="model1,model2,model3"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-1/2 text-sm font-medium text-gray-700">
            {t.setting.email}
          </label>
          <div className="w-1/2 flex items-center">
            <Input
              type="text"
              value={user.email}
              onChange={(e) => setOneUserInfoToLocal("email", e.target.value)}
              placeholder="model1,model2,model3"
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="w-1/2 text-sm font-medium text-gray-700">
            {t.setting.avatar}
          </label>
          <div className="w-1/2 flex items-center justify-evenly">
            <div
              className={`w-20 h-20 rounded-full overflow-hidden cursor-pointer relative group`}
              onClick={() => inputRef.current?.click()}
            >
              <Image src={user.avatar} width={80} height={80} alt={"头像"} className="object-cover w-full h-full"/>
              <div
                className={`absolute inset-0 z-10 flex items-center justify-center text-2xl bg-black/30 
                text-gray-200 group-hover:opacity-100 opacity-0 transition-opacity duration-300`}
              >
                <UploadOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleImageChange}
      />
    </div>
  );
}

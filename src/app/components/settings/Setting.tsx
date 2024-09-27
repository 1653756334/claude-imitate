import { Tabs } from "antd";

import Common from "./Common";
import Deep from "./Deep";
import User from "./User";

interface SettingProps {
  t: Global.Dictionary;
}

export default function Setting({ t }: SettingProps) {
  const items = [
    {
      key: "1",
      label: t.setting.common,
      children: <Common t={t} />,
    },
    {
      key: "3",
      label: t.setting.deep,
      children: <Deep t={t} />,
    },
    {
      key: "2",
      label: t.setting.user,
      children: <User t={t} />,
    },
  ];
  return (
    <div className="bg-white shadow-md rounded-lg md:w-[500px] max-md:w-[95vw] mx-auto text-gray-700 p-2">
      <Tabs items={items} />
    </div>
  );
}

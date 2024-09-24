"use client";
import React, { useEffect, useState } from "react";
import { IconProvider } from "@/app/components/IconProvider";
import PrintWord from "@/app/components/PrintWord";
import { Form, Tabs } from 'antd';

import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";

const wordList = [
  "Don't limit your imagination",
]

export default function LoginContent({t}: Login.LoginContentProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [word, setWord] = useState(wordList[0]);
  
  const [form] = Form.useForm<Login.LoginFrom>();

  useEffect(() => {
    const interval = setInterval(() => {
      setWord(wordList[Math.floor(Math.random() * wordList.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onLogin = (form: Login.LoginFrom) => {
    console.log('表单提交:', form);
    // 这里添加处理登录、注册或重置密码的逻辑
  };

  const onRegister = (form: Login.RegisterFrom) => {
    console.log('表单提交:', form);
    // 这里添加处理注册的逻辑
  };

  const onResetPassword = (form: Login.ResetPasswordFrom) => {
    console.log('表单提交:', form);
    // 这里添加处理重置密码的逻辑
  };

  const sendVerificationCode = async (email: string) => {
    console.log('发送验证码:', email);
  };

  const tableItems = [
    {
      key: 'login',
      label: t.login.login,
      children: <Login form={form} setActiveTab={setActiveTab} onLogin={onLogin} t={t}/>,
    },
    {
      key: 'register',
      label: t.login.register,
      children: <Register form={form} onRegister={onRegister} sendVerificationCode={sendVerificationCode} t={t}/>,
    },
  ];


  return (
    <div className="h-screen bg-[#f5f4ef]">
      <div className="w-1/2 bg-[#f5f4ef] mx-auto max-sm:w-screen">
        <div className="flex grow flex-col justify-center pt-2 [@media(min-height:800px)]:pt-6 [@media(min-height:900px)]:pt-10 w-full min-h-screen px-5 -translate-y-10">
          <div className="flex justify-center gap-3 items-center text-2xl" >
            <IconProvider.AI fill="#d97757" width={32} height={32}/> {t.title}
          </div>
          <div className="select-none mt-12">
            <PrintWord word={word}/>
          </div>
          <div className=" mt-16 w-[460px] max-sm:w-[90vw] mx-auto bg-[#f1efe7] rounded-3xl border-2 border-[#d2d0c5] px-10 py-6">
            <Tabs activeKey={activeTab} onChange={setActiveTab} items={tableItems} defaultActiveKey="login"/>
            {activeTab === 'forgotPassword' && (
              <ResetPassword form={form} onResetPassword={onResetPassword} sendVerificationCode={sendVerificationCode} setActiveTab={setActiveTab} t={t}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

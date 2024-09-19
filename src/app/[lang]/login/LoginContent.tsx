"use client";
import Modal from "@/app/components/Modal";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("login");
  };

  return (
    <div
      className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0"
      style={{ fontFamily: "'Lato','sans-serif'" }}
    >
      <header className="max-w-lg mx-auto select-none">
        <h1 className="text-4xl font-bold text-white text-center">Startup</h1>
      </header>

      <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">
            {isLogin ? "欢迎登录 Startup" : "注册 Startup"}
          </h3>
          <p className="text-gray-600 pt-2">
            {isLogin ? "登录您的账户" : "创建新账户"}
          </p>
        </section>

        <section className="mt-10">
          <form className="flex flex-col" onSubmit={handleLogin}>
            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="email"
              >
                邮箱
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 py-1"
              />
            </div>

            {!isLogin && (
              <div className="mb-6 pt-3 rounded bg-gray-200">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                  htmlFor="verificationCode"
                >
                  验证码
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="verificationCode"
                    className="flex-1 bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 py-1"
                  />
                  <button
                    type="button"
                    className="ml-2 bg-purple-600 text-white px-4 py-2 rounded"
                  >
                    发送验证码
                  </button>
                </div>
              </div>
            )}

            <div className="mb-6 pt-3 rounded bg-gray-200">
              <label
                className="block text-gray-700 text-sm font-bold mb-2 ml-3"
                htmlFor="password"
              >
                密码
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 py-1 pb-2"
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 flex items-center scale-75 text-gray-500 group-hover:opacity-100 opacity-0 transition-opacity duration-300"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <div
                  className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6 cursor-pointer"
                  onClick={() => setShowForgetPasswordModal(true)}
                >
                  忘记密码？
                </div>
              </div>
            )}

            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              type="submit"
            >
              {isLogin ? "登录" : "注册"}
            </button>
          </form>
        </section>
      </main>

      <div className="max-w-lg mx-auto text-center mt-12 mb-6">
        <p className="text-white">
          {isLogin ? "还没有账户？" : "已有账户？"}
          <a
            href="#"
            className="font-bold hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "注册" : "登录"}
          </a>
        </p>
      </div>

      <footer className="max-w-lg mx-auto flex justify-center text-white">
        <a href="#" className="hover:underline">
          Contact
        </a>
        <span className="mx-3">•</span>
        <a href="#" className="hover:underline">
          Privacy
        </a>
      </footer>
      <Modal
        isOpen={showForgetPasswordModal}
        onClose={() => {
          setShowForgetPasswordModal(false);
        }}
        onConfirm={() => {
          // setShowForgetPasswordModal(false);
        }}
      >
        <div className="px-10">
          <h1 className="text-xl mb-2">忘记密码</h1>
          <p className="text-gray-600">
            请输入您的邮箱，收到验证码后，请在10分钟内完成验证
          </p>
          <div className="mt-6">
            <input
              type="email"
              id="email"
              placeholder="请输入您的邮箱"
              className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 py-1"
            />
          </div>
          <div className="flex mt-6">
            <input
              type="text"
              className="flex-1 bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 py-1"
              placeholder="请输入验证码"
            />
            <button className="ml-2 bg-purple-600 text-white px-4 py-2 rounded">
              发送验证码
            </button>
          </div>
          <div className="flex justify-end mt-6 relative group">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              className="flex-1 w-full bg-gray-200 rounded text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 py-1 pr-10"
              placeholder="请输入新密码"
            />
            <div
              className="absolute cursor-pointer right-2 top-[0.3rem] text-gray-500 group-hover:opacity-100 opacity-0 transition-opacity duration-300 scale-75"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import { LockOutlined, MailOutlined, SafetyOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import React, { useState } from "react";

export default function Register({
  form,
  onRegister,
  sendVerificationCode,
}: Login.RegisterProps) {
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const onEmailSend = () => {
    sendVerificationCode(form.getFieldValue("email"));
    setSendingCode(true);
    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
				if(prevCountdown <= 0) {
					setSendingCode(false);
					clearInterval(interval);
					return 0;
				}
        return prevCountdown - 1;
      });
    }, 1000);
  };

  return (
    <div>
      <Form name="register" onFinish={onRegister}>
        <Form.Item
          name="email"
          rules={[
            { required: true, type: "email", message: "请输入有效的邮箱地址" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="邮箱" />
        </Form.Item>
        <Form.Item>
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item
              name="verificationCode"
              noStyle
              rules={[{ required: true, message: "请输入验证码" }]}
            >
              <Input
                prefix={<SafetyOutlined />}
                style={{ width: "calc(100% - 120px)" }}
                placeholder="验证码"
              />
            </Form.Item>
            <Button
              style={{ width: "120px" }}
              disabled={sendingCode || countdown > 0}
              onClick={onEmailSend}
            >
              {countdown > 0 ? `${countdown}秒后重发` : "发送验证码"}
            </Button>
          </Space.Compact>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "请确认密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次输入的密码不一致"));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="确认密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

export default function Login({ form, setActiveTab, onLogin }: Login.LoginProps) {
  return (
    <div>
      <Form name="login" onFinish={onLogin} form={form}>
        <Form.Item
          name="email"
          rules={[
            { required: true, type: "email", message: "请输入有效的邮箱地址" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
        <Button type="link" onClick={() => setActiveTab("forgotPassword")}>
          忘记密码？
        </Button>
      </Form>
    </div>
  );
}

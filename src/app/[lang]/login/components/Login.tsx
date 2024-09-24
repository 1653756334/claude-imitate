import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React from "react";

export default function Login({ form, setActiveTab, onLogin, t }: Login.LoginProps) {
  return (
    <div>
      <Form name="login" onFinish={onLogin} form={form}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: t.login.email_required },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={t.login.email} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t.login.password_required }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.login.password} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t.login.login}
          </Button>
        </Form.Item>
        <Button type="link" onClick={() => setActiveTab("forgotPassword")}>
          {t.login.forgot_password}
        </Button>
      </Form>
    </div>
  );
}

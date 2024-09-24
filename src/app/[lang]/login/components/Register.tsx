import {
  LockOutlined,
  MailOutlined,
  SafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import React, { useState } from "react";

export default function Register({
  form,
  onRegister,
  sendVerificationCode,
  t,
}: Login.RegisterProps) {
  const [sendingCode, setSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const onEmailSend = () => {
    sendVerificationCode(form.getFieldValue("email"));
    setSendingCode(true);
    setCountdown(10);
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
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
      <Form name="register" onFinish={onRegister} form={form}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: t.login.nickname_required }]}
        >
          <Input prefix={<UserOutlined />} placeholder={t.login.nickname} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, type: "email", message: t.login.email_required },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={t.login.email} />
        </Form.Item>
        <Form.Item>
          <Space.Compact style={{ width: "100%" }}>
            <Form.Item
              name="verificationCode"
              noStyle
              rules={[
                { required: true, message: t.login.verification_code_required },
              ]}
            >
              <Input
                prefix={<SafetyOutlined />}
                style={{ width: "calc(100% - 120px)" }}
                placeholder={t.login.verification_code}
              />
            </Form.Item>
            <Button
              style={{ width: "120px" }}
              disabled={sendingCode || countdown > 0}
              onClick={onEmailSend}
            >
              {countdown > 0
                ? `${countdown} ${t.login.seconds_resend}`
                : t.login.send_code}
            </Button>
          </Space.Compact>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t.login.password_required }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t.login.password}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: t.login.confirm_password_required },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t.login.confirm_password_not_match)
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t.login.confirm_password}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t.login.register}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

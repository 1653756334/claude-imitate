import { LockOutlined, MailOutlined, SafetyOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import React, { useState } from "react";

export default function ResetPassword({
  form,
  onResetPassword,
  sendVerificationCode,
  setActiveTab,
  t,
}: Login.ResetPasswordProps) {
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
      <Form name="forgotPassword" onFinish={onResetPassword} form={form}>
        <Form.Item
          name="email"
          rules={[
            { required: true, type: "email", message: t.login.email_required },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder={t.login.email} />
        </Form.Item>
        <Form.Item>
          <Space.Compact style={{width: "100%"}}>
            <Form.Item
              name="verificationCode"
              noStyle
              rules={[{ required: true, message: t.login.verification_code_required }]}
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
              {countdown > 0 ? `${countdown} ${t.login.seconds_resend}` : t.login.send_code}
            </Button>
          </Space.Compact>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t.login.password_required }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder={t.login.password} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {t.login.reset_password}
          </Button>
        </Form.Item>
        <Button type="link" onClick={() => setActiveTab("login")}>
          {t.login.back_to_login}
        </Button>
      </Form>
    </div>
  );
}

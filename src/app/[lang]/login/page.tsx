import React, { useState } from "react";
import dynamic from "next/dynamic";
const LoginContent = dynamic(() => import("./LoginContent"), { ssr: false });

export default function Login() {
  return <LoginContent />;
}

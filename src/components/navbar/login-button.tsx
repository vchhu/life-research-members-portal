import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import Image from "next/image";
import { FunctionComponent } from "react";
import { loginRequest, msalInstance } from "../../../auth-config";
import msIcon from "../../../public/microsoft-logo.png";

function login() {
  msalInstance.loginRedirect(loginRequest).catch((e: any) => {
    console.error(e);
  });
}

const LoginButton: FunctionComponent = () => {
  return (
    <Button type="primary" onClick={login} className="login-button">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexShrink: 0, lineHeight: 0 }}>
          <Image src={msIcon} alt="ms icon" width="25em" height="25em" />
        </div>
        <span style={{ width: 12 }}></span>
        <span>Login</span>
      </div>
    </Button>
  );
};

export default LoginButton;

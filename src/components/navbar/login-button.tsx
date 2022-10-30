import Button from "antd/lib/button";
import Typography from "antd/lib/typography";
import Image from "next/image";
import { FC, useContext } from "react";
import { loginRequest, msalInstance } from "../../../auth-config";
import msIcon from "../../../public/microsoft-logo.png";
import { LanguageCtx } from "../../services/context/language-ctx";

function login() {
  msalInstance.loginRedirect(loginRequest).catch((e: any) => {
    console.error(e);
  });
}

const LoginButton: FC = () => {
  const { en } = useContext(LanguageCtx);
  return (
    <Button type="primary" onClick={login} className="login-button">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flexShrink: 0, lineHeight: 0 }}>
          <Image src={msIcon} alt="ms icon" width="25em" height="25em" />
        </div>
        <span style={{ width: 12 }}></span>
        <span>{en ? "Login" : "Connecter"}</span>
      </div>
    </Button>
  );
};

export default LoginButton;

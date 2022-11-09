import Button from "antd/lib/button";
import Image from "next/image";
import { FC, useContext } from "react";
import msIcon from "../../../public/microsoft-logo.png";
import { AccountCtx } from "../../services/context/account-ctx";
import { LanguageCtx } from "../../services/context/language-ctx";

const LoginButton: FC = () => {
  const { login } = useContext(AccountCtx);
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

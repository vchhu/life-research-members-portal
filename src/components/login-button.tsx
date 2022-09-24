import { FunctionComponent } from "react";
import { loginRequest, msalInstance } from "../../auth-config";

function login() {
  msalInstance.loginRedirect(loginRequest).catch((e: any) => {
    console.error(e);
  });
}

const LoginButton: FunctionComponent = () => {
  return <button onClick={login}>Login</button>;
};

export default LoginButton;

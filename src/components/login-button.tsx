import { useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";
import { loginRequest } from "../../auth-config";
import { IPublicClientApplication } from "@azure/msal-browser";

function handleLogin(instance: IPublicClientApplication) {
  instance.loginRedirect(loginRequest).catch((e: any) => {
    console.error(e);
  });
}

const LoginButton: FunctionComponent = () => {
  const { instance } = useMsal();
  return <button onClick={() => handleLogin(instance)}>Login</button>;
};

export default LoginButton;

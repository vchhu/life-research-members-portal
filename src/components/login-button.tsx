import { IMsalContext, useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";
import { loginRequest } from "../../auth-config";

function handleLogin(context: IMsalContext) {
  context.instance.loginRedirect(loginRequest).catch((e: any) => {
    console.error(e);
  });
}

const LoginButton: FunctionComponent = () => {
  const msalContext = useMsal();
  return <button onClick={() => handleLogin(msalContext)}>Login</button>;
};

export default LoginButton;

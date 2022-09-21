import { useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";
import { IPublicClientApplication } from "@azure/msal-browser";

function handleGetToken(instance: IPublicClientApplication) {
  instance
    .acquireTokenSilent({
      scopes: ["openid"], // openid scope is required to check cache for tokens
      account: instance.getActiveAccount() || undefined,
    })
    .then((res) => console.log("Tokens:", res))
    .catch((e: any) => console.error(e));
}

const TokenButton: FunctionComponent = () => {
  const { instance } = useMsal();
  return <button onClick={() => handleGetToken(instance)}>Log Tokens</button>;
};

export default TokenButton;

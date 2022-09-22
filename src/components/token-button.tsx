import { useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";
import { IPublicClientApplication } from "@azure/msal-browser";
import { scopes } from "../../auth-config";

function handleGetToken(instance: IPublicClientApplication) {
  instance
    .acquireTokenSilent({
      scopes,
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

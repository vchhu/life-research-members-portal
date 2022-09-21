import { useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";
import { IPublicClientApplication } from "@azure/msal-browser";

function handleValidate(instance: IPublicClientApplication) {
  instance
    .acquireTokenSilent({
      scopes: ["openid"], // openid scope is required to check cache for tokens
      account: instance.getActiveAccount() || undefined,
    })
    .then(({ accessToken }) => fetch("/api/validate", { headers: { "access-token": accessToken } }))
    .then(({ body }) => console.log(body))
    .catch((e: any) => console.error(e));
}

const ValidateButton: FunctionComponent = () => {
  const { instance } = useMsal();
  return <button onClick={() => handleValidate(instance)}>Validate Access Token</button>;
};

export default ValidateButton;

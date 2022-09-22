import { useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";
import { IPublicClientApplication } from "@azure/msal-browser";
import authHeader from "../utils/auth-header";
import { scopes } from "../../auth-config";

function handleValidate(instance: IPublicClientApplication) {
  instance
    .acquireTokenSilent({
      scopes,
      account: instance.getActiveAccount() || undefined,
    })
    .then(({ accessToken }) => fetch("/api/validate", { headers: authHeader(accessToken) }))
    .then((res) => res.text())
    .then((m) => console.log(m))
    .catch((e: any) => console.error(e));
}

const ValidateButton: FunctionComponent = () => {
  const { instance } = useMsal();
  return <button onClick={() => handleValidate(instance)}>Validate Access Token</button>;
};

export default ValidateButton;

import { useMsal } from "@azure/msal-react";
import { FunctionComponent } from "react";
import { IPublicClientApplication } from "@azure/msal-browser";
import authHeader from "../utils/front-end/auth-header";
import { scopes } from "../../auth-config";
import { contentTypeJsonHeader } from "../utils/front-end/content-type-headers";

function handleTest(instance: IPublicClientApplication) {
  instance
    .acquireTokenSilent({
      scopes,
      account: instance.getActiveAccount() || undefined,
    })
    .then(({ accessToken }) =>
      fetch("/api/register-user", {
        method: "PUT",
        headers: { ...authHeader(accessToken), ...contentTypeJsonHeader },
        body: JSON.stringify({ email: "testing" }),
      })
    )
    .then((res) => res.text())
    .then((m) => console.log(m))
    .catch((e: any) => console.error(e));
}

const TestButton: FunctionComponent = () => {
  const { instance } = useMsal();
  return <button onClick={() => handleTest(instance)}>Run Test</button>;
};

export default TestButton;

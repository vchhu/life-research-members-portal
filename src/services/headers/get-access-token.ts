import { msalInstance, scopes } from "../../../auth-config";
import { InteractionRequiredAuthError } from "@azure/msal-common";

// See https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/token-lifetimes.md

export default function getAccessToken() {
  return msalInstance
    .acquireTokenSilent({
      scopes,
      account: msalInstance.getActiveAccount() || undefined,
    })
    .then((res) => res.accessToken)
    .catch((e) => {
      if (e instanceof InteractionRequiredAuthError) {
        return msalInstance.acquireTokenRedirect({ scopes });
      }
    });
}

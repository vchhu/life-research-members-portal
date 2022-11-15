import { msalInstance, scopes } from "../../../auth-config";
import { InteractionRequiredAuthError } from "@azure/msal-common";
import Notification from "../notifications/notification";

// See https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/token-lifetimes.md

export default function getAccessToken() {
  return msalInstance
    .acquireTokenSilent({
      scopes,
      account: msalInstance.getActiveAccount() || undefined,
    })
    .then((res) => res.accessToken)
    .catch(() => {
      // Just assume any error means session has expired
      new Notification().error("Your session has expired, please login again.");
      msalInstance.setActiveAccount(null);
    });
}

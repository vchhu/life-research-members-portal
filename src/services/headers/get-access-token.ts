import { msalInstance, scopes } from "../../../auth-config";
import { en } from "../context/language-ctx";
import Notification from "../notifications/notification";

// See https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/token-lifetimes.md

export default function getAccessToken(): Promise<string | null> {
  return msalInstance
    .acquireTokenSilent({
      scopes,
      account: msalInstance.getActiveAccount() || undefined,
    })
    .then((res) => res.accessToken)
    .catch(() => {
      // We've already been here before - don't show the error again
      if (!msalInstance.getActiveAccount()) return null;
      // Just assume any error means session has expired
      new Notification().error(
        en
          ? "Your session has expired, please login again."
          : "Votre session a expiré, veuillez vous reconnecter."
      );
      msalInstance.setActiveAccount(null);
      return null;
    });
}

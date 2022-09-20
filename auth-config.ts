import { PublicClientApplication, RedirectRequest } from "@azure/msal-browser";
import { AuthenticationResult } from "@azure/msal-common/dist/response/AuthenticationResult";

// See https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-react

const msalConfig = {
  auth: {
    clientId: "95c17033-6f55-4b10-b9ca-9bb43ef022ff",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: typeof window === "undefined" ? undefined : window.location.origin, // undefined if in Node.js server
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest: RedirectRequest = {
  scopes: ["User.Read"],
  prompt: "select_account",
};

function handleResponse(response: AuthenticationResult | null) {
  if (!response) return;
  msalInstance.setActiveAccount(response.account);
}

msalInstance
  .handleRedirectPromise()
  .then(handleResponse)
  .catch((e: any) => console.error("Error after redirect:", e));

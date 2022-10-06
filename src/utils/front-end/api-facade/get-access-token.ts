import { msalInstance, scopes } from "../../../../auth-config";

export default function getAccessToken() {
  return msalInstance
    .acquireTokenSilent({
      scopes,
      account: msalInstance.getActiveAccount() || undefined,
    })
    .then((res) => res.accessToken);
}

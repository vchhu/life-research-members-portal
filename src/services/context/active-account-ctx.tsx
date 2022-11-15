import { useMsal } from "@azure/msal-react";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { loginRequest, msalInstance } from "../../../auth-config";
import ApiRoutes from "../../routing/api-routes";
import authHeader from "../headers/auth-header";
import type { AuthenticationResult } from "@azure/msal-common/dist/response/AuthenticationResult";
import type { AccountInfo } from "../_types";
import Notification from "../notifications/notification";

function handleResponse(response: AuthenticationResult | null) {
  if (!response) return;
  msalInstance.setActiveAccount(response.account);
}

msalInstance
  .handleRedirectPromise()
  .then(handleResponse)
  .catch((e: any) => console.error("Error after redirect:", e));

export const ActiveAccountCtx = createContext<{
  localAccount: AccountInfo | null;
  loading: boolean;
  refresh: () => void;
  refreshing: boolean;
  login: () => void;
  logout: () => void;
  setLocalAccount: Dispatch<SetStateAction<AccountInfo | null>>;
}>(null as any);

export const ActiveAccountCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  const { instance } = useMsal();
  const msAccount = instance.getActiveAccount();
  const msId = msAccount?.localAccountId;

  const [localAccount, setLocalAccount] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true); // Start true so loading icons are served first
  const [refreshing, setRefreshing] = useState(false);

  /** Checks if getting the auth header throws an error - which we assume means the session expired
   * The authHeader function will notify the user
   */
  async function isSessionExpired(): Promise<boolean> {
    let sessionExpired = false;
    try {
      await authHeader();
    } catch (_) {
      sessionExpired = true;
    }
    return sessionExpired;
  }

  /** Gets the current user's account from the database */
  async function fetchLocalAccount() {
    if (await isSessionExpired()) return;
    try {
      const res = await fetch(ApiRoutes.activeAccount, { headers: await authHeader() });
      if (!res.ok) throw await res.text();
      setLocalAccount(await res.json());
    } catch (e: any) {
      new Notification().error(e);
    }
  }

  /** Update last login on first load */
  async function fetchAccountUpdateLastLogin() {
    if (await isSessionExpired()) return;
    try {
      const res = await fetch(ApiRoutes.activeAccountUpdateLastLogin, {
        headers: await authHeader(),
      });
      if (!res.ok) throw await res.text();
      setLocalAccount(await res.json());
    } catch (e: any) {
      new Notification().error(e);
    }
  }

  // Using msAccount as a dependency creates an infinite loop,
  // since a new object is generated from local storage each time.
  // So don't do it! Use the id to see if user changed.
  useEffect(() => {
    if (!instance.getActiveAccount()) {
      setLocalAccount(null);
      setLoading(false);
      return;
    }
    async function firstLoad() {
      const notification = new Notification("bottom-right");
      notification.loading("Loading your account...");
      await fetchAccountUpdateLastLogin();
      setLoading(false);
      notification.close();
    }
    firstLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msId, instance]);

  async function refresh() {
    if (!instance.getActiveAccount()) {
      setLocalAccount(null);
      return;
    }
    if (loading || refreshing) return;
    const notification = new Notification("bottom-right");
    setRefreshing(true);
    notification.loading("Refreshing...");
    await fetchLocalAccount();
    setRefreshing(false);
    notification.close();
  }

  function login() {
    instance.loginRedirect(loginRequest).catch((e: any) => {
      console.error(e);
    });
  }

  function logout() {
    const onRedirectNavigate = () => {
      setLocalAccount(null);
      instance.setActiveAccount(null);
      return false;
    };

    instance.logoutRedirect({ onRedirectNavigate }).catch((e: any) => {
      console.error(e);
    });
  }

  return (
    <ActiveAccountCtx.Provider
      value={{ localAccount, loading, login, logout, refresh, refreshing, setLocalAccount }}
    >
      {children}
    </ActiveAccountCtx.Provider>
  );
};

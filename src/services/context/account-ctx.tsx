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
import { msalInstance } from "../../../auth-config";
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

export const AccountCtx = createContext<{
  localAccount: AccountInfo | null;
  loading: boolean;
  refresh: () => void;
  logout: () => void;
  setLocalAccount: Dispatch<SetStateAction<AccountInfo | null>>;
}>(null as any);

export const AccountCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  const { instance } = useMsal();
  const msAccount = instance.getActiveAccount();
  const msId = msAccount?.localAccountId;

  const [localAccount, setLocalAccount] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(false);

  // Gets the current user's account from the database
  const fetchLocalAccount = async () => {
    const notification = new Notification();
    try {
      setLoading(true);
      notification.loading("Loading your account...");
      const res = await fetch(ApiRoutes.activeAccount, { headers: await authHeader() });
      if (!res.ok) return notification.error(await res.text());
      setLocalAccount(await res.json());
      notification.close();
    } catch (e: any) {
      notification.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Using msAccount as a dependency creates an infinite loop,
  // since a new object is generated from local storage each time.
  // So don't do it! Use the id to see if user changed.
  useEffect(() => {
    if (!instance.getActiveAccount()) {
      setLocalAccount(null);
      setLoading(false);
      return;
    }
    fetchLocalAccount();
  }, [msId, instance]);

  const logout = () => {
    const onRedirectNavigate = () => {
      setLocalAccount(null);
      instance.setActiveAccount(null);
      return false;
    };

    instance.logoutRedirect({ onRedirectNavigate }).catch((e: any) => {
      console.error(e);
    });
  };

  return (
    <AccountCtx.Provider
      value={{ localAccount, loading, logout, refresh: fetchLocalAccount, setLocalAccount }}
    >
      {children}
    </AccountCtx.Provider>
  );
};

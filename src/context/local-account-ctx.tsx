import { useMsal } from "@azure/msal-react";
import { createContext, FunctionComponent, useCallback, useEffect, useMemo, useState } from "react";
import { all_account_info } from "../../prisma/types";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";

export const LocalAccountCtx = createContext<{
  localAccount: all_account_info | null;
  loading: boolean;
  refresh: () => void;
}>({ localAccount: null, loading: false, refresh: () => {} });

export const LocalAccountCtxProvider: FunctionComponent<any> = ({ children }) => {
  const { instance } = useMsal();
  const userId = instance.getActiveAccount()?.localAccountId;
  const [localAccount, setLocalAccount] = useState<all_account_info | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLocalAccount = useCallback(async () => {
    try {
      if (!instance.getActiveAccount()) return null;
      setLoading(true);
      const accountRes = await fetch(ApiRoutes.activeAccount, { headers: await authHeader() });
      if (!accountRes.ok) return console.error(await accountRes.text());
      const account = await accountRes.json();
      setLocalAccount(account);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [instance]);

  useEffect(() => {
    fetchLocalAccount();
  }, [fetchLocalAccount, userId]);

  return (
    <LocalAccountCtx.Provider value={{ localAccount, loading, refresh: fetchLocalAccount }}>
      {children}
    </LocalAccountCtx.Provider>
  );
};

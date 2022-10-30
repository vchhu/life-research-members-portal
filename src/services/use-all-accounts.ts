import { useEffect, useState } from "react";
import type { AccountRes } from "../pages/api/account/[id]";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";
import type { AccountInfo } from "./_types";

let firstRender = true;
let cachedAccounts: AccountInfo[] = [];

export default function useAllAccounts() {
  const [allAccounts, setAllAccounts] = useState<AccountInfo[]>(cachedAccounts);
  const [loading, setLoading] = useState(false);

  async function fetchAllAccounts() {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.allAccounts, { headers: await authHeader() });
      if (!result.ok) return console.error(await result.text());
      const members = await result.json();
      setAllAccounts(members);
      cachedAccounts = members;
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (firstRender) {
      fetchAllAccounts();
      firstRender = false;
    }
  }, []);

  return { allAccounts, loading, refresh: fetchAllAccounts };
}

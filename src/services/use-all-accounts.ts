import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";
import type { AccountInfo } from "./_types";

export default function useAllAccounts() {
  const [allAccounts, setAllAccounts] = useState<AccountInfo[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchAllAccounts() {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.allAccounts, { headers: await authHeader() });
      if (!result.ok) return console.error(await result.text());
      const accounts: AccountInfo[] = await result.json();
      accounts.sort((a, b) => a.first_name.localeCompare(b.first_name));
      setAllAccounts(accounts);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllAccounts();
  }, []);

  return { allAccounts, loading, refresh: fetchAllAccounts };
}

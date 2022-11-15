import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import getAuthHeader from "./headers/auth-header";
import type { AccountInfo } from "./_types";

export default function useAccount(id: number) {
  const [account, setAccount] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchAccount(id: number) {
    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) return;
      setLoading(true);
      const result = await fetch(ApiRoutes.account(id), { headers: authHeader });
      if (!result.ok) return console.error(await result.text());
      const account = await result.json();
      setAccount(account);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAccount(id);
  }, [id]);

  function refresh() {
    fetchAccount(id);
  }

  return { account, setAccount, loading, refresh };
}

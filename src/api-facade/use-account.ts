import { useEffect, useState } from "react";
import type { AccountRes } from "../pages/api/account/[id]";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";

export default function useAccount(id: number) {
  const [account, setAccount] = useState<AccountRes | null>();
  const [loading, setLoading] = useState(true);

  async function fetchAccount(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.account(id), { headers: await authHeader() });
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

  return { account, loading, refresh };
}

import { useEffect, useState } from "react";
import { all_account_info } from "../../prisma/types";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";

let firstRender = true;
let cachedAccounts: all_account_info[] = [];

export default function useAllAccounts() {
  const [allAccounts, setAllAccounts] = useState<all_account_info[]>(cachedAccounts);
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

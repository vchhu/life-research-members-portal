import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";
import type { PrivateMemberInfo } from "./_types";

export default function usePrivateMemberInfo(id: number) {
  const [member, setMember] = useState<PrivateMemberInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchMember(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.privateMemberInfo(id), { headers: await authHeader() });
      if (!result.ok) return console.error(await result.text());
      setMember(await result.json());
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMember(id);
  }, [id]);

  function refresh() {
    fetchMember(id);
  }

  return { member, setMember, loading, refresh };
}

import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";
import type { MemberPrivateInfo } from "./_types";

export default function usePrivateMemberInfo(id: number) {
  const [member, setMember] = useState<MemberPrivateInfo | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchMember(id: number) {
    try {
      setLoading(true);
      const res = await fetch(ApiRoutes.privateMemberInfo(id), { headers: await authHeader() });
      if (!res.ok) return console.error(await res.text());
      setMember(await res.json());
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

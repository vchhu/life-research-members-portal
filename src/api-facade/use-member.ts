import { useEffect, useState } from "react";
import { all_member_info } from "../../prisma/types";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";

let firstRender = true;
let cachedMember: all_member_info | null = null;

export default function useMember(id: number) {
  const [member, setMember] = useState<all_member_info | null>(cachedMember);
  const [loading, setLoading] = useState(false);

  async function fetchMember(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.member + id, { headers: await authHeader() });
      if (!result.ok) return console.error(await result.text());
      const member = await result.json();
      setMember(member);
      cachedMember = member;
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (firstRender) {
      fetchMember(id);
      firstRender = false;
    }
  }, [id]);

  return { member, loading, refresh: fetchMember };
}

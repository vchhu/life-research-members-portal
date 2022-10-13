import { useEffect, useState } from "react";
import { all_member_info } from "../../prisma/types";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";

export default function useMember(id: number) {
  const [member, setMember] = useState<all_member_info | null>();
  const [loading, setLoading] = useState(true);

  async function fetchMember(id: number) {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.member + id, { headers: await authHeader() });
      if (!result.ok) return console.error(await result.text());
      const member = await result.json();
      setMember(member);
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

  return { member, loading, refresh };
}

import { useEffect, useState } from "react";
import ApiRoutes from "../routing/api-routes";
import type { MemberPublicInfo } from "./_types";

export default function useAllMembers() {
  const [allMembers, setAllMembers] = useState<MemberPublicInfo[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchAllMembers() {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.allMembers);
      if (!result.ok) return console.error(await result.text());
      const members: MemberPublicInfo[] = await result.json();
      members.sort((a, b) => a.account.first_name.localeCompare(b.account.first_name));
      setAllMembers(members);
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllMembers();
  }, []);

  return { allMembers, loading, refresh: fetchAllMembers };
}

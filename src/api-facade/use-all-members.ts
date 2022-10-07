import { useEffect, useState } from "react";
import { all_member_info } from "../../prisma/types";
import ApiRoutes from "../routing/api-routes";
import authHeader from "./headers/auth-header";

let firstRender = true;
let cachedMembers: all_member_info[] = [];

export default function useAllMembers() {
  const [allMembers, setAllMembers] = useState<all_member_info[]>(cachedMembers);
  const [loading, setLoading] = useState(false);

  async function fetchAllMembers() {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.allMembers, { headers: await authHeader() });
      if (!result.ok) return console.error(await result.text());
      const members = await result.json();
      setAllMembers(members);
      cachedMembers = members;
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (firstRender) {
      fetchAllMembers();
      firstRender = false;
    }
  }, []);

  return { allMembers, loading, refresh: fetchAllMembers };
}

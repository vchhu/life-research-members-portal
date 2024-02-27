import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import ApiRoutes from "../../routing/api-routes";
import Notification from "../notifications/notification";
import type { MemberPublicInfo } from "../_types";
import { useRouter } from "next/router";
import getAuthHeader from "../headers/auth-header";

export const AllMembersCtx = createContext<{
  allMembers: MemberPublicInfo[];
  loading: boolean;
  refreshing: boolean;
  refresh: () => void;
  instituteId?: string;
  setInstituteId: (id: string) => void;
}>(null as any);

type AllMembersCtxProviderProps = PropsWithChildren<{ instituteId?: string }>;

export const AllMembersCtxProvider: FC<AllMembersCtxProviderProps> = ({
  children,
}) => {
  const [allMembers, setAllMembers] = useState<MemberPublicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [instituteId, setInstituteId] = useState("");

  const fetchAllMembers = useCallback(async () => {
    if (!instituteId || instituteId === "") {
      setLoading(false);
      return;
    }
    try {
      const queryParam = instituteId ? `?instituteId=${instituteId}` : "";
      const authHeader = await getAuthHeader();
      if (!authHeader) return;
      const result = await fetch(`${ApiRoutes.allMembers}${queryParam}`, {
        headers: authHeader,
      });
      if (!result.ok) throw await result.text();
      const members: MemberPublicInfo[] = await result.json();

      setAllMembers(
        members
          .filter((m) => m.is_active)
          .sort((a, b) =>
            a.account.first_name.localeCompare(b.account.first_name)
          )
      );
    } catch (e: any) {
      new Notification().error(e.message);
    } finally {
      setLoading(false);
    }
  }, [instituteId]);

  useEffect(() => {
    async function firstLoad() {
      await fetchAllMembers();
      setLoading(false);
    }
    firstLoad();
  }, [fetchAllMembers]);

  async function refresh() {
    if (loading || refreshing) return;
    const notification = new Notification("bottom-right");
    setRefreshing(true);
    notification.loading("Refreshing...");
    await fetchAllMembers();
    setRefreshing(false);
    notification.close();
  }

  return (
    <AllMembersCtx.Provider
      value={{
        allMembers,
        loading,
        refresh,
        refreshing,
        instituteId,
        setInstituteId,
      }}
    >
      {children}
    </AllMembersCtx.Provider>
  );
};

import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import ApiRoutes from "../../routing/api-routes";
import Notification from "../notifications/notification";
import type { PrivateMemberRes } from "../../pages/api/all-members-private";
// Assuming PrivateMemberInfo is defined to represent the structure of private member information

export const AllMembersPrivateCtx = createContext<{
  allMembersPrivate: PrivateMemberRes[];
  loading: boolean;
  refreshing: boolean;
  refresh: () => void;
}>(null as any);

export const AllMembersPrivateCtxProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [allMembersPrivate, setAllMembersPrivate] = useState<
    PrivateMemberRes[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchAllMembersPrivate() {
    try {
      const result = await fetch(ApiRoutes.allMembersPrivate);

      if (!result.ok) throw await result.text();
      let members: PrivateMemberRes[] = await result.json();

      // Assuming private member data also needs filtering or sorting, adjust as needed
      members = members.filter((m) => m.is_active);
      members.sort((a, b) =>
        a.account.first_name.localeCompare(b.account.first_name)
      );
      setAllMembersPrivate(members);
    } catch (e: any) {
      new Notification().error(e);
    }
  }

  useEffect(() => {
    async function firstLoad() {
      await fetchAllMembersPrivate();
      setLoading(false);
    }
    firstLoad();
  }, []);

  async function refresh() {
    if (loading || refreshing) return;
    const notification = new Notification("bottom-right");
    setRefreshing(true);
    notification.loading("Refreshing...");
    await fetchAllMembersPrivate();
    setRefreshing(false);
    notification.close();
  }

  return (
    <AllMembersPrivateCtx.Provider
      value={{ allMembersPrivate, loading, refresh, refreshing }}
    >
      {children}
    </AllMembersPrivateCtx.Provider>
  );
};

import type { organization } from "@prisma/client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import ApiRoutes from "../../routing/api-routes";
import Notification from "../notifications/notification";
import { LanguageCtx } from "./language-ctx";

function enSorter(a: organization, b: organization) {
  return a.name_en!.localeCompare(b.name_en!);
}

function frSorter(a: organization, b: organization) {
  return a.name_fr!.localeCompare(b.name_fr!);
}

export const OrganizationCtx = createContext<{
  organizations: organization[];
  refresh: () => void;
}>(null as any);

async function fetchAllOrganizations(): Promise<organization[]> {
  try {
    const res = await fetch(ApiRoutes.allOrganizations);
    if (!res.ok) throw await res.text();
    return await res.json();
  } catch (e: any) {
    new Notification().error(e);
    return [];
  }
}

export const OrganizationCtxProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [organizations, setOrganizations] = useState<organization[]>([]);
  const { en } = useContext(LanguageCtx);

  async function getOrganizations() {
    setOrganizations(
      (await fetchAllOrganizations()).sort(en ? enSorter : frSorter)
    );
  }

  useEffect(() => {
    getOrganizations();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOrganizations((prev) => [...prev].sort(en ? enSorter : frSorter));
  }, [en]);

  function refresh() {
    getOrganizations();
  }

  return (
    <OrganizationCtx.Provider value={{ organizations, refresh }}>
      {children}
    </OrganizationCtx.Provider>
  );
};

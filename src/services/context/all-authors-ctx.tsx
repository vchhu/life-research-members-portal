import type { all_author } from "@prisma/client";
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

async function fetchAllAuthors(): Promise<all_author[]> {
  try {
    const res = await fetch(ApiRoutes.allAuthors);
    if (!res.ok) throw await res.text();
    return await res.json();
  } catch (e: any) {
    new Notification().error(e);
    return [];
  }
}

/* function nameSorter(a: all_author, b: all_author): number {
  return a.first_name.localeCompare(b.first_name);
} */

export const AllAuthorsCtx = createContext<{
  allAuthors: all_author[];
  allAuthorMap: Map<number, all_author>;
  refresh: () => void;
  set: (all_author: all_author) => void;
}>(null as any);

export const AllAuthorsCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  const [allAuthors, setAllAuthor] = useState<all_author[]>([]);
  const [allAuthorMap, setAllAuthorMap] = useState(
    new Map<number, all_author>()
  );
  const { en } = useContext(LanguageCtx);

  async function getAllAuthor() {
    const allAuthors = await fetchAllAuthors();
    //setAllAuthor(allAuthors.sort(nameSorter));
    setAllAuthor(allAuthors);
    setAllAuthorMap(new Map(allAuthors.map((k) => [k.id, k])));
  }

  useEffect(() => {
    getAllAuthor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllAuthor((prev) => prev);
    //setAllAuthor((prev) => prev.sort(nameSorter));
  }, [en]);

  function refresh() {
    getAllAuthor();
  }

  function set(all_author: all_author) {
    setAllAuthor((prev) => {
      const curr = prev.filter((k) => k.id !== all_author.id);
      curr.push(all_author);
      //return curr.sort(nameSorter);
      return curr;
    });
  }

  return (
    <AllAuthorsCtx.Provider value={{ allAuthors, allAuthorMap, refresh, set }}>
      {children}
    </AllAuthorsCtx.Provider>
  );
};

import type {
  problem,
  faculty,
  member_type,
  keyword,
  org_type,
  org_scope,
  organization,
} from "@prisma/client";
import { FC, useContext } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";

const GetLanguage: FC<{
  obj:
    | problem
    | faculty
    | member_type
    | org_type
    | org_scope
    | keyword
    | organization
    | null;
}> = ({ obj }) => {
  const { en } = useContext(LanguageCtx);
  if (!obj) return <></>;
  if (en) return <>{obj.name_en || obj.name_fr || ""}</>;
  return <>{obj.name_fr || obj.name_en || ""}</>;
};

export default GetLanguage;

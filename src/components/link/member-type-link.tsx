import type { member_type } from "@prisma/client";
import type { FC } from "react";
import PageRoutes from "../../routing/page-routes";
import GetLanguage from "../../utils/front-end/get-language";
import { queryKeys } from "../members/all-members";
import SafeLink from "./safe-link";

type Props = {
  member_type: member_type | null;
};

const MemberTypeLink: FC<Props> = ({ member_type }) => {
  if (!member_type) return null;
  return (
    <SafeLink
      href={{
        pathname: PageRoutes.allMembers,
        query: {
          [queryKeys.memberTypes]: member_type.id,
          [queryKeys.showMemberType]: true,
        },
      }}
    >
      <GetLanguage obj={member_type} />
    </SafeLink>
  );
};

export default MemberTypeLink;

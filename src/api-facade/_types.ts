import type { AccountRes } from "../pages/api/account/[id]";
import type { PublicMemberRes } from "../pages/api/member/[id]";

export type AccountInfo = NonNullable<AccountRes>;
export type PublicMemberInfo = NonNullable<PublicMemberRes>;

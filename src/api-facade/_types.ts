import type { AccountRes } from "../pages/api/account/[id]";
import type { AllAccountsRes } from "../pages/api/all-accounts";
import type { AllMembersRes } from "../pages/api/all-members";
import type { MemberRes } from "../pages/api/member/[id]";

export type Account = NonNullable<AccountRes> | AllAccountsRes[number];
export type Member = NonNullable<MemberRes> | AllMembersRes[number];

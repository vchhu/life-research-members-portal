import type { keyword, problem } from "@prisma/client";
import type { AccountRes } from "../pages/api/account/[id]";
import type { PrivateMemberRes } from "../pages/api/member/[id]/private";
import type { PublicMemberRes } from "../pages/api/member/[id]/public";

export type AccountInfo = NonNullable<AccountRes>;
export type PublicMemberInfo = NonNullable<PublicMemberRes>;
export type PrivateMemberInfo = NonNullable<PrivateMemberRes>;
export type ProblemInfo = Omit<problem, "id" | "member_id">;
export type KeywordInfo = Omit<keyword, "id">;

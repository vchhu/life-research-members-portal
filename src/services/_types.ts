import type { keyword, problem,organization } from "@prisma/client";
import type { AccountRes } from "../pages/api/account/[id]";
import type { PrivateMemberRes } from "../pages/api/member/[id]/private";
import type { PublicMemberRes } from "../pages/api/member/[id]/public";
import type { PublicPartnerRes } from "../pages/api/partner/[id]/public";


export type AccountInfo = NonNullable<AccountRes>;
export type MemberPublicInfo = NonNullable<PublicMemberRes>;
export type PartnerPublicInfo = NonNullable<PublicPartnerRes>;
//export type OrganizationInfo = Omit<organization, "description">;
export type MemberPrivateInfo = NonNullable<PrivateMemberRes>;
export type ProblemInfo = Omit<problem, "id" | "member_id">;
export type KeywordInfo = Omit<keyword, "id">;

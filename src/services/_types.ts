import type { keyword, problem } from "@prisma/client";
import type { AccountRes } from "../pages/api/account/[id]";
import type { PrivateMemberRes } from "../pages/api/member/[id]/private";
import type { PublicMemberRes } from "../pages/api/member/[id]/public";
import type { PublicPartnerRes } from "../pages/api/partner/[id]/public";
import type { PublicProductRes } from "../pages/api/product/[id]/public";
import type { PrivateProductRes} from "../pages/api/product/[id]/private";


export type AccountInfo = NonNullable<AccountRes>;
export type MemberPublicInfo = NonNullable<PublicMemberRes>;
export type PartnerPublicInfo = NonNullable<PublicPartnerRes>;
export type MemberPrivateInfo = NonNullable<PrivateMemberRes>;
export type ProductPublicInfo = NonNullable<PublicProductRes>;
export type ProductPrivateInfo = NonNullable<PrivateProductRes>;
export type ProblemInfo = Omit<problem, "id" | "member_id">;
export type KeywordInfo = Omit<keyword, "id">;

import type { keyword, problem } from "@prisma/client";
import type { AccountRes } from "../pages/api/account/[id]";
import type { PrivateMemberRes } from "../pages/api/member/[id]/private";
import type { PublicMemberRes } from "../pages/api/member/[id]/public";
import type { PublicPartnerRes } from "../pages/api/partner/[id]/public";
import type { PrivatePartnerDBRes } from "../pages/api/partner/[id]/private";
import type { PublicProductRes } from "../pages/api/product/[id]/public";
import type { PublicGrantRes } from "../pages/api/grant/[id]/public";
import type { PrivateProductRes } from "../pages/api/product/[id]/private";
import type { PublicEventRes } from "../pages/api/event/[id]/public";
import type { PublicSupervisionRes } from "../pages/api/supervision/[id]/public";


export type AccountInfo = NonNullable<AccountRes>;
export type MemberPublicInfo = NonNullable<PublicMemberRes>;
export type PartnerPublicInfo = NonNullable<PublicPartnerRes>;
export type PartnerPrivateInfo = NonNullable<PrivatePartnerDBRes>;
export type MemberPrivateInfo = NonNullable<PrivateMemberRes>;
export type ProductPublicInfo = NonNullable<PublicProductRes>;
export type ProductPrivateInfo = NonNullable<PrivateProductRes>;
export type GrantPublicInfo = NonNullable<PublicGrantRes>;
export type EventPublicInfo = NonNullable<PublicEventRes>;
export type SupervisionPublicInfo = NonNullable<PublicSupervisionRes>;
export type ProblemInfo = Omit<problem, "id" | "member_id">;
export type KeywordInfo = Omit<keyword, "id">;

import type { Prisma } from "@prisma/client";

// From: https://stackoverflow.com/a/54775885/12914833
// Ensures no invalid keys, which will cause runtime errors
// Prisma relies on object literals to type return values of queries
// So we need to let typescript INFER the actual shape of the objects
// However, this leaves the possibility of invalid keys
// These will normally be considered excess properties and pass typechecking
type CheckKeysAreValid<T, ValidProps> = Exclude<keyof T, keyof ValidProps> extends never
    ? T
    : "Invalid keys" | Exclude<keyof T, keyof ValidProps>; // Hacky error message

const _includeAllMemberInfo = {
    account: true,
    faculty: true,
    member_type: true,
    partnership_member_org: { include: { organization: true } },
    current_promotion_strategy: { include: { promotion_strategy: true } },
    desired_partnership: true,
    desired_promotion_strategy: { include: { promotion_strategy: true } },
    has_keyword: { include: { keyword: true } },
    insight: true,
    problem: true,
} as const;

export const includeAllMemberInfo: CheckKeysAreValid<
    typeof _includeAllMemberInfo,
    Prisma.memberInclude

> = _includeAllMemberInfo;

const _includeAllAccountInfo = {
    member: { include: _includeAllMemberInfo } as const,
} as const;

export const includeAllAccountInfo: CheckKeysAreValid<
    typeof _includeAllAccountInfo,
    Prisma.accountInclude

> = _includeAllAccountInfo;

const _selectPublicMemberInfo = {
    id: true,
    account: { select: { first_name: true, last_name: true } },
    is_active: true,
    about_me_en: true,
    about_me_fr: true,
    work_email: true,
    work_phone: true,
    website_link: true,
    twitter_link: true,
    linkedin_link: true,
    cv_link: true,
    facebook_link: true,
    tiktok_link: true,
    faculty: true,
    problem: true,
    member_type: true,
    has_keyword: { select: { keyword: true } },
} as const;

export const selectPublicMemberInfo: CheckKeysAreValid<
    typeof _selectPublicMemberInfo,
    Prisma.memberSelect

> = _selectPublicMemberInfo;



const _selectPublicPartnerInfo = {
    id: true,
    name_en: true,
    name_fr: true,
    org_scope: true,
    org_type: true,
    description: true,

} as const;

export const selectPublicPartnerInfo: CheckKeysAreValid<
    typeof _selectPublicPartnerInfo,
    Prisma.organizationSelect
> = _selectPublicPartnerInfo;

const _includeAllProductInfo = {
    id: true,
    title_en: true,
    title_fr: true,
    note: true,
    product_type: true,
    date: true,
    doi: true,
    on_going: true,
    peer_reviewed: true,
    all_author: true,
    //product_member_all_author: { include: { all_author: { select: { id: true, first_name: true, last_name: true } } } },
    // product_member_author: { select: { member: { select: { account: { select: { first_name: true, last_name: true } } } } } },
    product_target: { include: { target: true } },
    product_partnership: { include: { organization: true } },
    product_topic: { include: { topic: true } }
} as const;

export const includeAllProductInfo: CheckKeysAreValid<
    typeof _includeAllProductInfo,
    Prisma.productSelect
> = _includeAllProductInfo;

const _selectPublicProductInfo = {
    id: true,
    title_en: true,
    title_fr: true,
    note: true,
    doi: true,
    product_type: true,
    all_author: true,
    //product_member_all_author: { include: { all_author: { select: { id: true, first_name: true, last_name: true } } } },
    // product_member_author: { select: { member: { select: { account: { select: { id: true, first_name: true, last_name: true } } } } } },
    product_target: { include: { target: true } },
    product_partnership: { include: { organization: true } },
} as const;

export const selectPublicProductInfo: CheckKeysAreValid<
    typeof _selectPublicProductInfo,
    Prisma.productSelect
> = _selectPublicProductInfo;


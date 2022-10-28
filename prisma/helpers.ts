import type { Prisma } from "@prisma/client";

// From: https://stackoverflow.com/a/54775885/12914833
// Ensures no invalid keys, which will cause runtime errors
// Prisma relies on object literals to type return values of queries
// So we need to let typescript INFER the actual shape of the objects
// However, this leaves the possibility of invalid keys
// These will normally be considered excess properties and pass typechecking
type CheckKeysAreValid<T, ValidProps> = Exclude<keyof T, keyof ValidProps> extends never
  ? T
  : "Invalid keys" | Exclude<keyof T, keyof ValidProps>;

type t = typeof selectPublicMemberInfo & Prisma.memberSelect;

const _includeAllMemberInfo = {
  account: true,
  faculty: true,
  member_type: true,
  current_partnership: { include: { organization: true } },
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
  about_me: true,
  work_email: true,
  work_phone: true,
  website_link: true,
  twitter_link: true,
  linkedin_link: true,
  cv_link: true,
  faculty: true,
  problem: true,
  member_type: true,
  has_keyword: { select: { keyword: true } },
};

export const selectPublicMemberInfo: CheckKeysAreValid<
  typeof _selectPublicMemberInfo,
  Prisma.memberSelect
> = _selectPublicMemberInfo;

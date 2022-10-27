import type { Prisma } from "@prisma/client";

// From: https://stackoverflow.com/a/54775885/12914833
// Ensures there are no excess properties, which will cause errors
// Prisma relies on object literals to type return values of queries
// So we need to let typescript infer the actual shape of the objects
// Excess properties are normally allowed when passing objects to functions
// But excess properties will cause runtime errors in Prisma and need to be caught here
type NoExcessProperties<T, AllowedProps> = Exclude<keyof T, keyof AllowedProps> extends never
  ? T
  : never;

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

export const includeAllMemberInfo: NoExcessProperties<
  typeof _includeAllMemberInfo,
  Prisma.memberInclude
> = _includeAllMemberInfo;

const _includeAllAccountInfo = {
  member: { include: _includeAllMemberInfo } as const,
} as const;

export const includeAllAccountInfo: NoExcessProperties<
  typeof _includeAllAccountInfo,
  Prisma.accountInclude
> = _includeAllAccountInfo;

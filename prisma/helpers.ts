export const includeAllMemberInfo = {
  faculty: true,
  member_type: true,
  current_partnership: { include: { organization: true } },
  current_promotion_strategy: { include: { promotion_strategy: true } },
  desired_partnership: true,
  desired_promotion_strategy: { include: { promotion_strategy: true } },
  has_keyword: { include: { keyword: true } },
  insight: true,
  works_on: { include: { problem: true } },
} as const;

export const includeAllAccountInfo = {
  member: { include: includeAllMemberInfo },
} as const;

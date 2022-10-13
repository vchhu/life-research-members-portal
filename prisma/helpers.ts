export const includeAllMemberInfo = {
  types_faculty: true,
  types_member_category: true,
} as const;

export const includeAllAccountInfo = {
  main_members: { include: includeAllMemberInfo },
} as const;

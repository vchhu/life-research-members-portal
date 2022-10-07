export const includeAllMemberInfo = {
  types_faculty: true,
  types_member_category: true,
} as const;

export const includeAllInfo = {
  main_members: { include: includeAllMemberInfo },
} as const;

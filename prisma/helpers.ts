export const selectPublicMemberInfo = {
  id: true,
  account_id: true,
  work_email: true,
  work_phone: true,
  about_me: true,
  website_link: true,
  twitter_link: true,
  linkedin_link: true,
  cv_link: true,
  account: { select: { first_name: true, last_name: true } },
  faculty: true,
  member_type: true,
  current_partnership: { include: { organization: true } },
  works_on: { include: { problem: true } },
};

export const includeAllMemberInfo = {
  account: true,
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

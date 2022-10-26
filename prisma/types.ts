import {
  account,
  member,
  faculty,
  member_type,
  current_partnership,
  current_promotion_strategy,
  desired_partnership,
  desired_promotion_strategy,
  has_keyword,
  insight,
  keyword,
  organization,
  problem,
  promotion_strategy,
  works_on,
} from "@prisma/client";

export type all_member_info = member & {
  faculty: faculty | null;
  member_type: member_type | null;
  desired_partnership: desired_partnership | null;
  insight: insight[];
  current_partnership: (current_partnership & {
    organization: organization;
  })[];
  current_promotion_strategy: (current_promotion_strategy & {
    promotion_strategy: promotion_strategy;
  })[];
  desired_promotion_strategy: (desired_promotion_strategy & {
    promotion_strategy: promotion_strategy;
  })[];
  has_keyword: (has_keyword & {
    keyword: keyword;
  })[];
  works_on: (works_on & {
    problem: problem;
  })[];
};

export type all_account_info = account & {
  member: all_member_info | null;
};

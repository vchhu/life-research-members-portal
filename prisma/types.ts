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
  account: account;
  current_partnership: (current_partnership & {
    organization: organization;
  })[];
  current_promotion_strategy: (current_promotion_strategy & {
    promotion_strategy: promotion_strategy;
  })[];
  desired_partnership: desired_partnership | null;
  desired_promotion_strategy: (desired_promotion_strategy & {
    promotion_strategy: promotion_strategy;
  })[];
  faculty: faculty | null;
  has_keyword: (has_keyword & {
    keyword: keyword;
  })[];
  insight: insight[];
  member_type: member_type | null;
  works_on: (works_on & {
    problem: problem;
  })[];
};

export type all_account_info = account & {
  member: all_member_info | null;
};

export type public_member_info = {
  id: number;
  account: {
    first_name: string;
    last_name: string;
  };
  faculty: faculty | null;
  member_type: member_type | null;
  current_partnership: (current_partnership & {
    organization: organization;
  })[];
  works_on: (works_on & {
    problem: problem;
  })[];
  account_id: number;
  work_email: string | null;
  work_phone: string | null;
  about_me: string | null;
  website_link: string | null;
  twitter_link: string | null;
  linkedin_link: string | null;
  cv_link: string | null;
};

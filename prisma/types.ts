import { auth_accounts, main_members, types_faculty, types_member_category } from "@prisma/client";

export type all_member_info = main_members & {
  types_faculty: types_faculty | null;
  types_member_category: types_member_category | null;
};

export type all_account_info = auth_accounts & {
  main_members: all_member_info | null;
};

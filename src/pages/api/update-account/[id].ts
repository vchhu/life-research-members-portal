import { auth_accounts, main_members } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import { all_account_info } from "../../../../prisma/types";
import getAccount from "../../../utils/api/get-account";
import isEmptyObject from "../../../utils/common/isEmptyObject";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query as { id: string };
  if (!id) return res.status(400).send("Account ID is required.");

  try {
    const { accountInfo, memberInfo }: { accountInfo?: auth_accounts; memberInfo?: main_members } =
      JSON.parse(req.body);
    const currentAccount = await getAccount(req, res);
    if (!currentAccount) return;
    // TODO: allow a regular user to edit their own member info
    if (!currentAccount.is_admin)
      return res.status(401).send("You are not authorized to perform this action.");

    const updated = await db.auth_accounts.update({
      where: { id: parseInt(id) },
      data: {
        ...accountInfo,
        main_members:
          memberInfo && !isEmptyObject(memberInfo) ? { update: { ...memberInfo } } : undefined,
      },
      include: includeAllInfo,
    });
    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

import { auth_accounts, main_members } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import getAccount from "../../../utils/api/get-account";
import isTruthyAndNotEmpty from "../../../utils/common/isTruthyAndNotEmpty";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!(typeof req.query.id === "string")) return res.status(400).send("Account ID is required.");

  try {
    const id = parseInt(req.query.id);
    const { accountInfo, memberInfo } = JSON.parse(req.body) as {
      accountInfo?: auth_accounts;
      memberInfo?: main_members;
    };

    const currentAccount = await getAccount(req, res);
    if (!currentAccount) return;

    // Only admins may update account info
    const authorized = currentAccount.is_admin;
    if (!authorized) return res.status(401).send("You are not authorized to perform this action.");

    // Including an update statement for member info will error if the user is not registered as a member.
    // Set main_members to undefined if we receive something falsey or an empty object as memberInfo
    const updated = await db.auth_accounts.update({
      where: { id },
      data: {
        ...accountInfo,
        main_members: isTruthyAndNotEmpty(memberInfo) ? { update: { ...memberInfo } } : undefined,
      },
      include: includeAllInfo,
    });

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

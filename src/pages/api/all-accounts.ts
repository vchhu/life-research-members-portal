import type { institute } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import getAccountFromRequest from "../../utils/api/get-account-from-request";
import type { AccountDBRes } from "./account/[id]";

function getAllAccounts(): Promise<AccountDBRes[]> {
  return db.account.findMany({
    include: includeAllAccountInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountDBRes[] | string>
) {
  try {
    const currentUser = await getAccountFromRequest(req, res);
    const { instituteId } = req.query;

    if (!currentUser) return;

    const accounts = await getAllAccounts();

    const currentInstitute = await db.institute.findUnique({
      where: { urlIdentifier: instituteId as string },
      select: { id: true },
    });

    const memberInstitute = await db.memberInstitute.findMany({
      where: { instituteId: currentInstitute?.id },
      select: { memberId: true },
    });
    let filteredAccounts = [];
    let seenAccountIds = new Set(); // Set to track which account IDs have been added

    for (let account of accounts) {
      for (let member of memberInstitute) {
        if (
          account?.member?.id === member.memberId &&
          !seenAccountIds.has(account.id)
        ) {
          filteredAccounts.push(account);
          seenAccountIds.add(account.id); // Add account ID to Set
        }
      }
    }

    return res.status(200).send(filteredAccounts);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import { all_account_info } from "../../../../prisma/types";
import getAccount from "../../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!(typeof req.query.id === "string")) return res.status(400).send("Account ID is required.");

  try {
    const id = parseInt(req.query.id);

    const currentAccount = await getAccount(req, res);
    if (!currentAccount) return;

    const authorized = currentAccount.is_admin || currentAccount.id === id;
    if (!authorized)
      return res.status(401).send("You are not authorized to view this account information.");

    const account: all_account_info | null = await db.account.findUnique({
      where: { id },
      include: includeAllAccountInfo,
    });

    if (!account) return res.status(400).send("Account not found. ID: " + id);

    return res.status(200).send(account);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

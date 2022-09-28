import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import getAccount from "../../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query as { id: string };
  if (!id) return res.status(400).send("Account ID is required.");

  try {
    const currentAccount = await getAccount(req, res);
    if (!currentAccount) return;
    // TODO: allow a regular user to view their own account info
    if (!currentAccount.is_admin)
      return res.status(401).send("You are not authorized to perform this action.");

    const account = await db.auth_accounts.findUnique({
      where: { id: parseInt(id) },
      include: includeAllInfo,
    });
    if (!account) return res.status(400).send("Account not found. ID: " + id);
    return res.status(200).send(account);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

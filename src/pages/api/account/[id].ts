import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../utils/api/get-account";

export type AccountRes = Awaited<ReturnType<typeof getAccountById>>;

function getAccountById(id: number) {
  return db.account.findUnique({
    where: { id },
    include: includeAllAccountInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Account ID is required.");

  try {
    const id = parseInt(req.query.id);

    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    const authorized = currentAccount.is_admin || currentAccount.id === id;
    if (!authorized)
      return res.status(401).send("You are not authorized to view this account information.");

    const account = await getAccountById(id);
    if (!account) return res.status(400).send("Account not found. ID: " + id);

    return res.status(200).send(account);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

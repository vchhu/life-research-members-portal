import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../utils/api/get-account";

export type DeleteAccountRes = Awaited<ReturnType<typeof deleteAccount>>;

function deleteAccount(id: number) {
  return db.account.delete({
    where: { id },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteAccountRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Account ID is required.");

  try {
    const id = parseInt(req.query.id);

    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    if (!currentAccount.is_admin)
      return res.status(401).send("You are not authorized to delete accounts.");

    if (currentAccount.id === id)
      return res
        .status(401)
        .send("Admins may not delete themselves. This ensures there is always at least one admin.");

    const account = await deleteAccount(id);

    return res.status(200).send(account);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

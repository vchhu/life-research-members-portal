import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";
import type { AccountDBRes } from "../../account/[id]";

function updateAccountRemoveAdmin(id: number): Promise<AccountDBRes> {
  return db.account.update({
    where: { id },
    data: { is_admin: false },
    include: includeAllAccountInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountDBRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Account ID is required.");

  try {
    const id = parseInt(req.query.id);

    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    if (!currentAccount.is_admin)
      return res.status(401).send("You are not authorized to remove admin permission.");

    if (currentAccount.id === id)
      return res
        .status(401)
        .send(
          "Admins may not remove their own admin permission. This ensures there is always at least one admin."
        );

    const updated = await updateAccountRemoveAdmin(id);

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

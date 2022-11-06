import type { account } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../utils/api/get-account-from-request";

export type UpdateAccountParams = Partial<account>;
export type UpdateAccountRes = Awaited<ReturnType<typeof updateAccount>>;

function updateAccount(id: number, accountInfo: UpdateAccountParams) {
  if (accountInfo.login_email)
    accountInfo.login_email = accountInfo.login_email.toLocaleLowerCase();
  return db.account.update({
    where: { id },
    data: accountInfo,
    include: includeAllAccountInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateAccountRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Account ID is required.");

  try {
    const id = parseInt(req.query.id);
    const params: UpdateAccountParams = req.body;

    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    if (!currentAccount.is_admin)
      return res.status(401).send("You are not authorized to edit account information.");

    if (currentAccount.id === id)
      return res
        .status(401)
        .send(
          "Admins may not edit their own account info. This prevents corrupting the only admin account."
        );

    const updated = await updateAccount(id, params);

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

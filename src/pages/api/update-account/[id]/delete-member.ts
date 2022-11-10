import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import type { AccountDBRes } from "../../account/[id]";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";

function deleteMember(id: number): Promise<AccountDBRes> {
  return db.account.update({
    where: { id },
    data: { member: { delete: true } },
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

    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to delete member information.");

    const updated = await deleteMember(id);

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

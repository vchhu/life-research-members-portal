import type { organization, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../utils/api/get-account-from-request";
import type { PrivatePartnerDBRes } from "../partner/[id]/private";

async function deletePartner(id: number): Promise<organization | null> {
  return db.organization.delete({
    where: { id },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prisma.PromiseReturnType<typeof deletePartner> | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Partner ID is required.");

  try {
    const id = parseInt(req.query.id);

    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    if (!currentAccount.is_admin)
      return res.status(401).send("You are not authorized to delete partners.");

    const partner = await deletePartner(id);

    return res.status(200).send(partner);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

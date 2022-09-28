import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../prisma/prisma-client";
import getAccount from "../../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query as { id: string };
  if (!id) return res.status(400).send("Member ID is required.");

  try {
    const currentUser = await getAccount(req, res);
    if (!currentUser) return;
    // TODO: allow a regular user to delete their own account
    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to perform this action.");

    const account = await db.auth_accounts.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).send(account);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

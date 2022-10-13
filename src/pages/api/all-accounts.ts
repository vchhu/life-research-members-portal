import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import getAccount from "../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const currentUser = await getAccount(req, res);
    if (!currentUser) return;
    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to view account information.");

    const accounts = await db.auth_accounts.findMany({
      include: includeAllAccountInfo,
    });
    return res.status(200).send(accounts);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

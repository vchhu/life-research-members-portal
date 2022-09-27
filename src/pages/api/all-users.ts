import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getUser from "../../utils/api/get-user";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const currentUser = await getUser(req, res);
    if (!currentUser) return;
    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to perform this action.");

    const allUsers = await db.auth_accounts.findMany();
    return res.status(200).send(allUsers);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

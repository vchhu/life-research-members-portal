import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getAccount from "../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const currentUser = await getAccount(req, res);
    if (!currentUser) return;
    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to view account information.");

    const accounts = await db.auth_accounts.findMany({
      include: { main_members: { select: { id: true, first_name: true, last_name: true } } },
    });
    const mappedAccounts = accounts.map((acc) => ({
      ...acc,
      member_id: acc.main_members?.id,
      first_name: acc.main_members?.first_name,
      last_name: acc.main_members?.last_name,
      main_members: undefined,
    }));
    return res.status(200).send(mappedAccounts);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

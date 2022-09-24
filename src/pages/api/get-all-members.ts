// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getUser from "../../utils/api/get-user";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const currentUser = await getUser(req, res);
    if (!currentUser) return;
    if (!currentUser.admin)
      return res.status(401).send("You are not authorized to perform this action.");

    const allMembers = await db.main_Members.findMany({
      select: { ID: true, first_name: true, last_name: true, email: true },
    });
    return res.status(200).send(allMembers);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

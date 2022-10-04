import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../prisma/prisma-client";
import getAccount from "../../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!(typeof req.query.id === "string")) return res.status(400).send("Member ID is required.");

  try {
    const id = parseInt(req.query.id);

    const currentUser = await getAccount(req, res);
    if (!currentUser) return;

    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to delete member information.");

    const deletedMember = await db.main_members.delete({
      where: { id },
    });

    return res.status(200).send(deletedMember);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

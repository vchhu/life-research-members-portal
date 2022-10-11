import { main_members } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../prisma/prisma-client";
import getAccount from "../../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!(typeof req.query.id === "string")) return res.status(400).send("Member ID is required.");

  try {
    const id = parseInt(req.query.id);
    const member: Partial<main_members> = req.body;

    const currentUser = await getAccount(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.main_members?.id === id;
    if (!authorized)
      return res.status(401).send("You are not authorized to edit this member information.");

    const updated = await db.main_members.update({
      where: { id },
      data: member,
    });

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

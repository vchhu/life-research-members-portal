import { main_Members } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../prisma/prisma-client";
import getUser from "../../../utils/api/get-user";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { id } = req.query as { id: string };
  if (!id) return res.status(400).send("Member ID is required.");

  try {
    const member: Partial<main_Members> = JSON.parse(req.body);
    const currentUser = await getUser(req, res);
    if (!currentUser) return;
    // TODO: allow a regular user to edit their own member info
    if (!currentUser.admin)
      return res.status(401).send("You are not authorized to perform this action.");

    const updated = await db.main_Members.update({
      where: { ID: parseInt(id) },
      data: member,
    });
    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../prisma/prisma-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!(typeof req.query.id === "string")) return res.status(400).send("Member ID is required.");

  try {
    const id = parseInt(req.query.id);

    // TODO: filter what information is public / private

    const member = await db.main_members.findUnique({
      where: { id },
    });

    if (!member) return res.status(400).send("Member not found. ID: " + id);

    return res.status(200).send(member);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

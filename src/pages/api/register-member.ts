import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getAccount from "../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { account_id } = req.body;
  if (!account_id) return res.status(400).send("Account id is required.");

  try {
    const currentUser = await getAccount(req, res);
    if (!currentUser) return;
    // TODO: allow an account to register themselves as a member
    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to perform this action.");

    const newMember = await db.main_members.create({
      data: { account_id: account_id },
    });
    return res.status(200).send(newMember);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return res
        .status(400)
        .send("This account already has a member registered. Account id: " + account_id);

    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getAccount from "../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { microsoft_email, is_admin } = req.body;
  if (!microsoft_email) return res.status(400).send("Email is required.");

  try {
    const currentUser = await getAccount(req, res);
    if (!currentUser) return;

    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to register accounts.");

    const newUser = await db.auth_accounts.create({
      data: { microsoft_email, is_admin },
    });

    return res.status(200).send(newUser);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return res.status(400).send("This email is already registered: " + microsoft_email);

    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

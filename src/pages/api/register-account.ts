import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getAccount from "../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { login_email, first_name, last_name, is_admin } = req.body;
  if (typeof login_email !== "string") return res.status(400).send("Email is required.");
  if (typeof first_name !== "string") return res.status(400).send("First Name is required.");
  if (typeof last_name !== "string") return res.status(400).send("Last Name is required.");

  try {
    const currentUser = await getAccount(req, res);
    if (!currentUser) return;

    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to register accounts.");

    const newUser = await db.account.create({
      data: { login_email, is_admin, first_name, last_name },
    });

    return res.status(200).send(newUser);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return res.status(400).send("This email is already registered: " + login_email);

    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

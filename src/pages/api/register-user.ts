import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getUser from "../../utils/api/get-user";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { email, admin, microsoft_sub } = req.body;
  if (!email) return res.status(400).send("Email is required.");

  try {
    const currentUser = await getUser(req, res);
    if (!currentUser) return;
    if (!currentUser.admin)
      return res.status(401).send("You are not authorized to perform this action.");

    const newUser = await db.auth_Users.create({
      data: { email, admin, microsoft_sub },
    });
    return res.status(200).send("User created: " + JSON.stringify(newUser));
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return res.status(400).send("This email is already registered. Email: " + email);

    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

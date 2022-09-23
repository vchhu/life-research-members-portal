// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/prisma-client";
import getUser from "../../utils/api/get-user";

type Data = any;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!req.body.email) return res.status(400).send("No email found in request body.");
  try {
    const user = await getUser(req, res);
    if (!user) return;
    if (!user.admin) {
      return res.status(401).send("You are not authorized to perform this action.");
    }
    const test = await prisma.auth_Users.create({
      data: { email: req.body.email, admin: req.body.admin, microsoft_sub: req.body.microsoft_sub },
    });
    res.status(200).send("User created: " + JSON.stringify(test));
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      res.status(400).send("This email is already registered. Email: " + req.body.email);
    // prisma error messages are getters
    res.status(500).send({ error: e, message: e.message });
  }
}

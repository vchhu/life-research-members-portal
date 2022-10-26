import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getAccount from "../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { name_en, name_fr } = req.body;
  if (typeof name_en !== "string" && typeof name_fr !== "string")
    return res.status(400).send("No name was provided.");

  try {
    const currentUser = await getAccount(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.member;
    if (!authorized) return res.status(401).send("You are not authorized to create keywords.");

    const keyword = await db.keyword.create({
      data: { name_en, name_fr },
    });
    return res.status(200).send(keyword);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return res
        .status(400)
        .send("Keyword already exists: " + name_en || "" + " / " + name_fr || "");
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

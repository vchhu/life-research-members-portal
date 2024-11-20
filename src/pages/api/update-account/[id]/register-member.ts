import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";
import type { AccountDBRes } from "../../account/[id]";

function registerMember(id: number): Promise<AccountDBRes> {
  return db.account.update({
    where: { id },
    data: { member: { create: { date_joined: new Date() } } },
    include: includeAllAccountInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountDBRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Account ID is required.");

  try {
    const id = parseInt(req.query.id);

    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    const updated = await registerMember(id);

    return res.status(200).send(updated);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return res.status(400).send("This account already has a member registered.");

    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

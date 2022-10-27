import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllMemberInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import getAccountFromRequest from "../../utils/api/get-account-from-request";

export type RegisterMemberParams = { account_id: number };
export type RegisterMemberRes = Awaited<ReturnType<typeof registerMember>>;

function registerMember(account_id: number) {
  return db.member.create({
    data: { account_id },
    include: includeAllMemberInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterMemberRes | string>
) {
  const params: RegisterMemberParams = req.body;
  const { account_id } = params;
  if (typeof account_id !== "number") return res.status(400).send("Account ID is required.");

  try {
    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.id === account_id;
    if (!authorized)
      return res
        .status(401)
        .send("You are not authorized to add member information to this account.");

    const newMember = await registerMember(account_id);

    return res.status(200).send(newMember);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return res
        .status(400)
        .send("This account already has a member registered. Account id: " + account_id);

    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

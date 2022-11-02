import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllMemberInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";

export type PrivateMemberDBRes = Awaited<ReturnType<typeof getPrivateMemberInfo>>;

// Dates will be stringified when sending response!
export type PrivateMemberRes = Omit<
  NonNullable<PrivateMemberDBRes>,
  "date_joined" | "last_active"
> & {
  date_joined: string | null;
  last_active: string | null;
};

function getPrivateMemberInfo(id: number) {
  return db.member.findUnique({
    where: { id },
    include: includeAllMemberInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivateMemberDBRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Member ID is required.");

  try {
    const id = parseInt(req.query.id);

    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    const authorized =
      currentAccount.is_admin || (currentAccount.member && currentAccount.member.id === id);

    if (!authorized)
      return res
        .status(401)
        .send("You are not authorized to view this member's private information.");

    const member = await getPrivateMemberInfo(id);
    if (!member) return res.status(400).send("Member not found. ID: " + id);

    return res.status(200).send(member);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

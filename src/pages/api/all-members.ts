import type { NextApiRequest, NextApiResponse } from "next";
import { selectPublicMemberInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";

export type AllMembersRes = Awaited<ReturnType<typeof allMembers>>;

function allMembers() {
  return db.member.findMany({
    select: selectPublicMemberInfo,
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AllMembersRes>) {
  try {
    return res.status(200).send(await allMembers());
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

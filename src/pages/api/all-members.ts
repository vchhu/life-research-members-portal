import type { NextApiRequest, NextApiResponse } from "next";
import { selectPublicMemberInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import type { PublicMemberRes } from "./member/[id]";

function allMembers(): Promise<PublicMemberRes[]> {
  return db.member.findMany({
    select: selectPublicMemberInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicMemberRes[]>
) {
  try {
    return res.status(200).send(await allMembers());
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

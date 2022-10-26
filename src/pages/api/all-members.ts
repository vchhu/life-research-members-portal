import type { NextApiRequest, NextApiResponse } from "next";
import { selectPublicMemberInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import { public_member_info } from "../../../prisma/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const allMembers: public_member_info[] = await db.member.findMany({
      select: selectPublicMemberInfo,
    });

    return res.status(200).send(allMembers);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

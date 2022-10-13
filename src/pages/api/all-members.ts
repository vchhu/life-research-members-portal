import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllMemberInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const allMembers = await db.main_members.findMany({
      include: includeAllMemberInfo,
    });

    return res.status(200).send(allMembers);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

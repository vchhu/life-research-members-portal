import type { NextApiRequest, NextApiResponse } from "next";
import { includeFaculty } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import getAccount from "../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const currentUser = await getAccount(req, res);
    if (!currentUser) return;

    const allMembers = await db.main_members.findMany({
      include: includeFaculty,
    });

    return res.status(200).send(allMembers);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import { all_info } from "../../../prisma/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse<all_info[]>) {
  try {
    const result = db.auth_accounts.findMany({
      include: { main_members: { include: { types_faculty: true, types_member_category: true } } },
    });
    return res.status(200).send(await result);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message });
  }
}

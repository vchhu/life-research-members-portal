import { member } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllMemberInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import { all_member_info } from "../../../../prisma/types";
import getAccount from "../../../utils/api/get-account";

type Body = { memberInfo?: Partial<member>; deleteKeywords?: number[]; addKeywords?: number[] };

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!(typeof req.query.id === "string")) return res.status(400).send("Member ID is required.");

  try {
    const id = parseInt(req.query.id);
    let { memberInfo, deleteKeywords, addKeywords } = req.body as Body;
    if (!memberInfo) memberInfo = {};
    if (!deleteKeywords) deleteKeywords = [];
    if (!addKeywords) addKeywords = [];

    const currentUser = await getAccount(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.member?.id === id;
    if (!authorized)
      return res.status(401).send("You are not authorized to edit this member information.");

    const updated: all_member_info = await db.member.update({
      where: { id },
      data: {
        ...memberInfo,
        has_keyword: {
          deleteMany: deleteKeywords.map((id) => ({ keyword_id: id })),
          create: addKeywords.map((id) => ({ keyword_id: id })),
        },
      },
      include: includeAllMemberInfo,
    });

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

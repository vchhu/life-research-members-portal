import type { member } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllMemberInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../utils/api/get-account";

export type UpdateMemberParams = {
  memberInfo?: Partial<member>;
  deleteKeywords?: number[];
  addKeywords?: number[];
};
export type UpdateMemberRes = Awaited<ReturnType<typeof updateMember>>;

function updateMember(
  id: number,
  { memberInfo = {}, deleteKeywords = [], addKeywords = [] }: UpdateMemberParams
) {
  return db.member.update({
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
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpdateMemberRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Member ID is required.");

  try {
    const id = parseInt(req.query.id);
    const params = req.body as UpdateMemberParams;

    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.member?.id === id;
    if (!authorized)
      return res.status(401).send("You are not authorized to edit this member information.");

    const updated = await updateMember(id, params);

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

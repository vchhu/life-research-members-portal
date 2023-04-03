import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";
import type { PrivateGrantDBRes } from "../../grant/[id]/private";
import { selectAllGrantInfo } from "../../../../../prisma/helpers";

export type UpdateGrantPublicParams = {
  title: string;
  amount: number;
  status_id: number;
  throught_lri: boolean;
  submission_date?: string | null;
  obtained_date?: string | null;
  completed_date?: string | null;
  source_id: number;
  all_investigator?: string;
  topic_id: number;
  note?: string;
  deleteInvestigatorMembers: number[];
  addInvestigatorMembers: number[];
  deleteInvolvedMembers: number[];
  addInvolvedMembers: number[];
};

function updateGrant(
  id: number,
  {
    title,
    amount,
    status_id,
    throught_lri,
    submission_date,
    obtained_date,
    completed_date,
    source_id,
    all_investigator,
    topic_id,
    note,
    deleteInvestigatorMembers,
    addInvestigatorMembers,
    deleteInvolvedMembers,
    addInvolvedMembers,
  }: UpdateGrantPublicParams
) {
  return db.grant.update({
    where: { id },
    data: {
      title,
      amount,
      status: { connect: { id: status_id } },
      throught_lri,
      submission_date,
      obtained_date,
      completed_date,
      source: { connect: { id: source_id } },
      all_investigator,
      topic: { connect: { id: topic_id } },
      grant_investigator_member: {
        deleteMany: deleteInvestigatorMembers.map((id) => ({ member_id: id })),
        createMany: { data: addInvestigatorMembers.map((id) => ({ member_id: id })) },
      },
      grant_member_involved: {
        deleteMany: deleteInvolvedMembers.map((id) => ({ member_id: id })),
        createMany: { data: addInvolvedMembers.map((id) => ({ member_id: id })) },
      },
      note,
    },
    select: selectAllGrantInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivateGrantDBRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Grant ID is required.");

  try {
    const id = parseInt(req.query.id);
    const params = req.body as UpdateGrantPublicParams;

    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.member?.id === id;
    if (!authorized)
      return res.status(401).send("You are not authorized to edit this grant information.");

    const updated = await updateGrant(id, params);

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

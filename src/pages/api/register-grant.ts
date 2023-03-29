import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getAccountFromRequest from "../../utils/api/get-account-from-request";

export type RegisterGrantParams = {
  title: string;
  amount: number;
  throught_lri: boolean;
  status_id: number;
  submission_date: Date | null;
  obtained_date: Date | null;
  completed_date: Date | null;
  source_id: number;
  all_investigator: string;
  topic_id: number;
  note: string;
};


export type RegisterGrantRes = Awaited<ReturnType<typeof registerGrant>>;

function registerGrant(params: RegisterGrantParams) {
  return db.grant.create({
    data: {
      title: params.title,
      amount: params.amount,
      throught_lri: params.throught_lri,
      status_id: params.status_id,
      submission_date: params.submission_date,
      obtained_date: params.obtained_date,
      completed_date: params.completed_date,
      source_id: params.source_id,
      all_investigator: params.all_investigator,
      topic_id: params.topic_id,
      note: params.note,
    },
    select: {
      id: true,
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterGrantRes | string>
) {
  const params: RegisterGrantParams = req.body;
  const {
    title,
    amount,
    throught_lri,
    status_id,
    submission_date,
    obtained_date,
    completed_date,
    source_id,
    all_investigator,
    topic_id,
    note,
  } = params;

  /* if (typeof title !== "string") return res.status(400).send("Please provide the title");
  if (isNaN(amount)) return res.status(400).send("Amount is required.");
  if (typeof throught_lri !== "boolean") return res.status(400).send("Throught LRI is required.");
  if (isNaN(status_id)) return res.status(400).send("Status ID is required.");
  if (!(submission_date instanceof Date)) return res.status(400).send("Submission date is required.");
  if (!(obtained_date instanceof Date)) return res.status(400).send("Obtained date is required.");
  if (!(completed_date instanceof Date)) return res.status(400).send("Completed date is required.");
  if (isNaN(source_id)) return res.status(400).send("Source ID is required.");
  if (typeof all_investigator !== "string") return res.status(400).send("All investigator is required.");
  if (isNaN(topic_id)) return res.status(400).send("Topic ID is required.");
  if (typeof note !== "string") return res.status(400).send("Note is required.");
 */
  try {
    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to register a grant");

    const newGrant = await registerGrant(params);

    return res.status(200).send(newGrant);
  } catch (e: any) {
    console.error("Error while registering grant:", e);
    return res.status(500).send({ ...e, message: "An error occurred while registering the grant." });
  }
}
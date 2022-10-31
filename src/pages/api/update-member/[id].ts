import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllMemberInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import type { PrivateMemberInfo, ProblemInfo } from "../../../services/_types";
import getAccountFromRequest from "../../../utils/api/get-account-from-request";

export type UpdateMemberParams = {
  first_name?: string;
  last_name?: string;
  about_me_en: string;
  about_me_fr: string;
  faculty_id?: number | null;
  type_id?: number | null;
  work_email: string;
  work_phone: string;
  website_link: string;
  twitter_link: string;
  linkedin_link: string;
  cv_link: string;
  deleteKeywords?: number[];
  addKeywords?: number[];
  deleteProblems?: number[];
  addProblems?: ProblemInfo[];
};

function updateMember(
  id: number,
  {
    first_name,
    last_name,
    about_me_en,
    about_me_fr,
    faculty_id,
    type_id,
    work_email,
    work_phone,
    website_link,
    twitter_link,
    linkedin_link,
    cv_link,
    deleteKeywords = [],
    addKeywords = [],
    deleteProblems = [],
    addProblems = [],
  }: UpdateMemberParams
) {
  return db.member.update({
    where: { id },
    data: {
      account: { update: { first_name, last_name } },
      about_me_en,
      about_me_fr,
      work_email,
      work_phone,
      website_link,
      twitter_link,
      linkedin_link,
      cv_link,
      faculty: faculty_id
        ? { connect: { id: faculty_id } }
        : faculty_id === null
        ? { disconnect: true }
        : undefined,
      member_type: type_id
        ? { connect: { id: type_id } }
        : type_id === null
        ? { disconnect: true }
        : undefined,
      has_keyword: {
        deleteMany: deleteKeywords.map((id) => ({ keyword_id: id })),
        create: addKeywords.map((id) => ({ keyword_id: id })),
      },
      problem: {
        deleteMany: deleteProblems.map((id) => ({ id })),
        create: addProblems,
      },
    },
    include: includeAllMemberInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivateMemberInfo | string>
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

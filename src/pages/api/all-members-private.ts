import type { insight } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import { includeAllMemberInfo } from "../../../prisma/helpers";

export type PrivateMemberDBRes = Awaited<
  ReturnType<typeof getAllPrivateMembersInfo>
>;

export type PrivateMemberRes = Omit<
  NonNullable<PrivateMemberDBRes[0]>, // Assuming PrivateMemberDBRes is an array of members
  "date_joined" | "last_active" | "insight"
> & {
  date_joined: string | null;
  last_active: string | null;
  insight:
    | (Omit<insight, "interview_date"> & { interview_date: string | null })
    | null;
};

function getAllPrivateMembersInfo() {
  return db.member.findMany({
    include: includeAllMemberInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivateMemberRes[]> // Correctly specifying that the response is an array of PrivateMemberRes
) {
  try {
    console.log("Request!");
    const members = await getAllPrivateMembersInfo();

    // Transform members to match PrivateMemberRes type
    const transformedMembers = members.map((member) => ({
      ...member,
      date_joined: member.date_joined ? member.date_joined.toISOString() : null,
      last_active: member.last_active ? member.last_active.toISOString() : null,
      insight: member.insight
        ? {
            ...member.insight,
            interview_date: member.insight.interview_date
              ? member.insight.interview_date.toISOString()
              : null,
          }
        : null,
    }));

    return res.status(200).send(transformedMembers);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message });
  }
}

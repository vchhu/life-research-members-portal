import type { grant } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { selectAllGrantInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";

export type PrivateGrantDBRes = Awaited<ReturnType<typeof getPrivateGrantInfo>>;

// Dates will be stringified when sending response!
export type PrivateGrantRes = Omit<
  NonNullable<PrivateGrantDBRes>,
  "grant"
> & {

  public: (Omit<grant, "submission_date" | "obtained_date" | "completed_date"> & { submission_date: string | null, obtained_date: string | null, completed_date: string | null }) | null;
};

function getPrivateGrantInfo(id: number) {
  return db.grant.findUnique({
    where: { id },
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
    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    const authorized =
      currentAccount.is_admin || (currentAccount.member && currentAccount.member.id === id);

    if (!authorized)
      return res
        .status(401)
        .send("You are not authorized to view this grant's private information.");

    const grant = await getPrivateGrantInfo(id);
    if (!grant) return res.status(400).send("Grant not found. ID: " + id);

    return res.status(200).send(grant);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

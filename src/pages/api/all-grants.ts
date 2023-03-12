import type { NextApiRequest, NextApiResponse } from "next";
import { selectPublicGrantInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import type { PublicGrantRes } from "./grant/[id]/public";

function allGrants(): Promise<PublicGrantRes[]> {
  return db.grant.findMany({
    select: selectPublicGrantInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicGrantRes[]>
) {
  try {
    return res.status(200).send(await allGrants());
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

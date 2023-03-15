import type { NextApiRequest, NextApiResponse } from "next";
import { selectPublicSupervisionInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import type { PublicSupervisionRes } from "./supervision/[id]/public";

function allSupervisions(): Promise<PublicSupervisionRes[]> {
  return db.supervision.findMany({
    select: selectPublicSupervisionInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicSupervisionRes[]>
) {
  try {
    return res.status(200).send(await allSupervisions());
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

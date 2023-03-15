import type { NextApiRequest, NextApiResponse } from "next";
import { selectPublicEventInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import type { PublicEventRes } from "./event/[id]/public";

function AllEvents(): Promise<PublicEventRes[]> {
  return db.event.findMany({
    select: selectPublicEventInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicEventRes[]>
) {
  try {
    return res.status(200).send(await AllEvents());
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import { selectPublicPartnerInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import type { PublicPartnerRes } from "./partner/[id]/public";

function allPartners(): Promise<PublicPartnerRes[]> {
  return db.organization.findMany({
    select: selectPublicPartnerInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicPartnerRes[]>
) {
  try {
    return res.status(200).send(await allPartners());
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";

export type AllKeywordsRes = Awaited<ReturnType<typeof allKeywords>>;

function allKeywords() {
  return db.keyword.findMany();
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AllKeywordsRes>) {
  try {
    const keywords = await allKeywords();
    return res.status(200).send(keywords);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

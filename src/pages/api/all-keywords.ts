import { keyword } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const keywords: keyword[] = await db.keyword.findMany();
    return res.status(200).send(keywords);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

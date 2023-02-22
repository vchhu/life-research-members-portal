import type { NextApiRequest, NextApiResponse } from "next";
import { selectPrivateProductInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";

export type PrivateProductRes = Awaited<ReturnType<typeof getPrivateProductInfo>>;

function getPrivateProductInfo(id: number) {
  return db.product.findUnique({
    where: { id },
    select: selectPrivateProductInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivateProductRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Private ID is required.");

  try {
    const id = parseInt(req.query.id);

    const product = await getPrivateProductInfo(id);
    if (!product) return res.status(400).send("Private not found. ID: " + id);

    return res.status(200).send(product);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

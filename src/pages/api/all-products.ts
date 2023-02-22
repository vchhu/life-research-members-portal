import type { NextApiRequest, NextApiResponse } from "next";
import { selectPublicProductInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import type { PublicProductRes } from "./product/[id]/public";

function allProducts(): Promise<PublicProductRes[]> {
  return db.product.findMany({
    select: selectPublicProductInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PublicProductRes[]>
) {
  try {
    return res.status(200).send(await allProducts());
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

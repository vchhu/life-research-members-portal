import type { NextApiRequest, NextApiResponse } from "next";
import { selectAllProductInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";
import type { PrivateProductDBRes } from "../../product/[id]/private";

export type UpdateProductAdminParams = {
  deleteTopics?: number[];
  addTopics?: number[];
};

function updateProduct(
  id: number,
  {

    deleteTopics = [],
    addTopics = [],
  }: UpdateProductAdminParams
) {
  return db.product.update({
    where: { id },
    data: {
      product_topic: {
        deleteMany: deleteTopics.map((id) => ({ topic_id: id })),
        createMany: { data: addTopics.map((id) => ({ topic_id: id })) },
      },
    },
    select: selectAllProductInfo,
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivateProductDBRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Product ID is required.");

  try {
    const id = parseInt(req.query.id);
    const params = req.body as UpdateProductAdminParams;

    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.member?.id === id;
    if (!authorized)
      return res.status(401).send("You are not authorized to edit this product information.");

    const updated = await updateProduct(id, params);

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

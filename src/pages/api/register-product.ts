import { product, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getAccountFromRequest from "../../utils/api/get-account-from-request";

type RegisterProductParams = {
  title_en: string;
  title_fr: string;
  //date: Date;
  doi: string;
  all_author: string;
  product_type_id: number;
  note: string;
  on_going: boolean;  // Include on_going field
  peer_reviewed: boolean;  // Include peer_reviewed field
};

export type RegisterProductRes = Awaited<ReturnType<typeof registerProduct>>;


function registerProduct(params: RegisterProductParams) {
  return db.product.create({
    data: {
      title_en: params.title_en,
      title_fr: params.title_fr,
      // date: params.date,
      doi: params.doi,
      all_author: params.all_author,
      product_type_id: Number(params.product_type_id),
      note: params.note,
      on_going: params.on_going,  // Set on_going field from params
      peer_reviewed: params.peer_reviewed,  // Set peer_reviewed field from params

    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterProductRes | string>
) {
  const params: RegisterProductParams = req.body;
  const {
    title_en,
    title_fr,
    // date,
    doi,
    all_author,
    on_going,
    peer_reviewed,
    product_type_id,
    note,
  } = params;
  if (typeof title_en !== "string") return res.status(400).send("title_en is required.");
  if (typeof title_fr !== "string") return res.status(400).send("title_fr is required.");
  //if (!(date instanceof Date)) return res.status(400).send("date is required.");
  if (typeof doi !== "string") return res.status(400).send("doi is required.");
  if (typeof on_going !== "boolean") return res.status(400).send("on_going is required.");
  if (typeof peer_reviewed !== "boolean") return res.status(400).send("peer_reviewed is required.");
  if (typeof all_author !== "string") return res.status(400).send("all_author is required.");
  if (isNaN(product_type_id)) return res.status(400).send("product_type_id is required.");
  if (typeof note !== "string") return res.status(400).send("note is required.");

  try {
    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    if (!currentUser.is_admin)
      return res.status(401).send("You are not authorized to register a product");

    const newProduct = await registerProduct(params);

    return res.status(200).send(newProduct);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return res.status(400).send("This product is already registered: " + title_en);

    return res.status(500).send({ ...e, message: e.message });
  }
}

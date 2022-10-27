import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";
import getAccountFromRequest from "../../utils/api/get-account";

export type RegisterKeywordParams = { name_en: string; name_fr: string };
export type RegisterKeywordRes = Awaited<ReturnType<typeof registerKeyword>>;

function registerKeyword({ name_en, name_fr }: RegisterKeywordParams) {
  return db.keyword.create({
    data: { name_en, name_fr },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterKeywordRes | string>
) {
  const params: RegisterKeywordParams = req.body;
  const { name_en, name_fr } = params;
  if (typeof name_en !== "string" && typeof name_fr !== "string")
    return res.status(400).send("No name was provided.");

  try {
    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.member;
    if (!authorized) return res.status(401).send("You are not authorized to create keywords.");

    const keyword = await registerKeyword(params);

    return res.status(200).send(keyword);
  } catch (e: any) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002")
      return res
        .status(400)
        .send("Keyword already exists: " + name_en || "" + " / " + name_fr || "");
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

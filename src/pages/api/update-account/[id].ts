import { account, member } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../../prisma/helpers";
import db from "../../../../prisma/prisma-client";
import { all_account_info } from "../../../../prisma/types";
import getAccount from "../../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (!(typeof req.query.id === "string")) return res.status(400).send("Account ID is required.");

  try {
    const id = parseInt(req.query.id);
    const accountInfo: account = req.body;

    const currentAccount = await getAccount(req, res);
    if (!currentAccount) return;

    if (!currentAccount.is_admin)
      return res.status(401).send("You are not authorized to edit account information.");

    if (currentAccount.id === id)
      return res
        .status(401)
        .send(
          "Admins may not edit their own account info. This prevents corrupting the only admin account."
        );

    const updated: all_account_info = await db.account.update({
      where: { id },
      data: accountInfo,
      include: includeAllAccountInfo,
    });

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

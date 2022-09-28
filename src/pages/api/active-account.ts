import type { NextApiRequest, NextApiResponse } from "next";
import getAccount from "../../utils/api/get-account";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const currentAccount = await getAccount(req, res);
    if (!currentAccount) return;
    return res.status(200).send(currentAccount);
  } catch (e: any) {
    return res.status(500).send(e);
  }
}

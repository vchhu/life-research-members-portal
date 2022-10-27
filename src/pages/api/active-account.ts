import type { NextApiRequest, NextApiResponse } from "next";
import getAccountFromRequest from "../../utils/api/get-account-from-request";

export type ActiveAccountRes = Awaited<ReturnType<typeof getAccountFromRequest>>;

export default async function handler(req: NextApiRequest, res: NextApiResponse<ActiveAccountRes>) {
  try {
    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;
    return res.status(200).send(currentAccount);
  } catch (e: any) {
    return res.status(500).send(e);
  }
}

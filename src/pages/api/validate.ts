// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import getUserInfo from "../../utils/get-user-info";

type Data = any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!req.headers.authorization) return res.status(401).send("No Authorization Header");
  return getUserInfo(req.headers.authorization)
    .then((userInfoRes) =>
      userInfoRes.text().then((body) => res.status(userInfoRes.status).send(body))
    )
    .catch((e: any) => res.status(500).json(e));
}

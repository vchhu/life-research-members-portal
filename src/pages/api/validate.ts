// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = any;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const accessToken = req.headers["access-token"];
  if (typeof accessToken !== "string") return res.status(401).send("Access Token Not Found");
  res.status(200).json({ message: "Access Token was: " + accessToken });
}

import type { event, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../utils/api/get-account-from-request";
import type { PrivateEventDBRes } from "../event/[id]/private";

async function deleteEvent(id: number): Promise<event | null> {
  return db.event.delete({
    where: { id },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Prisma.PromiseReturnType<typeof deleteEvent> | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Event ID is required.");

  try {
    const id = parseInt(req.query.id);

    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    const event = await deleteEvent(id);

    return res.status(200).send(event);
  } catch (e: any) {
    if (e.code === "P2003") {
      return res.status(409).send("Cannot delete event due to related records in next_event or previous_event table. Please delete related records first.");
    }
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

import type { supervision } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { selectAllSupervisionInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";

export type PrivateSupervisionDBRes = Awaited<ReturnType<typeof getPrivateSupervisionInfo>>;

export type PrivateSupervisionRes = Omit<
  NonNullable<PrivateSupervisionDBRes>,
  "supervision"
> & {
  public: (Omit<supervision, "start_date" | "end_date"> & { start_date: string | null, end_date: string | null }) | null;
};

function getPrivateSupervisionInfo(id: number) {
  return db.supervision.findUnique({
    where: { id },
    select: selectAllSupervisionInfo,
  });
}

async function isPrincipalSupervisor(memberId: number | undefined, supervisionId: number) {
  if (!memberId) return false;
  const principalSupervisor = await db.supervision_principal_supervisor.findUnique({
    where: {
      member_id_supervision_id: {
        member_id: memberId,
        supervision_id: supervisionId,
      },
    },
  });
  return !!principalSupervisor;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivateSupervisionDBRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Supervision ID is required.");

  try {
    const id = parseInt(req.query.id);
    const currentAccount = await getAccountFromRequest(req, res);
    if (!currentAccount) return;

    const supervision = await getPrivateSupervisionInfo(id);
    if (!supervision) return res.status(400).send("Supervision not found. ID: " + id);

    return res.status(200).send(supervision);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

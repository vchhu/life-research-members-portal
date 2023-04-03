import type { NextApiRequest, NextApiResponse } from "next";
import { selectAllEventInfo } from "../../../../../prisma/helpers";
import db from "../../../../../prisma/prisma-client";
import getAccountFromRequest from "../../../../utils/api/get-account-from-request";
import type { PrivateEventDBRes } from "../../event/[id]/private";
import type deleteGrant from "../../../../services/delete-grant";

export type UpdateEventPublicParams = {

  name_en: string;
  name_fr: string;
  start_date: string | null;
  end_date: string | null;
  event_type_id: number | null;
  note: string;
  addTopics: number[];
  deleteTopics: number[];
  addMembers: number[];
  deleteMembers: number[];
  addPartners: number[];
  deletePartners: number[];
  addProducts: number[];
  deleteProducts: number[];
  deleteGrants: number[];
  addGrants: number[];

};

function updateEvent(
  id: number,
  {

    name_en,
    name_fr,
    start_date,
    end_date,
    event_type_id,
    note,
    addTopics,
    deleteTopics,
    addMembers,
    deleteMembers,
    addPartners,
    deletePartners,
    addProducts,
    deleteProducts,
    deleteGrants,
    addGrants,
  }: UpdateEventPublicParams
) {
  return db.event.update({
    where: { id },
    data: {
      name_en,
      name_fr,
      start_date,
      end_date,
      event_type: event_type_id
        ? { connect: { id: event_type_id } }
        : event_type_id === null
          ? { disconnect: true }
          : undefined,
      note,
      event_topic: {
        deleteMany: deleteTopics.map((id) => ({ topic_id: id })),
        createMany: { data: addTopics.map((id) => ({ topic_id: id })) },
      },
      event_member_involved: {
        deleteMany: deleteMembers.map((id) => ({ member_id: id })),
        createMany: { data: addMembers.map((id) => ({ member_id: id })) },
      },
      event_partner_involved: {
        deleteMany: deletePartners.map((id) => ({ organization_id: id })),
        createMany: { data: addPartners.map((id) => ({ organization_id: id })) },
      },
      event_product_resulted: {
        deleteMany: deleteProducts.map((id) => ({ product_id: id })),
        createMany: { data: addProducts.map((id) => ({ product_id: id })) },
      },
      event_grant_resulted: {
        deleteMany: deleteGrants.map((id) => ({ grant_id: id })),
        createMany: { data: addGrants.map((id) => ({ grant_id: id })) },
      },

    },
    select: selectAllEventInfo,
  });
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PrivateEventDBRes | string>
) {
  if (!req.query.id || typeof req.query.id !== "string")
    return res.status(400).send("Event ID is required.");

  try {
    const id = parseInt(req.query.id);
    const params = req.body as UpdateEventPublicParams;

    const currentUser = await getAccountFromRequest(req, res);
    if (!currentUser) return;

    const authorized = currentUser.is_admin || currentUser.member?.id === id;
    if (!authorized)
      return res.status(401).send("You are not authorized to edit this event information.");

    const updated = await updateEvent(id, params);

    return res.status(200).send(updated);
  } catch (e: any) {
    return res.status(500).send({ ...e, message: e.message }); // prisma error messages are getters
  }
}

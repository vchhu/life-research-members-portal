// See https://learn.microsoft.com/en-us/azure/active-directory/develop/userinfo

import { auth_accounts } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";

type MsUserInfo = {
  id: string;
  userPrincipalName: string;
  givenName: string;
  surname: string;
};

function getUserIdFromMsGraph(authorization: string) {
  return fetch("https://graph.microsoft.com/v1.0/me", { headers: { authorization } });
}

function getUserFromDatabase(userId: MsUserInfo) {
  return db.auth_accounts.findFirst({
    where: { OR: [{ microsoft_email: userId.userPrincipalName }, { microsoft_id: userId.id }] },
  });
}

/**
 * Attempts to retrieve user identification.
 * On a failure, sends the appropriate response and returns undefined.
 */
export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<auth_accounts | undefined> {
  if (!req.headers.authorization) {
    res.status(401).send("No Authorization Header");
    return;
  }

  // Attempt to get user id from ms graph
  const userIdRes = await getUserIdFromMsGraph(req.headers.authorization);
  if (!userIdRes.ok) {
    res.status(userIdRes.status).send(await userIdRes.text());
    return;
  }

  // Get registered user in database
  const msUserInfo: MsUserInfo = await userIdRes.json();
  let user = await getUserFromDatabase(msUserInfo);
  if (!user) {
    res
      .status(401)
      .send(
        "This user is not registered, please contact an administrator. Microsoft Email: " +
          msUserInfo.userPrincipalName +
          " Microsoft ID: " +
          msUserInfo.id
      );
    return;
  }

  // Email registered, but not unique id - save id in case primary email changes
  if (!user.microsoft_id) {
    user = await db.auth_accounts.update({
      where: { microsoft_email: msUserInfo.userPrincipalName },
      data: { microsoft_id: msUserInfo.id },
    });
  }
  return user;
}

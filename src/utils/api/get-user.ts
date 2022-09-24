// See https://learn.microsoft.com/en-us/azure/active-directory/develop/userinfo

import { auth_Users } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../prisma/prisma-client";

type UserId = {
  sub: string;
  email: string;
};

function getUserIdFromMsGraph(authorization: string) {
  return fetch("https://graph.microsoft.com/oidc/userinfo", { headers: { authorization } });
}

async function getUserFromDatabase(userId: UserId) {
  return await db.auth_Users.findFirst({
    where: { OR: [{ email: userId.email }, { microsoft_sub: userId.sub }] },
  });
}

/**
 * Attempts to retrieve user identification.
 * On a failure, sends the appropriate response and returns undefined.
 */
export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<auth_Users | undefined> {
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
  const userId: UserId = await userIdRes.json();
  const user = await getUserFromDatabase(userId);
  // User not registered
  if (!user) {
    res
      .status(401)
      .send(
        "This user is not registered, please contact an administrator. Email: " +
          userId.email +
          " Microsoft_sub: " +
          userId.sub
      );
    return;
  }
  // Email registered, but not unique id - save id in case primary email changes
  if (!user.microsoft_sub) {
    await db.auth_Users.update({
      where: { email: userId.email },
      data: { microsoft_sub: userId.sub },
    });
  }
  return user;
}

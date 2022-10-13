// See https://learn.microsoft.com/en-us/azure/active-directory/develop/userinfo

import { NextApiRequest, NextApiResponse } from "next";
import { includeAllAccountInfo } from "../../../prisma/helpers";
import db from "../../../prisma/prisma-client";
import { all_account_info } from "../../../prisma/types";

type MsAccountInfo = {
  id: string;
  userPrincipalName: string;
  givenName: string;
  surname: string;
};

function getMicrosoftAccount(authorization: string) {
  return fetch("https://graph.microsoft.com/v1.0/me", { headers: { authorization } });
}

function getAccountFromDatabase(userId: MsAccountInfo) {
  return db.auth_accounts.findFirst({
    where: { OR: [{ microsoft_id: userId.id }, { microsoft_email: userId.userPrincipalName }] },
    include: includeAllAccountInfo,
  });
}

/**
 * Attempts to retrieve user identification.
 * On a failure, sends the appropriate response and returns undefined.
 */
export default async function getAccount(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<all_account_info | undefined> {
  if (!req.headers.authorization) {
    res.status(401).send("No Authorization Header");
    return;
  }

  // Attempt to get user id from ms graph
  const msAccountRes = await getMicrosoftAccount(req.headers.authorization);
  if (!msAccountRes.ok) {
    res.status(msAccountRes.status).send(await msAccountRes.text());
    return;
  }

  // Get registered user in database
  const msAccountInfo: MsAccountInfo = await msAccountRes.json();
  let account = await getAccountFromDatabase(msAccountInfo);
  if (!account) {
    res
      .status(401)
      .send(
        "This account is not registered, please contact an administrator and provide the following information." +
          " Microsoft Email: " +
          msAccountInfo.userPrincipalName +
          " Microsoft ID: " +
          msAccountInfo.id
      );
    return;
  }

  // Keep account info synchronized
  if (
    account.microsoft_id !== msAccountInfo.id ||
    account.microsoft_email !== msAccountInfo.userPrincipalName
  ) {
    account = await db.auth_accounts.update({
      where: { id: account.id },
      data: { microsoft_id: msAccountInfo.id, microsoft_email: msAccountInfo.userPrincipalName },
      include: includeAllAccountInfo,
    });
  }

  return account;
}

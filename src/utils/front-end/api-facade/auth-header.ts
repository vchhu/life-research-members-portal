// See https://learn.microsoft.com/en-us/azure/active-directory/develop/userinfo

import getAccessToken from "./get-access-token";

export default async function authHeader() {
  const accessToken = await getAccessToken();
  return { authorization: "Bearer " + accessToken };
}

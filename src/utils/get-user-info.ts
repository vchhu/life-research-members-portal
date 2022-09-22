// See https://learn.microsoft.com/en-us/azure/active-directory/develop/userinfo

export default function getUserInfo(authorization: string) {
  return fetch("https://graph.microsoft.com/oidc/userinfo", { headers: { authorization } });
}

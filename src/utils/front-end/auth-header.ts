// See https://learn.microsoft.com/en-us/azure/active-directory/develop/userinfo

export default function authHeader(accessToken: string) {
  return { authorization: "Bearer " + accessToken };
}

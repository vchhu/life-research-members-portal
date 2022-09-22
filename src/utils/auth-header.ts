export default function authHeader(accessToken: string) {
  return { authorization: "Bearer " + accessToken };
}

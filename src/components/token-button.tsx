import type { FC } from "react";
import getAccessToken from "../api-facade/headers/get-access-token";

async function logToken() {
  const accessToken = await getAccessToken();
  console.log(accessToken);
}

const TokenButton: FC = () => {
  return <button onClick={logToken}>Log Access Token</button>;
};

export default TokenButton;

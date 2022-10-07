import { FunctionComponent } from "react";
import getAccessToken from "../api-facade/get-access-token";

async function logToken() {
  const accessToken = await getAccessToken();
  console.log(accessToken);
}

const TokenButton: FunctionComponent = () => {
  return <button onClick={logToken}>Log Access Token</button>;
};

export default TokenButton;

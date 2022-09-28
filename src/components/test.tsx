import { FunctionComponent } from "react";
import ApiRoutes from "../utils/front-end/api-routes";

async function test() {
  console.log(await (await fetch(ApiRoutes.allAccounts)).json());
}

const Test: FunctionComponent = () => {
  return (
    <button
      onClick={() => {
        test();
      }}
    >
      TEST
    </button>
  );
};

export default Test;

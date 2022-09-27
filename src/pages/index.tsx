import type { NextPage } from "next";
import AccountData from "../components/account-data";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";

async function test() {
  // console.log("Users:", [
  //   await (await fetch(ApiRoutes.allAccounts, { headers: await authHeader() })).json(),
  // ]);
  // console.log("Members:", [
  //   await (await fetch(ApiRoutes.allMembers, { headers: await authHeader() })).json(),
  // ]);
  console.log(await (await fetch("/api/test")).json());
}

const App: NextPage = () => {
  return (
    <>
      <AccountData />
      <button
        onClick={() => {
          test();
        }}
      >
        TEST BACKEND
      </button>
    </>
  );
};

export default App;

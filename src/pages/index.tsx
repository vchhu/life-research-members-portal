import type { NextPage } from "next";
import UserData from "../components/user-data";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";

async function test() {
  console.log("Users:", [
    await (await fetch(ApiRoutes.allUsers, { headers: await authHeader() })).json(),
  ]);
  console.log("Members:", [
    await (await fetch(ApiRoutes.allMembers, { headers: await authHeader() })).json(),
  ]);
}

const App: NextPage = () => {
  return (
    <>
      <UserData />
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

import type { NextPage } from "next";
import UserData from "../components/user-data";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";

async function test() {
  fetch(ApiRoutes.allUsers, { headers: await authHeader() });
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
        TEST
      </button>
    </>
  );
};

export default App;

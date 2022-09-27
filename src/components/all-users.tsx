import { FunctionComponent, useState } from "react";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";

const AllUsers: FunctionComponent = () => {
  const [_allUsers, setAllUsers] = useState<{ email: string }[]>([]);
  const allUsers = _allUsers.map((user) => (
    <pre key={user.email}>{JSON.stringify(user, null, 2)}</pre>
  ));

  async function fetchAllUsers() {
    const result = await fetch(ApiRoutes.allAccounts, { headers: await authHeader() });
    if (!result.ok) return console.error(await result.text());
    setAllUsers(await result.json());
  }

  return (
    <>
      <h1>All Users</h1>
      <button onClick={fetchAllUsers}>Get All Users</button>
      <br />
      <button onClick={() => setAllUsers([])}>Clear</button>
      {allUsers}
    </>
  );
};

export default AllUsers;

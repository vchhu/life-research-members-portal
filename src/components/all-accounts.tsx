import { auth_accounts } from "@prisma/client";
import { FunctionComponent, useEffect, useState } from "react";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";

let firstRender = true;
let cachedAccounts: auth_accounts[] = [];

const AllUsers: FunctionComponent = () => {
  const [allAccounts, setAllAccounts] = useState<auth_accounts[]>(cachedAccounts);
  const [loading, setLoading] = useState(false);

  const allAccountsHtml = allAccounts.map((acc) => (
    <pre key={acc.id}>{JSON.stringify(acc, null, 2)}</pre>
  ));

  async function fetchAllAccounts() {
    try {
      setLoading(true);
      const result = await fetch(ApiRoutes.allAccounts, { headers: await authHeader() });
      if (!result.ok) return console.error(await result.text());
      const accounts = await result.json();
      setAllAccounts(accounts);
      cachedAccounts = accounts;
    } catch (e: any) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (firstRender) {
      fetchAllAccounts();
      firstRender = false;
    }
  }, []);

  return (
    <>
      <h1>All Accounts</h1>
      <button onClick={fetchAllAccounts}>REFRESH</button>
      {loading ? (
        <>
          <br />
          <br />
          <div>Loading...</div>
        </>
      ) : (
        allAccountsHtml
      )}
    </>
  );
};

export default AllUsers;

import Link from "next/link";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { all_account_info } from "../../prisma/types";
import ApiRoutes from "../utils/front-end/api-facade/api-routes";
import authHeader from "../utils/front-end/api-facade/auth-header";
import PageRoutes from "../utils/front-end/page-routes";

let firstRender = true;
let cachedAccounts: all_account_info[] = [];

const AllUsers: FunctionComponent = () => {
  const [allAccounts, setAllAccounts] = useState<all_account_info[]>(cachedAccounts);
  const [loading, setLoading] = useState(false);

  const allAccountsHtml = allAccounts.map((acc) => (
    <Fragment key={acc.id}>
      <pre>{JSON.stringify(acc, null, 2)}</pre>
      <Link href={PageRoutes.viewAccount + acc.id}>
        <button>VIEW</button>
      </Link>
      <span style={{ width: "6px", display: "inline-block" }}></span>
      <Link href={PageRoutes.editAccount + acc.id}>
        <button>EDIT</button>
      </Link>
    </Fragment>
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

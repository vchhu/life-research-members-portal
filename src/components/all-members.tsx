import { FunctionComponent, useState } from "react";
import authHeader from "../utils/front-end/auth-header";

const AllMembers: FunctionComponent = () => {
  const [_allMembers, setAllMembers] = useState<{ ID: number }[]>([]);
  const allMembers = _allMembers.map((member) => (
    <pre key={member.ID}>{JSON.stringify(member, null, 2)}</pre>
  ));

  async function fetchAllMembers() {
    const result = await fetch("/api/get-all-members", { headers: await authHeader() });
    if (!result.ok) return console.error(await result.text());
    setAllMembers(await result.json());
  }

  return (
    <>
      <h1>All Members</h1>
      <button onClick={fetchAllMembers}>Get All Members</button>
      <br />
      <button onClick={() => setAllMembers([])}>Clear</button>
      {allMembers}
    </>
  );
};

export default AllMembers;

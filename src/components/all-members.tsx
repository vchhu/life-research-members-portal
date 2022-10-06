import { main_members } from "@prisma/client";
import Link from "next/link";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import ApiRoutes from "../utils/front-end/api-facade/api-routes";
import authHeader from "../utils/front-end/api-facade/auth-header";
import useAllMembers from "../utils/front-end/api-facade/use-all-members";
import PageRoutes from "../utils/front-end/page-routes";

const AllMembers: FunctionComponent = () => {
  const { allMembers, loading, fetchAllMembers } = useAllMembers();

  const allMembersHtml = allMembers.map((member) => (
    <Fragment key={member.id}>
      <pre>{JSON.stringify(member, null, 2)}</pre>
      <Link href={PageRoutes.viewMember + member.id}>
        <button>VIEW</button>
      </Link>
      <span style={{ width: "6px", display: "inline-block" }}></span>
      <Link href={PageRoutes.editMember + member.id}>
        <button>EDIT</button>
      </Link>
    </Fragment>
  ));

  return (
    <>
      <h1>All Members</h1>
      <button onClick={fetchAllMembers}>REFRESH</button>
      {loading ? (
        <>
          <br />
          <br />
          <div>Loading...</div>
        </>
      ) : (
        allMembersHtml
      )}
    </>
  );
};

export default AllMembers;

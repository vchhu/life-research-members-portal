import { main_members } from "@prisma/client";
import Table, { ColumnType } from "antd/lib/table";
import { FunctionComponent } from "react";
import useAllMembers from "../utils/front-end/api-facade/use-all-members";

const AllMembers: FunctionComponent = () => {
  const { allMembers, loading, refresh } = useAllMembers();
  const keyedMembers = allMembers.map((m) => ({ ...m, key: m.id }));

  const columns: ColumnType<main_members>[] = [
    { title: "First Name", dataIndex: "first_name" },
    { title: "Last Name", dataIndex: "last_name" },
  ];

  return (
    <>
      <h1>All Members</h1>
      <button onClick={refresh}>REFRESH</button>
      <Table columns={columns} dataSource={keyedMembers} loading={loading} />
    </>
  );
};

export default AllMembers;

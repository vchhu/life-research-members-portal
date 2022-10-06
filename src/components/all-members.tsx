import { main_members } from "@prisma/client";
import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { FunctionComponent } from "react";
import useAllMembers from "../utils/front-end/api-facade/use-all-members";

const AllMembers: FunctionComponent = () => {
  const { allMembers, loading, refresh } = useAllMembers();
  const keyedMembers = allMembers.map((m) => ({ ...m, key: m.id }));
  console.log(allMembers);

  const columns: ColumnType<main_members>[] = [
    { title: "First Name", dataIndex: "first_name" },
    { title: "Last Name", dataIndex: "last_name" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone (Business)", dataIndex: "business_phone" },
    { title: "Phone (Mobile)", dataIndex: "mobile_phone" },
    { title: "Faculty", dataIndex: ["types_faculty", "faculty_name_en"] },
    { title: "Member Type", dataIndex: ["types_member_category", "category_name_en"] },
  ];

  const header = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Title level={1} style={{ margin: 0 }}>
        All Members
      </Title>
      <div style={{ flexGrow: 15 }}></div>
      <Button type="primary" onClick={refresh} size="large" style={{ flexGrow: 1 }}>
        Refresh
      </Button>
    </div>
  );

  return <Table columns={columns} dataSource={keyedMembers} loading={loading} title={header} />;
};

export default AllMembers;

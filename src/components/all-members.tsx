import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { FunctionComponent } from "react";
import useAllMembers from "../api-facade/use-all-members";
import { all_member_info } from "../../prisma/types";

const AllMembers: FunctionComponent = () => {
  const { allMembers, loading, refresh } = useAllMembers();
  const keyedMembers = allMembers.map((m) => ({ ...m, key: m.id }));

  const columns: ColumnType<all_member_info>[] = [
    {
      title: "First Name",
      dataIndex: "first_name",
      sorter: (a, b) => (a.first_name || "").localeCompare(b.first_name || ""),
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      sorter: (a, b) => (a.last_name || "").localeCompare(b.last_name || ""),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => (a.email || "").localeCompare(b.email || ""),
    },
    {
      title: "Phone (Business)",
      dataIndex: "business_phone",
      sorter: (a, b) => (a.business_phone || "").localeCompare(b.business_phone || ""),
    },
    {
      title: "Phone (Mobile)",
      dataIndex: "mobile_phone",
      sorter: (a, b) => (a.mobile_phone || "").localeCompare(b.mobile_phone || ""),
    },
    {
      title: "Faculty",
      dataIndex: ["types_faculty", "faculty_name_en"],
      sorter: (a, b) =>
        (a.types_faculty?.faculty_name_en || "").localeCompare(
          b.types_faculty?.faculty_name_en || ""
        ),
    },
    {
      title: "Member Type",
      dataIndex: ["types_member_category", "category_name_en"],
      sorter: (a, b) =>
        (a.types_member_category?.category_name_en || "").localeCompare(
          b.types_member_category?.category_name_en || ""
        ),
    },
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

  return (
    <Table
      columns={columns}
      dataSource={keyedMembers}
      loading={loading}
      title={header}
      tableLayout="fixed"
      sticky
    />
  );
};

export default AllMembers;

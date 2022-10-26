import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { FunctionComponent } from "react";
import useAllMembers from "../../api-facade/use-all-members";
import { all_member_info, public_member_info } from "../../../prisma/types";
import PageRoutes from "../../routing/page-routes";

const AllMembers: FunctionComponent = () => {
  const { allMembers, loading, refresh } = useAllMembers();
  const keyedMembers = allMembers.map((m) => ({ ...m, key: m.id }));

  const columns: ColumnType<public_member_info>[] = [
    {
      title: "First Name",
      dataIndex: ["account", "first_name"],
      sorter: (a, b) => (a.account.first_name || "").localeCompare(b.account.first_name || ""),
    },
    {
      title: "Last Name",
      dataIndex: ["account", "last_name"],
      sorter: (a, b) => (a.account.last_name || "").localeCompare(b.account.last_name || ""),
    },
    {
      title: "Email",
      dataIndex: "work_email",
      sorter: (a, b) => (a.work_email || "").localeCompare(b.work_email || ""),
    },
    {
      title: "Phone (Business)",
      dataIndex: "work_phone",
      sorter: (a, b) => (a.work_phone || "").localeCompare(b.work_phone || ""),
    },
    {
      title: "Faculty",
      dataIndex: ["faculty", "name_en"],
      sorter: (a, b) => (a.faculty?.name_en || "").localeCompare(b.faculty?.name_en || ""),
    },
    {
      title: "Member Type",
      dataIndex: ["member_type", "name_en"],
      sorter: (a, b) => (a.member_type?.name_en || "").localeCompare(b.member_type?.name_en || ""),
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
      pagination={false}
      showSorterTooltip={false}
      sticky={{ offsetHeader: 80 }}
      scroll={{ x: "max-content" }}
      onRow={(record, _) => ({
        onDoubleClick: (_) => {
          window.open(PageRoutes.memberProfile(record.id));
        },
      })}
    />
  );
};

export default AllMembers;

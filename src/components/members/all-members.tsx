import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import type { FC } from "react";
import useAllMembers from "../../api-facade/use-all-members";
import type { AllMembersRes } from "../../pages/api/all-members";
import PageRoutes from "../../routing/page-routes";

const AllMembers: FC = () => {
  const { allMembers, loading, refresh } = useAllMembers();
  const keyedMembers = allMembers.map((m) => ({ ...m, key: m.id }));

  const columns: ColumnType<AllMembersRes[number]>[] = [
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
      rowClassName={(_, index) => "table-row " + (index % 2 === 0 ? "even" : "odd")}
      onRow={(member, _) => ({
        onClick: (_) => {
          window.open(PageRoutes.memberProfile(member.id));
        },
      })}
    />
  );
};

export default AllMembers;

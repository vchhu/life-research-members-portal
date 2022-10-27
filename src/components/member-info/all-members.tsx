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

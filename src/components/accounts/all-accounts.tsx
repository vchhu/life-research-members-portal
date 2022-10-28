import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import type { FC } from "react";
import useAllAccounts from "../../api-facade/use-all-accounts";
import type { AccountRes } from "../../pages/api/account/[id]";
import PageRoutes from "../../routing/page-routes";

const AllAccounts: FC = () => {
  const { allAccounts, loading, refresh } = useAllAccounts();
  const keyedAccounts = allAccounts.map((m) => ({ ...m, key: m.id }));

  const columns: ColumnType<NonNullable<AccountRes>>[] = [
    {
      title: "Login Email",
      dataIndex: "login_email",
      sorter: (a, b) => (a.login_email || "").localeCompare(b.login_email || ""),
    },
    {
      title: "Admin",
      dataIndex: "is_admin",
      width: "6rem",
      render: (text, record, index) => {
        return record.is_admin ? "Yes" : "No";
      },
      sorter: (a, b) => (a.is_admin ? 1 : 0) - (b.is_admin ? 1 : 0),
    },
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
      title: "Contact Email",
      dataIndex: ["member", "work_email"],
      sorter: (a, b) => (a.member?.work_email || "").localeCompare(b.member?.work_email || ""),
    },
    {
      title: "Phone (Business)",
      dataIndex: ["member", "work_phone"],
      sorter: (a, b) => (a.member?.work_phone || "").localeCompare(b.member?.work_phone || ""),
    },
    {
      title: "Phone (Mobile)",
      dataIndex: ["member", "mobile_phone"],
      sorter: (a, b) => (a.member?.mobile_phone || "").localeCompare(b.member?.mobile_phone || ""),
    },
  ];

  const header = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Title level={1} style={{ margin: 0 }}>
        All Accounts
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
      dataSource={keyedAccounts}
      loading={loading}
      title={header}
      pagination={false}
      showSorterTooltip={false}
      sticky={{ offsetHeader: 80 }}
      scroll={{ x: "max-content" }}
      onRow={(record, _) => ({
        onDoubleClick: (_) => {
          window.open(PageRoutes.accountProfile(record.id));
        },
      })}
    />
  );
};

export default AllAccounts;

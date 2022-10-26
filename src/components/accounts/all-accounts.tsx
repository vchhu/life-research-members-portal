import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { FunctionComponent } from "react";
import { all_account_info } from "../../../prisma/types";
import useAllAccounts from "../../api-facade/use-all-accounts";
import PageRoutes from "../../routing/page-routes";

const AllAccounts: FunctionComponent = () => {
  const { allAccounts, loading, refresh } = useAllAccounts();
  const keyedAccounts = allAccounts.map((m) => ({ ...m, key: m.id }));

  const columns: ColumnType<all_account_info>[] = [
    {
      title: "Login Email",
      dataIndex: "microsoft_email",
      sorter: (a, b) => (a.microsoft_email || "").localeCompare(b.microsoft_email || ""),
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
      dataIndex: ["member", "first_name"],
      sorter: (a, b) => (a.member?.first_name || "").localeCompare(b.member?.first_name || ""),
    },
    {
      title: "Last Name",
      dataIndex: ["member", "last_name"],
      sorter: (a, b) => (a.member?.last_name || "").localeCompare(b.member?.last_name || ""),
    },
    {
      title: "Contact Email",
      dataIndex: ["member", "email"],
      sorter: (a, b) => (a.member?.email || "").localeCompare(b.member?.email || ""),
    },
    {
      title: "Phone (Business)",
      dataIndex: ["member", "business_phone"],
      sorter: (a, b) =>
        (a.member?.business_phone || "").localeCompare(b.member?.business_phone || ""),
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

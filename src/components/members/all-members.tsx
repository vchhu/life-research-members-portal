import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import type { FC } from "react";
import useAllMembers from "../../api-facade/use-all-members";
import type { PublicMemberInfo } from "../../api-facade/_types";
import PageRoutes from "../../routing/page-routes";
import KeywordTag from "./keyword-tag";

const AllMembers: FC = () => {
  const { allMembers, loading, refresh } = useAllMembers();
  const keyedMembers = allMembers.map((m) => ({ ...m, key: m.id }));

  const columns: ColumnType<PublicMemberInfo>[] = [
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
      title: "Tags",
      dataIndex: "has_keyword",
      render: (_, member) => (
        <div className="tag-column">
          {member.has_keyword.map((k) => (
            <KeywordTag key={k.keyword.id} keyword={k.keyword} />
          ))}
        </div>
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
      size="small"
      columns={columns}
      dataSource={keyedMembers}
      loading={loading}
      title={header}
      pagination={false}
      showSorterTooltip={false}
      sticky={{ offsetHeader: 74 }}
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

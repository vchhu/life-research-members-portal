import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/router";
import { FC, useContext } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import useAllMembers from "../../services/use-all-members";
import type { MemberPublicInfo } from "../../services/_types";
import PageRoutes from "../../routing/page-routes";
import KeywordTag from "../keywords/keyword-tag";

const AllMembers: FC = () => {
  const router = useRouter();
  const { en } = useContext(LanguageCtx);
  const { allMembers, loading, refresh } = useAllMembers();
  const keyedMembers = allMembers.map((m) => ({ ...m, key: m.id })).filter((m) => m.is_active);

  const columns: ColumnType<MemberPublicInfo>[] = [
    {
      title: en ? "First Name" : "Prénom",
      dataIndex: ["account", "first_name"],
      className: "first-name-column",
      sorter: (a, b) => (a.account.first_name || "").localeCompare(b.account.first_name || ""),
    },
    {
      title: en ? "Last Name" : "Nom de Famille",
      dataIndex: ["account", "last_name"],
      className: "last-name-column",
      sorter: (a, b) => (a.account.last_name || "").localeCompare(b.account.last_name || ""),
    },
    {
      title: en ? "Key Words" : "Mots Clés",
      dataIndex: "has_keyword",
      className: "tag-column",
      render: (_, member) =>
        member.has_keyword.map((k) => <KeywordTag key={k.keyword.id} keyword={k.keyword} />),
    },
  ];

  const header = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Title level={1} style={{ margin: 0 }}>
        {en ? "All Members" : "Tous les Membres"}
      </Title>
      <div style={{ flexGrow: 15 }}></div>
      <Button type="primary" onClick={refresh} size="large" style={{ flexGrow: 1 }}>
        Refresh
      </Button>
    </div>
  );

  return (
    <Table
      className="all-members-table"
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
          router.push(PageRoutes.memberProfile(member.id));
        },
      })}
    />
  );
};

export default AllMembers;

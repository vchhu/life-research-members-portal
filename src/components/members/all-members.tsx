import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { useRouter } from "next/router";
import { FC, Fragment, useContext, useEffect, useState } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import type { MemberPublicInfo } from "../../services/_types";
import PageRoutes from "../../routing/page-routes";
import KeywordTag from "../keywords/keyword-tag";
import { AllMembersCtx } from "../../services/context/all-members-ctx";
import GetLanguage from "../../utils/front-end/get-language";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import SafeLink from "../link/safe-link";

const AllMembers: FC = () => {
  const router = useRouter();
  const { en } = useContext(LanguageCtx);
  const { allMembers, loading, refresh } = useContext(AllMembersCtx);
  const keyedMembers = allMembers.map((m) => ({ ...m, key: m.id })).filter((m) => m.is_active);

  const [nameSortOrder, setNameSortOrder] = useState<"ascend" | "descend">("ascend");
  function toggleNameSortOrder() {
    if (nameSortOrder === "ascend") setNameSortOrder("descend");
    if (nameSortOrder === "descend") setNameSortOrder("ascend");
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getName(member: MemberPublicInfo) {
    return member.account.first_name + " " + member.account.last_name;
  }

  const columns: ColumnType<MemberPublicInfo>[] = [
    {
      title: <div onClick={toggleNameSortOrder}>{en ? "Name" : "Nom"}</div>,
      key: "name",
      className: "name-column",
      sorter: (a, b) => getName(a).localeCompare(getName(b)),
      sortOrder: nameSortOrder,
      render: (_, member) => (
        <SafeLink href={PageRoutes.memberProfile(member.id)}>{getName(member)}</SafeLink>
      ),
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
        {en ? "Refresh" : "Rafraîchir"}
      </Button>
    </div>
  );

  const expandedRowRender = (member: MemberPublicInfo) => (
    <Descriptions size="small" layout="vertical" className="problems-container">
      <Item label={en ? "Problems I Work On" : "Problèmes sur Lesquels Je Travaille"}>
        {member.problem.map((p, i) => (
          <Fragment key={i}>
            {`${i + 1}. `}
            <GetLanguage obj={p} />
            <br />
          </Fragment>
        ))}
      </Item>
    </Descriptions>
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
      expandable={{
        expandedRowRender,
        expandedRowClassName: (_, index) =>
          "expanded-table-row " + (index % 2 === 0 ? "even" : "odd"),
      }}
    />
  );
};

export default AllMembers;

import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { FC, Fragment, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import type { MemberPublicInfo } from "../../services/_types";
import PageRoutes from "../../routing/page-routes";
import KeywordTag from "../keywords/keyword-tag";
import { AllMembersCtx } from "../../services/context/all-members-ctx";
import GetLanguage from "../../utils/front-end/get-language";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import SafeLink from "../link/safe-link";
import Input from "antd/lib/input";
import CaretDownOutlined from "@ant-design/icons/lib/icons/CaretDownOutlined";
import CaretUpOutlined from "@ant-design/icons/lib/icons/CaretUpOutlined";

function ascendingSorter(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name);
}

function descendingSorter(a: { name: string }, b: { name: string }) {
  return b.name.localeCompare(a.name);
}

function getName(member: MemberPublicInfo) {
  return member.account.first_name + " " + member.account.last_name;
}

function filterFn(m: { name: string; is_active: boolean }, nameFilter: string) {
  return (
    m.is_active && (!nameFilter || removeDiacritics(m.name).includes(removeDiacritics(nameFilter)))
  );
}

// From https://www.davidbcalhoun.com/2019/matching-accented-strings-in-javascript/
function removeDiacritics(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

const AllMembers: FC = () => {
  const { en } = useContext(LanguageCtx);
  const { allMembers, loading, refresh } = useContext(AllMembersCtx);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [sortAscending, setSortAscending] = useState(true);
  const sortFn = sortAscending ? ascendingSorter : descendingSorter;
  function toggleSort() {
    setSortAscending((prev) => !prev);
  }

  const [nameFilter, setNameFilter] = useState("");

  const sortedFilteredMembers = useMemo(
    () =>
      allMembers
        .map((m) => ({ ...m, key: m.id, name: getName(m) }))
        .filter((m) => filterFn(m, nameFilter))
        .sort(sortFn),
    [allMembers, nameFilter, sortFn]
  );

  const nameHeader = (
    <div className="name-column-header">
      <Input
        placeholder={en ? "Name" : "Nom"}
        value={nameFilter}
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <div
        onClick={toggleSort}
        style={{ display: "flex", cursor: "pointer", height: 32, alignItems: "center" }}
        className="sort-caret"
      >
        {sortAscending ? <CaretDownOutlined /> : <CaretUpOutlined />}
      </div>
    </div>
  );

  const columns: ColumnType<typeof sortedFilteredMembers[number]>[] = [
    {
      title: nameHeader,
      dataIndex: "name",
      className: "name-column",
      render: (value, member) => (
        <SafeLink href={PageRoutes.memberProfile(member.id)}>{value}</SafeLink>
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
      dataSource={sortedFilteredMembers}
      loading={loading}
      title={header}
      pagination={false}
      showSorterTooltip={false}
      sticky={{ offsetHeader: 74 }}
      scroll={{ x: true }}
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

import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { FC, Fragment, useContext, useEffect, useMemo, useState } from "react";
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
import { useRouter } from "next/router";
import Form from "antd/lib/form";
import type { keyword } from "@prisma/client";
import { AllKeywordsCtx } from "../../services/context/all-keywords-ctx";
import KeywordFilter from "../keywords/keyword-filter";

function ascendingSorter(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name);
}

function descendingSorter(a: { name: string }, b: { name: string }) {
  return b.name.localeCompare(a.name);
}

function getName(member: MemberPublicInfo) {
  return member.account.first_name + " " + member.account.last_name;
}

function filterFn(
  m: MemberPublicInfo & { name: string },
  nameFilter: string,
  keywordFilter: Map<number, keyword>
): boolean {
  return (
    m.is_active &&
    (!nameFilter || removeDiacritics(m.name).includes(removeDiacritics(nameFilter))) &&
    (keywordFilter.size === 0 || m.has_keyword.some(({ keyword }) => keywordFilter.has(keyword.id)))
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
  const { allMembers, loading, refresh: refreshMembers } = useContext(AllMembersCtx);
  const { keywordMap, refresh: refreshKeywords } = useContext(AllKeywordsCtx);
  const router = useRouter();

  useEffect(() => {
    refreshMembers();
    refreshKeywords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refreshAndClearFilters() {
    handleKeywordFilterChange(new Map());
    setNameFilter("");
    refreshMembers();
  }

  const [keywordFilter, setKeywordFilter] = useState(new Map<number, keyword>());

  // Use query params for th keyword filter - for bookmarking, back button etc.
  function handleKeywordFilterChange(next: Map<number, keyword>) {
    router.push({ query: { ...router.query, keywords: Array.from(next.keys()) } });
  }

  // Update keyword filter on query params change
  useEffect(() => {
    const keywordsQuery = router.query.keywords;
    if (!keywordsQuery) return setKeywordFilter(new Map());
    setKeywordFilter(() => {
      const next = new Map();
      if (typeof keywordsQuery === "string") {
        const k = keywordMap.get(parseInt(keywordsQuery));
        if (k) next.set(k.id, k);
      } else
        for (const keyword of keywordsQuery) {
          const k = keywordMap.get(parseInt(keyword));
          if (k) next.set(k.id, k);
        }
      return next;
    });
  }, [keywordMap, router.query.keywords]);

  function addKeyword(k: keyword) {
    handleKeywordFilterChange(new Map(keywordFilter).set(k.id, k));
  }

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
        .filter((m) => filterFn(m, nameFilter, keywordFilter))
        .sort(sortFn),
    [allMembers, keywordFilter, nameFilter, sortFn]
  );

  const nameHeader = (
    <div className="name-column-header">
      <Form>
        <Input
          placeholder={en ? "Name..." : "Nom..."}
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Form>
      <div
        onClick={toggleSort}
        style={{ display: "flex", cursor: "pointer", height: 32, alignItems: "center" }}
        className="sort-caret"
      >
        {sortAscending ? <CaretDownOutlined /> : <CaretUpOutlined />}
      </div>
    </div>
  );

  const keywordHeader = (
    <div className="keyword-column-header">
      <Form>
        <KeywordFilter value={keywordFilter} onChange={handleKeywordFilterChange} />
      </Form>
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
      title: keywordHeader,
      dataIndex: "has_keyword",
      className: "tag-column",
      render: (_, member) =>
        member.has_keyword.map((k) => (
          <KeywordTag key={k.keyword.id} keyword={k.keyword} onClick={addKeyword} />
        )),
    },
  ];

  const header = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Title level={1} style={{ margin: 0 }}>
        {en ? "All Members" : "Tous les Membres"}
      </Title>
      <div style={{ flexGrow: 15 }}></div>
      <Button type="primary" onClick={refreshAndClearFilters} size="large" style={{ flexGrow: 1 }}>
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

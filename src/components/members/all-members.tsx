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
import { useRouter } from "next/router";
import Form from "antd/lib/form";
import type { keyword } from "@prisma/client";
import { AllKeywordsCtx } from "../../services/context/all-keywords-ctx";
import KeywordFilter from "../keywords/keyword-filter";
import blurActiveElement from "../../utils/front-end/blur-active-element";
import { Checkbox, Select } from "antd";
import { FacultiesCtx } from "../../services/context/faculties-ctx";
import { MemberTypesCtx } from "../../services/context/member-types-ctx";
import removeDiacritics from "../../utils/front-end/remove-diacritics";

function nameSorter(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name);
}

function getName(member: MemberPublicInfo) {
  return member.account.first_name + " " + member.account.last_name;
}

function filterFn(
  m: MemberPublicInfo & { name: string },
  nameFilter: string,
  keywordFilter: Set<number>
): boolean {
  return (
    m.is_active &&
    (!nameFilter || removeDiacritics(m.name).includes(removeDiacritics(nameFilter))) &&
    (keywordFilter.size === 0 || m.has_keyword.some(({ keyword }) => keywordFilter.has(keyword.id)))
  );
}

const AllMembers: FC = () => {
  const { en } = useContext(LanguageCtx);
  const { allMembers, loading, refresh: refreshMembers } = useContext(AllMembersCtx);
  const { keywords, keywordMap, refresh: refreshKeywords } = useContext(AllKeywordsCtx);
  const { faculties } = useContext(FacultiesCtx);
  const { memberTypes } = useContext(MemberTypesCtx);
  const router = useRouter();

  const [showKeywords, setShowKeywords] = useState(true);
  const [showFaculty, setShowFaculty] = useState(false);
  const [showMemberType, setShowMemberType] = useState(false);

  const [nameFilter, setNameFilter] = useState("");
  const [keywordFilter, setKeywordFilter] = useState(new Set<number>());

  useEffect(() => {
    refreshMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refreshAndClearFilters() {
    handleKeywordFilterChange(new Set());
    setNameFilter("");
    refreshMembers();
  }

  // Use query params for the keyword filter - for bookmarking, back button etc.
  function handleKeywordFilterChange(next: Set<number>) {
    router.push({ query: { ...router.query, keywords: Array.from(next.keys()) } });
  }

  // Update keyword filter on query params change
  useEffect(() => {
    const keywordsQuery = router.query.keywords;
    if (!keywordsQuery) return setKeywordFilter(new Set<number>());
    setKeywordFilter(() => {
      const next = new Set<number>();
      if (typeof keywordsQuery === "string") {
        const id = parseInt(keywordsQuery);
        if (!isNaN(id)) next.add(id);
      } else
        for (const keyword of keywordsQuery) {
          const id = parseInt(keyword);
          if (!isNaN(id)) next.add(id);
        }
      return next;
    });
  }, [keywordMap, router.query.keywords]);

  function addKeyword(k: keyword) {
    handleKeywordFilterChange(new Set(keywordFilter).add(k.id));
  }

  const filteredMembers = useMemo(
    () =>
      allMembers
        .map((m) => ({ ...m, key: m.id, name: getName(m) }))
        .filter((m) => filterFn(m, nameFilter, keywordFilter)),
    [allMembers, keywordFilter, nameFilter]
  );

  const columns: ColumnType<typeof filteredMembers[number]>[] = [
    {
      title: en ? "Name" : "Nom",
      dataIndex: "name",
      className: "name-column",
      sorter: nameSorter,
      render: (value, member) => (
        <SafeLink href={PageRoutes.memberProfile(member.id)}>{value}</SafeLink>
      ),
    },
  ];

  if (showFaculty)
    columns.push({
      title: en ? "Faculty" : "Faculté",
      dataIndex: ["faculty", en ? "name_en" : "name_fr"],
      className: "faculty-column",
      sorter: en
        ? (a, b) => (a.faculty?.name_en || "").localeCompare(b.faculty?.name_en || "")
        : (a, b) => (a.faculty?.name_fr || "").localeCompare(b.faculty?.name_fr || ""),
    });

  if (showMemberType)
    columns.push({
      title: en ? "Member Type" : "Type de membre",
      dataIndex: ["member_type", en ? "name_en" : "name_fr"],
      className: "type-column",
      sorter: en
        ? (a, b) => (a.member_type?.name_en || "").localeCompare(b.member_type?.name_en || "")
        : (a, b) => (a.member_type?.name_fr || "").localeCompare(b.member_type?.name_fr || ""),
    });

  if (showKeywords)
    columns.push({
      title: en ? "Keywords" : "Mots-clés",
      dataIndex: "has_keyword",
      className: "tag-column",
      render: (_, member) =>
        member.has_keyword.map((k) => (
          <KeywordTag key={k.keyword.id} keyword={k.keyword} onClick={addKeyword} />
        )),
    });

  const filters = (
    <Form onFinish={blurActiveElement} className="filters">
      <Form.Item label={en ? "Show" : "Afficher"}>
        <Checkbox checked={showFaculty} onChange={(e) => setShowFaculty(e.target.checked)}>
          {en ? "Faculty" : "Faculté"}
        </Checkbox>
        <Checkbox checked={showMemberType} onChange={(e) => setShowMemberType(e.target.checked)}>
          {en ? "Member Type" : "Type de membre"}
        </Checkbox>
        <Checkbox checked={showKeywords} onChange={(e) => setShowKeywords(e.target.checked)}>
          {en ? "Keywords" : "Mots-clés"}
        </Checkbox>
      </Form.Item>
      <Form.Item label={en ? "Filter by name" : "Filtrer par nom"} htmlFor="name-filter">
        <Input
          className="name-filter"
          id="name-filter"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
      </Form.Item>
      <Form.Item label={en ? "Filter by faculty" : "Filtrer par faculté"}>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          getPopupContainer={() =>
            document.querySelector(".all-members-table .filters") || document.body
          }
          showSearch={false}
          showArrow
        >
          <Select.Option value={0}>{en ? "Empty" : "Vide"}</Select.Option>
          {faculties.map((f) => (
            <Select.Option key={f.id} value={f.id}>
              <GetLanguage obj={f} />
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label={en ? "Filter by member type" : "Filtrer par type de membre"}></Form.Item>
      <Form.Item label={en ? "Filter by keywords" : "Filtrer par mots-clés"}>
        <KeywordFilter
          value={keywordFilter}
          onChange={handleKeywordFilterChange}
          getPopupContainer={() =>
            document.querySelector(".all-members-table .filters") || document.body
          }
        />
      </Form.Item>
    </Form>
  );

  const Header = () => (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Title level={1} style={{ margin: 0 }}>
          {en ? "All Members" : "Tous les Membres"}
        </Title>
        <div style={{ flexGrow: 15 }}></div>
        <Button
          type="primary"
          onClick={refreshAndClearFilters}
          size="large"
          style={{ flexGrow: 1 }}
        >
          {en ? "Refresh" : "Rafraîchir"}
        </Button>
      </div>
      {filters}
    </>
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
      tableLayout="auto"
      columns={columns}
      dataSource={filteredMembers}
      loading={loading}
      title={Header}
      pagination={false}
      showSorterTooltip={false}
      sticky={{ offsetHeader: 74 }}
      scroll={{ x: true }}
      rowClassName={(_, index) => "table-row " + (index % 2 === 0 ? "even" : "odd")}
      expandable={{
        expandedRowRender,
        expandedRowClassName: (_, index) =>
          "expanded-table-row " + (index % 2 === 0 ? "even" : "odd"),
        rowExpandable: (m) => m.problem.length > 0,
      }}
    />
  );
};

export default AllMembers;

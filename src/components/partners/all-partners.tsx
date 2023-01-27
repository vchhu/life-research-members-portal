import React, { useState } from "react";
import type { FC } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import { useContext } from "react";
import { Button, Checkbox, Select, Table } from "antd";
import Title from "antd/lib/typography/Title";
import Form from "antd/lib/form";

const AllPartners: FC = () => {
  const { en } = useContext(LanguageCtx);

  //##################   SIMPLE DATA TO REPLACE  #######################/

  const [filterByName, setFilterByName] = useState("");
  const [filterByScope, setFilterByScope] = useState("");
  const [filterByType, setFilterByType] = useState("");

  const handleFilterByNameChange = (value: string) => {
    setFilterByName(value);
  };

  const handleFilterByScopeChange = (value: string) => {
    setFilterByScope(value);
  };

  const handleFilterByTypeChange = (value: string) => {
    setFilterByType(value);
  };

  const nameOptions = [
    { value: "partner1", label: "Partner 1" },
    { value: "partner2", label: "Partner 2" },
    { value: "partner3", label: "Partner 3" },
  ];

  const scopeOptions = [
    { value: "scope1", label: "Scope 1" },
    { value: "scope2", label: "Scope 2" },
    { value: "scope3", label: "Scope 3" },
  ];

  const typeOptions = [
    { value: "type1", label: "Type 1" },
    { value: "type2", label: "Type 2" },
    { value: "type3", label: "Type 3" },
  ];

  const columns = [
    {
      title: en ? "Organization Name" : "Nom de l'organisation",
      dataIndex: "name",
      key: "name",
    },
    {
      title: en ? "Affiliate Members" : "Membres affiliés",
      dataIndex: "members",
      key: "members",
    },
  ];

  const partnership = [
    {
      key: "1",
      name: "Global Tech Inc.",
      members:
        "Rachel Davis, Joshua Anderson, Sarah Wilson, Nicholas Thompson, Anthony Martinez   ",
    },
    {
      key: "2",
      name: "Green Energy Solutions LLC",
      members:
        "Jenna Smith, Michael Johnson, Emily Brown, David Garcia, Rebecca Perez",
    },
    {
      key: "3",
      name: "Infinite Ideas Inc.",
      members:
        "Amanda Perez, Matthew Taylor, James Rodriguez, Benjamin Baker, Jennifer White",
    },
  ];

  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const handleExpand = (isExpanded: boolean, record: any) => {
    if (isExpanded) {
      setExpandedRows([...expandedRows, record.key]);
    } else {
      setExpandedRows(expandedRows.filter((key) => key !== record.key));
    }
  };

  const expandedRowRender = (record: any) => (
    <p style={{ margin: 0 }}>
      {record.name === "Global Tech Inc."
        ? en
          ? "Global Tech Inc. is a leading technology company that specializes in software development and IT solutions."
          : "Global Tech Inc. est une entreprise de technologie de premier plan spécialisée dans le développement de logiciels et les solutions informatiques."
        : record.name === "Green Energy Solutions LLC"
        ? en
          ? "Green Energy Solutions LLC is a renewable energy company that provides sustainable energy solutions to businesses and individuals."
          : "Green Energy Solutions LLC est une entreprise d'énergie renouvelable qui fournit des solutions énergétiques durables aux entreprises et aux particuliers."
        : record.name === "Infinite Ideas Inc."
        ? en
          ? "Infinite Ideas Inc. is an innovation and design consulting firm that helps businesses and organizations bring new ideas to life."
          : "Infinite Ideas Inc. est une société de conseil en innovation et design qui aide les entreprises et les organisations à donner vie à de nouvelles idées."
        : ""}
    </p>
  );

  //##################   SIMPLE DATA END HERE #######################/

  const filters = (
    <Form className="filters" labelAlign="left" size="small">
      <Form.Item
        label={en ? "Filter by name" : "Filtrer par nom"}
        htmlFor="name-filter"
      >
        <Select
          className="name-filter"
          id="name-filter"
          value={filterByName}
          onChange={handleFilterByNameChange}
          options={nameOptions}
        />
      </Form.Item>
      <Form.Item
        label={en ? "Filter by scope" : "Filtrer par étendue"}
        htmlFor="faculty-filter"
      >
        <Select
          className="name-filter"
          id="scope-filter"
          value={filterByScope}
          onChange={handleFilterByScopeChange}
          options={scopeOptions}
        />
      </Form.Item>
      <Form.Item
        label={en ? "Filter by type" : "Filtrer par type"}
        htmlFor="member-type-filter"
      >
        <Select
          className="name-filter"
          id="type-filter"
          value={filterByType}
          onChange={handleFilterByTypeChange}
          options={typeOptions}
        />
      </Form.Item>

      <label htmlFor="show-column-checkboxes">
        {en ? "Show Columns:" : "Afficher les colonnes:"}
      </label>
      <span className="show-column-checkboxes" id="show-column-checkboxes">
        <Checkbox>
          {en ? "Show affiliate Members" : "Afficher les membres affiliés"}
        </Checkbox>
      </span>
    </Form>
  );

  const Header = () => (
    <>
      <div className="header-title-row">
        <Title level={1}>
          {en ? "All Partnerships" : "Tous les partnariats"}
        </Title>
        <Button type="primary" size="large">
          {en ? "Reset the filter" : "Réinitialiser le filtre"}
        </Button>{" "}
        <Button type="primary" size="large">
          {en ? "Add a new partnerships" : "Ajouter un nouveau partenariat"}
        </Button>
      </div>
      {filters}
    </>
  );

  return (
    <Table
      className="all-partnerships-table"
      size="small"
      tableLayout="auto"
      columns={columns}
      dataSource={partnership}
      // loading={loading}
      title={Header}
      pagination={false}
      showSorterTooltip={false}
      sticky={{ offsetHeader: 74 }}
      scroll={{ x: true }}
      rowClassName={(_, index) =>
        "table-row " + (index % 2 === 0 ? "even" : "odd")
      }
      expandedRowRender={expandedRowRender}
      onExpand={handleExpand}
      expandedRowKeys={expandedRows}
    />
  );
};

export default AllPartners;

import React, { useState } from "react";
import type { FC } from "react";
import { useContext } from "react";
import { Button, Checkbox, Select, Table } from "antd";
import Title from "antd/lib/typography/Title";
import Form from "antd/lib/form";
import { en } from "../../services/context/language-ctx";

const AllProducts: FC = () => {
  const [filterByName, setFilterByName] = useState("");
  const [filterByType, setFilterByType] = useState("");
  const [filterByBrand, setFilterByAuthor] = useState("");

  const handleFilterByNameChange = (value: string) => {
    setFilterByName(value);
  };

  const handleFilterByTypeChange = (value: string) => {
    setFilterByType(value);
  };

  const handleFilterByAuthorChange = (value: string) => {
    setFilterByAuthor(value);
  };

  const nameOptions = [
    { value: "product1", label: "The Art of War" },
    { value: "product2", label: "To Kill a Mockingbird" },
    { value: "product3", label: "The Human Form: A Study in Sculpture" },
  ];

  const typeOptions = [
    { value: "type1", label: "Pub_Books" },
    { value: "type2", label: "Artistic or Museum Exhibitions" },
    { value: "type3", label: "Art_Visual Artwork" },
  ];

  const authorOptions = [
    { value: "author1", label: "Sun Tzu" },
    { value: "author2", label: "Harper Lee" },
    { value: "author3", label: "Dr. Ali Hassan" },
    { value: "author3", label: "John Smith" },
    { value: "author3", label: "Jane Doe" },
  ];

  const columns = [
    {
      title: "Product Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
  ];

  const products = [
    {
      key: "1",
      name: "The Art of War",
      type: "Pub_Books",
      author: "Sun Tzu",
    },
    {
      key: "2",
      name: "To Kill a Mockingbird",
      type: "Pub_Books",
      author: "Harper Lee",
    },
    {
      key: "3",
      name: "The Human Form: A Study in Sculpture",
      type: "Artistic or Museum Exhibitions",
      author: "Dr. Ali Hassan, John Smith, Jane Doe ",
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (filterByName && !product.name.toLowerCase().includes(filterByName)) {
      return false;
    }
    if (filterByType && product.type !== filterByType) {
      return false;
    }
    if (filterByBrand && product.author !== filterByBrand) {
      return false;
    }
    return true;
  });

  const filters = (
    <Form className="filters" labelAlign="left" size="small">
      <Form.Item
        label={en ? "Filter by title" : "Filtrer par titre"}
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
        label={en ? "Filter by author" : "Filtrer par author"}
        htmlFor="faculty-filter"
      >
        <Select
          className="name-filter"
          id="scope-filter"
          value={filterByType}
          onChange={handleFilterByTypeChange}
          options={typeOptions}
        />
      </Form.Item>
      <Form.Item
        label={en ? "Filter by type" : "Filtrer par type"}
        htmlFor="member-type-filter"
      >
        <Select
          className="name-filter"
          id="type-filter"
          value={filterByBrand}
          onChange={handleFilterByAuthorChange}
          options={authorOptions}
        />
      </Form.Item>

      <label htmlFor="show-column-checkboxes">
        {en ? "Show Columns:" : "Afficher les colonnes:"}
      </label>
      <span className="show-column-checkboxes" id="show-column-checkboxes">
        <Checkbox>
          {en ? "Show affiliate Members" : "Afficher les membres affiliés"}
        </Checkbox>
        <Checkbox defaultChecked>
          {en ? "Show  Type" : "afficher le type"}
        </Checkbox>
        <Checkbox defaultChecked>
          {en ? "Show  Author" : "afficher l'auteur"}
        </Checkbox>
      </span>
    </Form>
  );

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
      {record.name === "The Art of War"
        ? en
          ? "Book 1 is a thrilling novel about a group of friends who embark on a dangerous adventure to uncover a hidden treasure."
          : "Livre 1 est un roman palpitant sur un groupe d'amis qui entament une aventure dangereuse pour découvrir un trésor caché."
        : record.name === "To Kill a Mockingbird"
        ? en
          ? "Book 2 is a heartwarming story about a young girl who overcomes obstacles to achieve her dreams."
          : "Livre 2 est une histoire touchante sur une jeune fille qui surmonte des obstacles pour réaliser ses rêves."
        : record.name === "The Human Form: A Study in Sculpture"
        ? en
          ? "Book 3 is a suspenseful mystery novel that keeps readers guessing until the very end."
          : "Livre 3 est un roman mystère palpitant qui tient les lecteurs en haleine jusqu'à la fin."
        : ""}
    </p>
  );

  const Header = () => (
    <>
      <div className="header-title-row">
        <Title level={1}>{en ? "All Products" : "Tous les produits"}</Title>
        <Button type="primary" size="large">
          {en ? "Reset the filter" : "Réinitialiser le filtre"}
        </Button>{" "}
        <Button type="primary" size="large">
          {en ? "Add a new product" : "Ajouter un nouveau produit"}
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
      dataSource={products}
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

export default AllProducts;

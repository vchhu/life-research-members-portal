import Button from "antd/lib/button";
import Table, { ColumnType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import {
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import type { ProductPublicInfo } from "../../services/_types";
import PageRoutes from "../../routing/page-routes";
import AllAuthorTag from "./all-author-tag";
//import type { all_author } from "@prisma/client";
import GetLanguage from "../../utils/front-end/get-product-language";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import SafeLink from "../link/safe-link";
import Router, { useRouter } from "next/router";
import Form from "antd/lib/form";
import blurActiveElement from "../../utils/front-end/blur-active-element";
import { Checkbox } from "antd";
import ProductTitleFilter from "../filters/product-title-filter";
import ProductTypeFilter from "../filters/product-type-filter";
import ProductAuthorFilter from "../filters/product-author-filter";
import type { ParsedUrlQueryInput } from "querystring";
import { AllProductsCtx } from "../../services/context/all-products-ctx";

function getTitle(product: ProductPublicInfo, en: boolean) {
  return en ? product.title_en : product.title_fr;
}

function filterFn(
  m: ProductPublicInfo & { product: string },
  filters: {
    productTitleFilter: Set<number>;
    productAuthorFilter: Set<number>;
    productTypesFilter: Set<number>;
  }
): boolean {
  const { productTitleFilter, productAuthorFilter, productTypesFilter } =
    filters;

  if (productTitleFilter.size > 0 && !productTitleFilter.has(m.id))
    return false;

  /* if (productAuthorFilter.size > 0) {
    if (
      !m.product_member_all_author.some(({ all_author }) =>
        productAuthorFilter.has(all_author.id)
      )
    )
      return false;
  } */

  if (productTypesFilter.size > 0) {
    if (!m.product_type && !productTypesFilter.has(0)) return false; // id 0 is for null
    if (m.product_type && !productTypesFilter.has(m.product_type.id))
      return false;
  }

  return true;
}

// Use query params for filters - for bookmarking, back button etc.
export const queryKeys = {
  showType: "showType",
  //showAuthor: "showAuthor",
  showAllAuthor: "showAllAuthor",
  showDoi: "showDoi",
  productTitle: "productTitle",
  productAuthor: "productAuthor",
  productTypes: "productTypes",
} as const;

// Don't want to change url if query is default value
const defaultQueries = {
  showDoi: true,
  showType: true,
  //showAuthor: false,
  showAllAuthor: true,
} as const;

function handleShowDoiChange(value: boolean) {
  const query: ParsedUrlQueryInput = {
    ...Router.query,
    [queryKeys.showDoi]: value,
  };
  if (value === defaultQueries.showDoi) delete query[queryKeys.showDoi];
  Router.push({ query }, undefined, { scroll: false });
}

/* function handleShowAuthorChange(value: boolean) {
  const query: ParsedUrlQueryInput = {
    ...Router.query,
    [queryKeys.showAuthor]: value,
  };
  if (value === defaultQueries.showAuthor) delete query[queryKeys.showAuthor];
  Router.push({ query }, undefined, { scroll: false });
} */

function handleShowAllAuthorChange(value: boolean) {
  const query: ParsedUrlQueryInput = {
    ...Router.query,
    [queryKeys.showAllAuthor]: value,
  };
  if (value === defaultQueries.showAllAuthor)
    delete query[queryKeys.showAllAuthor];
  Router.push({ query }, undefined, { scroll: false });
}

function handleShowTypeChange(value: boolean) {
  const query: ParsedUrlQueryInput = {
    ...Router.query,
    [queryKeys.showType]: value,
  };
  if (value === defaultQueries.showType) delete query[queryKeys.showType];
  Router.push({ query }, undefined, { scroll: false });
}

function handleProductTitleFilterChange(next: Set<number>) {
  Router.push(
    {
      query: {
        ...Router.query,
        [queryKeys.productTitle]: Array.from(next.keys()),
      },
    },
    undefined,
    { scroll: false }
  );
}

function handleProductAuthorFilterChange(next: Set<number>) {
  Router.push(
    {
      query: {
        ...Router.query,
        [queryKeys.productAuthor]: Array.from(next.keys()),
      },
    },
    undefined,
    { scroll: false }
  );
}

function handleProductTypeFilterChange(next: Set<number>) {
  Router.push(
    {
      query: {
        ...Router.query,
        [queryKeys.productTypes]: Array.from(next.keys()),
      },
    },
    undefined,
    { scroll: false }
  );
}

function clearQueries() {
  Router.push({ query: null }, undefined, { scroll: false });
}

function getIdsFromQueryParams(key: string): Set<number> {
  const res = new Set<number>();
  const query = Router.query[key];
  if (!query) return res;
  if (typeof query === "string") {
    const id = parseInt(query);
    if (!isNaN(id)) res.add(id);
  } else {
    for (const keyword of query) {
      const id = parseInt(keyword);
      if (!isNaN(id)) res.add(id);
    }
  }
  return res;
}

function getPopupContainer(): HTMLElement {
  return (
    document.querySelector(".all-products-table .filters") || document.body
  );
}

const AllProducts: FC = () => {
  const { en } = useContext(LanguageCtx);
  const {
    allProducts,
    loading,
    refresh: refreshProducts,
  } = useContext(AllProductsCtx);

  useEffect(() => {
    refreshProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [showDoi, setShowDoi] = useState<boolean>(defaultQueries.showDoi);
  const [showType, setShowType] = useState<boolean>(defaultQueries.showType);
  /*  const [showAuthor, setShowAuthor] = useState<boolean>(
    defaultQueries.showAuthor
  ); */
  const [showAllAuthor, setShowAllAuthor] = useState<boolean>(
    defaultQueries.showAllAuthor
  );

  const [productTitleFilter, setProductTitleFilter] = useState(
    new Set<number>()
  );
  const [productAuthorFilter, setProductAuthorFilter] = useState(
    new Set<number>()
  );
  const [productTypesFilter, setProductTypesFilter] = useState(
    new Set<number>()
  );

  const router = useRouter();

  const showTypeQuery = router.query[queryKeys.showType];
  //const showAuthorQuery = router.query[queryKeys.showAuthor];
  const showAllAuthorQuery = router.query[queryKeys.showAllAuthor];
  const showDoiQuery = router.query[queryKeys.showDoi];
  const productTitleQuery = router.query[queryKeys.productTitle];
  const productAuthorQuery = router.query[queryKeys.productAuthor];
  const productTypesQuery = router.query[queryKeys.productTypes];

  useEffect(() => {
    if (!showTypeQuery) setShowType(defaultQueries.showType);
    if (showTypeQuery === "true") setShowType(true);
    if (showTypeQuery === "false") setShowType(false);
  }, [showTypeQuery]);

  useEffect(() => {
    if (!showDoiQuery) setShowDoi(defaultQueries.showDoi);
    if (showDoiQuery === "true") setShowDoi(true);
    if (showDoiQuery === "false") setShowDoi(false);
  }, [showDoiQuery]);

  /*   useEffect(() => {
    if (!showAuthorQuery) setShowAuthor(defaultQueries.showAuthor);
    if (showAuthorQuery === "true") setShowAuthor(true);
    if (showAuthorQuery === "false") setShowAuthor(false);
  }, [showAuthorQuery]); */

  useEffect(() => {
    if (!showAllAuthorQuery) setShowAllAuthor(defaultQueries.showAllAuthor);
    if (showAllAuthorQuery === "true") setShowAllAuthor(true);
    if (showAllAuthorQuery === "false") setShowAllAuthor(false);
  }, [showAllAuthorQuery]);

  useEffect(() => {
    setProductTitleFilter(getIdsFromQueryParams(queryKeys.productTitle));
  }, [productTitleQuery]);

  useEffect(() => {
    setProductAuthorFilter(getIdsFromQueryParams(queryKeys.productAuthor));
  }, [productAuthorQuery]);

  useEffect(() => {
    setProductTypesFilter(getIdsFromQueryParams(queryKeys.productTypes));
  }, [productTypesQuery]);

  function refreshAndClearFilters() {
    clearQueries();
    refreshProducts();
  }

  /*   const addAllAuthor = useCallback(
    (k: all_author) => {
      handleProductAuthorFilterChange(new Set(productAuthorFilter).add(k.id));
    },
    [productAuthorFilter]
  ); */

  const filteredProducts = useMemo(
    () =>
      allProducts
        .map((m) => ({ ...m, key: m.id, product: getTitle(m, en) }))
        .filter((m) =>
          filterFn(m, {
            productTitleFilter,
            productAuthorFilter,
            productTypesFilter,
          })
        ),
    [
      allProducts,
      productTitleFilter,
      productAuthorFilter,
      productTypesFilter,
      en,
    ]
  );

  type ProductColumnType = ColumnType<typeof filteredProducts[number]>;

  const nameColumn: ProductColumnType = useMemo(
    () => ({
      title: en ? "Title" : "Titre",
      dataIndex: "product",
      className: "title-column",
      //sorter: nameSorter,
      render: (value, product) => (
        <SafeLink href={PageRoutes.productProfile(product.id)}>
          {value}
        </SafeLink>
      ),
    }),
    [en]
  );

  const doiColumn: ProductColumnType = useMemo(
    () => ({
      title: en ? "DOI" : "DOI",
      dataIndex: "doi",
      className: "name-column",
      render: (doi: string) => (
        <SafeLink href={`https://doi.org/${doi}`} external>
          {doi}
        </SafeLink>
      ),
    }),
    [en]
  );

  /* const productAuthorColumn: ProductColumnType = useMemo(
    () => ({
      title: en ? "Author" : "Auteur",
      dataIndex: ["product_member_all_author"],
      className: "author-column",
      render: (_, product) =>
        product.product_member_all_author.map((k) => (
          <AllAuthorTag
            key={k.all_author.id}
            all_author={k.all_author}
            onClick={addAllAuthor}
          />
        )),
    }),
    [addAllAuthor, en]
  ); */

  const productAllAuthorColumn: ProductColumnType = useMemo(
    () => ({
      title: en ? "All Authors" : "Tous les auteurs",
      dataIndex: "all_author",
      className: "name-column",
      render: (all_author: string) => <span>{all_author}</span>,
    }),
    [en]
  );

  const productTypeColumn: ProductColumnType = useMemo(
    () => ({
      title: en ? "Product Type" : "Type de produit",
      dataIndex: ["product_type", en ? "name_en" : "name_fr"],
      className: "type-column",
      sorter: en
        ? (a, b) =>
            (a.product_type?.name_en || "").localeCompare(
              b.product_type?.name_en || ""
            )
        : (a, b) =>
            (a.product_type?.name_fr || "").localeCompare(
              b.product_type?.name_fr || ""
            ),
    }),
    [en]
  );

  const columns: ProductColumnType[] = [nameColumn];
  if (showDoi) columns.push(doiColumn);
  if (showType) columns.push(productTypeColumn);
  //if (showAuthor) columns.push(productAuthorColumn);
  if (showAllAuthor) columns.push(productAllAuthorColumn);

  const filters = (
    <Form
      onFinish={blurActiveElement}
      className="filters"
      labelAlign="left"
      size="small"
    >
      <Form.Item
        label={en ? "Filter by title" : "Filtrer par titre"}
        htmlFor="title-filter"
      >
        <ProductTitleFilter
          id="title-filter"
          value={productTitleFilter}
          onChange={handleProductTitleFilterChange}
          getPopupContainer={getPopupContainer}
        />
      </Form.Item>
      <Form.Item
        label={en ? "Filter by Author" : "Filtrer par Auteur"}
        htmlFor="author-filter"
      >
        <ProductAuthorFilter
          id="author-filter"
          value={productAuthorFilter}
          onChange={handleProductAuthorFilterChange}
          getPopupContainer={getPopupContainer}
        />
      </Form.Item>
      <Form.Item
        label={en ? "Filter by type" : "Filtrer par type"}
        htmlFor="product-type-filter"
      >
        <ProductTypeFilter
          id="product-type-filter"
          value={productTypesFilter}
          onChange={handleProductTypeFilterChange}
          getPopupContainer={getPopupContainer}
        />
      </Form.Item>

      <label htmlFor="show-column-checkboxes">
        {en ? "Show Columns:" : "Afficher les colonnes:"}
      </label>
      <span className="show-column-checkboxes" id="show-column-checkboxes">
        <Checkbox
          checked={showDoi}
          onChange={(e) => handleShowDoiChange(e.target.checked)}
        >
          {en ? "Show Product DOI" : "Afficher le DOI"}
        </Checkbox>

        <Checkbox
          checked={showType}
          onChange={(e) => handleShowTypeChange(e.target.checked)}
        >
          {en ? "Show Product Type" : "Afficher le type de produit"}
        </Checkbox>
        {/*   <Checkbox
          checked={showAuthor}
          onChange={(e) => handleShowAuthorChange(e.target.checked)}
        >
          {en ? "Show Authors" : "Afficher les auteurs"}
        </Checkbox> */}

        <Checkbox
          checked={showAllAuthor}
          onChange={(e) => handleShowAllAuthorChange(e.target.checked)}
        >
          {en ? "Show all Authors" : "Afficher tous les auteurs"}
        </Checkbox>
      </span>
    </Form>
  );

  const Header = () => (
    <>
      <div className="header-title-row">
        <Title level={1}>{en ? "All Products" : "Tous les produits"}</Title>
        <Button type="primary" onClick={refreshAndClearFilters} size="large">
          {en ? "Reset" : "Réinitialiser"}
        </Button>
      </div>
      {filters}
    </>
  );

  const expandedRowRender = (product: ProductPublicInfo) => (
    <Descriptions size="small" layout="vertical" className="problems-container">
      <Item label={en ? "Abstract" : "Résumé"}>{product.note}</Item>
    </Descriptions>
  );

  return (
    <Table
      className="all-members-table"
      size="small"
      tableLayout="auto"
      columns={columns}
      dataSource={filteredProducts}
      loading={loading}
      title={Header}
      pagination={false}
      showSorterTooltip={false}
      sticky={{ offsetHeader: 74 }}
      scroll={{ x: true }}
      rowClassName={(_, index) =>
        "table-row " + (index % 2 === 0 ? "even" : "odd")
      }
      expandable={{
        expandedRowRender,
        expandedRowClassName: (_, index) =>
          "expanded-table-row " + (index % 2 === 0 ? "even" : "odd"),
        rowExpandable: (m) => !!m.note && m.note.length > 0,
      }}
    />
  );
};

export default AllProducts;

import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { ProductPublicInfo } from "../../services/_types";
import GetLanguage from "../../utils/front-end/get-language";
import React from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import Tag from "antd/lib/tag";
import SafeLink from "../link/safe-link";
import ProductTypeLink from "../link/product-type-link";

const { useBreakpoint } = Grid;

type Props = {
  product: ProductPublicInfo;
};

const PublicProductDescription: FC<Props> = ({ product }) => {
  const screens = useBreakpoint();
  const { en } = useContext(LanguageCtx);

  return (
    <Descriptions
      size="small"
      bordered
      column={1}
      labelStyle={{ whiteSpace: "nowrap", width: 0 }}
      layout={screens.xs ? "vertical" : "horizontal"}
    >
      <Item
        label={en ? "Abstract" : "Résumé"}
        style={{ whiteSpace: "break-spaces" }}
      >
        {en ? product.note : product.note}
      </Item>

      <Item label={en ? "Product Type" : "Type de Produit"}>
        <ProductTypeLink product_type={product.product_type} />
      </Item>

      <Item label={en ? "DOI" : "DOI"}>
        <SafeLink href={`https://doi.org/${product.doi}`} external>
          {product.doi}
        </SafeLink>
      </Item>

      <Item label={en ? "Product Partnership" : "Partenariat du Produit"}>
        {product.product_partnership.map((entry, i) => (
          <Tag key={i} color="blue">
            {en ? entry.organization.name_en : entry.organization.name_fr}
          </Tag>
        ))}
      </Item>

      <Item label={en ? "Product Target" : "Cible du Produit"}>
        {product.product_target.map((entry, i) => (
          <Tag key={i} color="blue">
            {en ? entry.target.name_en : entry.target.name_fr}
          </Tag>
        ))}
      </Item>

      <Item label={en ? "Authors" : "Auteurs"}>{product.all_author}</Item>

      {/* <Item label={en ? "All Authors" : "Tous les auteurs"}>
        {product.product_member_all_author.map((entry, i) => (
          <AllAuthorTag key={i} all_author={entry.all_author} />
        ))}
      </Item> */}
    </Descriptions>
  );
};

export default PublicProductDescription;

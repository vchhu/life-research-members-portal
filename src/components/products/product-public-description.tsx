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
import type { PublicMemberRes } from "../../pages/api/member/[id]/public";
import PageRoutes from "../../routing/page-routes";
import colorFromString from "../../utils/front-end/color-from-string";
import { useState, useEffect } from "react";

const { useBreakpoint } = Grid;

type Props = {
  product: ProductPublicInfo;
};

const PublicProductDescription: FC<Props> = ({ product }) => {
  const screens = useBreakpoint();
  const { en } = useContext(LanguageCtx);

  const [members, setAccounts] = useState<PublicMemberRes[]>([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await fetch("../../api/all-members");
      const data = await res.json();
      setAccounts(data);
    };

    fetchAccounts();
  }, []);

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

      <Item label={en ? "Product Type" : "Type de produit"}>
        <ProductTypeLink product_type={product.product_type} />
      </Item>

      <Item label={en ? "Published Date" : "Date de publication"}>
        {product.publish_date
          ? new Date(product.publish_date).toISOString().split("T")[0]
          : ""}
      </Item>

      <Item label={en ? "DOI" : "DOI"}>
        <SafeLink href={`https://doi.org/${product.doi}`} external>
          {product.doi}
        </SafeLink>
      </Item>

      <Item label={en ? "Product Partnership" : "Partenariat du produit"}>
        {product.product_partnership.map((entry, i) => (
          <Tag key={i} color="blue">
            {en ? entry.organization.name_en : entry.organization.name_fr}
          </Tag>
        ))}
      </Item>

      <Item label={en ? "Product Target" : "Cible du produit"}>
        {product.product_target.map((entry, i) => (
          <Tag key={i} color="blue">
            {en ? entry.target.name_en : entry.target.name_fr}
          </Tag>
        ))}
      </Item>

      <Item label={en ? "Authors" : "Auteurs"}>{product.all_author}</Item>

      <Item label={en ? "Member Authors" : "Auteurs membres"}>
        {product.all_author ? (
          product.all_author
            .split(/[,;&]/)
            .map((author) => author.trim())
            .map((author) => {
              const [firstName, lastName] = author.split(" ");
              const foundMember = members.find(
                (member) =>
                  member?.account.first_name === firstName ||
                  member?.account.last_name === lastName ||
                  member?.account.last_name === firstName ||
                  member?.account.first_name === lastName
              );

              return foundMember
                ? {
                    name: `${foundMember.account.first_name} ${foundMember.account.last_name}`,
                    id: foundMember.id,
                  }
                : null;
            })
            .filter((author) => author !== null)
            .map((author) => (
              <SafeLink
                key={author!.id}
                href={PageRoutes.memberProfile(author!.id)}
              >
                <Tag color={colorFromString(author!.name)}>{author!.name}</Tag>
              </SafeLink>
            ))
        ) : (
          <span>{en ? "No authors" : "Pas d'auteurs"}</span>
        )}
      </Item>
    </Descriptions>
  );
};

export default PublicProductDescription;

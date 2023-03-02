import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FC, useContext } from "react";
import type { ProductPrivateInfo } from "../../services/_types";
import React from "react";
import { LanguageCtx } from "../../services/context/language-ctx";

const { useBreakpoint } = Grid;

type Props = {
  product: ProductPrivateInfo;
};

const PrivateProductDescription: FC<Props> = ({ product }) => {
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
      <Item label={en ? "Peer reviewed" : "Évalué par les pairs"}>
        {product.peer_reviewed ? (en ? "Yes" : "Oui") : en ? "No" : "Non"}
      </Item>

      <Item label={en ? "On going " : "En cours"}>
        {product.on_going ? (en ? "Yes" : "Oui") : en ? "No" : "Non"}
      </Item>
    </Descriptions>
  );
};

export default PrivateProductDescription;

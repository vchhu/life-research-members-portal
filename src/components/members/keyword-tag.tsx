import type { keyword } from "@prisma/client";
import Tag from "antd/lib/tag";
import type { FC } from "react";
import colorFromString from "../../utils/front-end/color-from-string";
import GetLanguage from "../../utils/front-end/get-language";

const KeywordTag: FC<{ keyword: keyword }> = ({ keyword: k }) => {
  return (
    <Tag className="keyword-tag" color={colorFromString((k.name_en || "") + (k.name_fr + ""))}>
      <GetLanguage obj={k} />
    </Tag>
  );
};

export default KeywordTag;

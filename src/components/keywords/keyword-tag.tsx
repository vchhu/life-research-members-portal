import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import type { keyword } from "@prisma/client";
import Tag from "antd/lib/tag";
import type { FC } from "react";
import colorFromString from "../../utils/front-end/color-from-string";
import GetLanguage from "../../utils/front-end/get-language";

type Props = {
  keyword: keyword;
  onClick?: () => void;
  editable?: boolean;
  deletable?: boolean;
  onDelete?: (id: number) => void;
};
const KeywordTag: FC<Props> = ({
  keyword: k,
  onClick = () => {},
  editable = false,
  deletable = false,
  onDelete = () => {},
}) => {
  return (
    <Tag
      className="keyword-tag"
      color={colorFromString((k.name_en || "") + (k.name_fr + ""))}
      onClick={onClick}
      closable={deletable}
      closeIcon={<CloseOutlined onClick={() => onDelete(k.id)} />}
      icon={
        editable ? <EditOutlined onClick={() => console.warn("IMPLEMENT EDIT KEYWORD")} /> : null
      }
    >
      <GetLanguage obj={k} />
    </Tag>
  );
};

export default KeywordTag;

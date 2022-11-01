import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import type { keyword } from "@prisma/client";
import Tag from "antd/lib/tag";
import { CSSProperties, FC, useState } from "react";
import colorFromString from "../../utils/front-end/color-from-string";
import GetLanguage from "../../utils/front-end/get-language";
import GetOppositeLanguage from "../../utils/front-end/get-opposite-language";
import EditKeywordModal from "./edit-keyword-modal";

type Props = {
  keyword: keyword;
  onClick?: () => void;
  editable?: boolean;
  deletable?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (keyword: keyword) => void;
  oppositeLanguage?: boolean;
  style?: CSSProperties;
};
const KeywordTag: FC<Props> = ({
  keyword: k,
  onClick = () => {},
  editable = false,
  deletable = false,
  onDelete = () => {},
  onEdit = () => {},
  oppositeLanguage = false,
  style,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  function onEditSuccess(keyword: keyword) {
    setModalOpen(false);
    onEdit(keyword);
  }

  return (
    <>
      <Tag
        className="keyword-tag"
        color={colorFromString((k.name_en || "") + (k.name_fr || ""))}
        onClick={editable ? () => setModalOpen(true) : onClick}
        closable={deletable}
        closeIcon={<CloseOutlined onClick={() => onDelete(k.id)} />}
        icon={editable ? <EditOutlined /> : null}
        style={style}
      >
        {oppositeLanguage ? <GetOppositeLanguage obj={k} /> : <GetLanguage obj={k} />}
      </Tag>
      {editable ? (
        <EditKeywordModal
          open={modalOpen}
          keyword={k}
          onSuccess={onEditSuccess}
          onCancel={() => setModalOpen(false)}
        />
      ) : null}
    </>
  );
};

export default KeywordTag;

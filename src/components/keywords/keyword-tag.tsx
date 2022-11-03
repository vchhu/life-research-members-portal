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
  /** If editable, provide all keywords to check for duplicates */
  editProps?: { editable: true; allKeywords: keyword[] } | { editable: false };
  deletable?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (keyword: keyword) => void;
  oppositeLanguage?: boolean;
  style?: CSSProperties;
};

const KeywordTag: FC<Props> = ({
  keyword: k,
  onClick = () => {},
  editProps = { editable: false },
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
        onClick={editProps.editable ? () => setModalOpen(true) : onClick}
        closable={deletable}
        closeIcon={<CloseOutlined onClick={() => onDelete(k.id)} />}
        icon={editProps.editable ? <EditOutlined /> : null}
        style={style}
      >
        {oppositeLanguage ? <GetOppositeLanguage obj={k} /> : <GetLanguage obj={k} />}
      </Tag>
      {editProps.editable ? (
        <EditKeywordModal
          open={modalOpen}
          keyword={k}
          allKeywords={editProps.allKeywords}
          onSuccess={onEditSuccess}
          onCancel={() => setModalOpen(false)}
        />
      ) : null}
    </>
  );
};

export default KeywordTag;

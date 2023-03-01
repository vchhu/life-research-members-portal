import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import type { all_author } from "@prisma/client";
import Tag from "antd/lib/tag";
import { CSSProperties, FC, useState } from "react";
import PageRoutes from "../../routing/page-routes";
import colorFromString from "../../utils/front-end/color-from-string";
import GetLanguage from "../../utils/front-end/get-language";
import GetOppositeLanguage from "../../utils/front-end/get-opposite-language";
import SafeLink from "../link/safe-link";
import { queryKeys } from "./all-products";
//import EditKeywordModal from "./edit-keyword-modal";

type Props = {
  all_author: all_author;
  linked?: boolean;
  editable?: boolean;
  deletable?: boolean;
  onClick?: (k: all_author) => void;
  onDelete?: (id: number) => void;
  onEdit?: (keyword: all_author) => void;
  oppositeLanguage?: boolean;
  style?: CSSProperties;
};

const AllAuthorTag: FC<Props> = ({
  all_author: k,
  linked = false,
  editable = false,
  deletable = false,
  onClick,
  onDelete = () => {},
  onEdit = () => {},
  oppositeLanguage = false,
  style,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const classList = ["allauthor-tag"];
  if (linked || editable || onClick) classList.push("cursor-pointer");

  function onEditSuccess(all_author: all_author) {
    setModalOpen(false);
    onEdit(all_author);
  }

  const text = k.first_name + " " + k.last_name;
  const content = linked ? (
    <SafeLink
      href={{
        pathname: PageRoutes.allAccounts,
        query: { [queryKeys.showAuthor]: k.id },
      }}
    >
      {text}
    </SafeLink>
  ) : (
    text
  );

  const closeIcon = (
    <CloseOutlined
      // This is to stop dropdowns from toggling on close
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );

  return (
    <>
      <Tag
        className={classList.join(" ")}
        color={colorFromString((k.first_name || "") + (k.last_name || ""))}
        onClick={editable ? () => setModalOpen(true) : () => onClick?.(k)}
        closable={deletable}
        onClose={() => onDelete(k.id)}
        closeIcon={closeIcon}
        icon={editable ? <EditOutlined /> : null}
        style={style}
      >
        {content}
      </Tag>
      {/*   {editable ? (
        <EditKeywordModal
          open={modalOpen}
          keyword={k}
          onSuccess={onEditSuccess}
          onCancel={() => setModalOpen(false)}
        />
      ) : null} */}
    </>
  );
};

export default AllAuthorTag;

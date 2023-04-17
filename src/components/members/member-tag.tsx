import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import EditOutlined from "@ant-design/icons/lib/icons/EditOutlined";
import type { MemberPublicInfo } from "../../services/_types";
import Tag from "antd/lib/tag";
import type { CSSProperties, FC } from "react";
import colorFromString from "../../utils/front-end/color-from-string";
import SafeLink from "../link/safe-link";
import PageRoutes from "../../routing/page-routes";
import { LanguageCtx } from "../../services/context/language-ctx";


type Props = {
  member: MemberPublicInfo;
  linked?: boolean;
  editable?: boolean;
  deletable?: boolean;
  onClick?: (m: MemberPublicInfo) => void;
  onDelete?: (id: number) => void;
  onEdit?: (member: MemberPublicInfo) => void;
  style?: CSSProperties;
};

const MemberTag: FC<Props> = ({
  member,
  linked = false,
  editable = false,
  deletable = false,
  onClick,
  onDelete = () => {},
  onEdit = () => {},
  style,
}) => {
  const classList = ["member-tag"];
  if (linked || editable || onClick) classList.push("cursor-pointer");

  const fullName = member.account
    ? `${member.account.first_name} ${member.account.last_name}`
    : (en ? "Unknown" : "Inconnu");
  const content = linked ? (
    <SafeLink href={PageRoutes.memberProfile(member.id)}>{fullName}</SafeLink>
  ) : (
    fullName
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
    <Tag
      className={classList.join(" ")}
      color={colorFromString(fullName)}
      closable={deletable}
      onClose={() => onDelete(member.id)}
      closeIcon={closeIcon}
      icon={editable ? <EditOutlined /> : null}
      style={style}
    >
      {content}
    </Tag>
  );
};

export default MemberTag;

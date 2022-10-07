import { FunctionComponent } from "react";
import { all_member_info } from "../../prisma/types";

type Props = {
  editable: boolean;
  member: all_member_info;
};

const MemberInfo: FunctionComponent<Props> = ({ editable, member }) => {
  return <pre>{JSON.stringify(member, null, 2)}</pre>;
};

export default MemberInfo;

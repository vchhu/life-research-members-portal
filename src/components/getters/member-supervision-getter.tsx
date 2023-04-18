import React, { useContext } from "react";
import { LanguageCtx } from "../../services/context/language-ctx";
import PageRoutes from "../../routing/page-routes";
import SafeLink from "../link/safe-link";
import Tag from "antd/lib/tag";
import colorFromString from "../../utils/front-end/color-from-string";

const getMemberSupervision = (
  supervision_principal_supervisor: Array<{
    supervision: {
      id: number;
      last_name: string;
      first_name: string;
    };
  }>
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { en } = useContext(LanguageCtx);

  const supervisionNames = supervision_principal_supervisor.map(
    (member_supervision, i) => {
      const supervision = member_supervision.supervision;
      const name = `${supervision.first_name} ${supervision.last_name}`;

      return (
        <SafeLink
          key={supervision.id}
          href={PageRoutes.supervisionProfile(supervision.id)}
        >
          <Tag color={colorFromString(name)}>{name}</Tag>
        </SafeLink>
      );
    }
  );
  return <>{supervisionNames}</>;
};

export default getMemberSupervision;

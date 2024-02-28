// components/InstituteGuard.tsx
import type { FC, ReactNode } from "react";
import { useRouter } from "next/router";
import { useSelectedInstitute } from "../services/context/selected-institute-ctx";
import { Spin } from "antd";
import { MemberInstituteCtx } from "../services/context/member-institutes-ctx";

interface InstituteGuardProps {
  children: ReactNode;
}

const InstituteGuard: FC<InstituteGuardProps> = ({ children }) => {
  const { institute } = useSelectedInstitute();

  if (institute === null) {
    return <Spin />;
  }

  return <>{children}</>;
};

export default InstituteGuard;

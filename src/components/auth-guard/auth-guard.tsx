import Spin from "antd/lib/spin";
import { useRouter } from "next/router";
import { FunctionComponent, PropsWithChildren, useContext, useEffect, useState } from "react";
import { AccountCtx } from "../../context/account-ctx";
import CenteredSpinner from "../centered-spinner";
import Authorizations from "./authorizations";

type Props = {
  auths: Authorizations[];
  id?: number;
};

const AuthGuard: FunctionComponent<PropsWithChildren<Props>> = ({ auths, id, children }) => {
  const { localAccount, loading } = useContext(AccountCtx);
  if (loading) return <CenteredSpinner />;
  if (auths.includes(Authorizations.admin) && localAccount?.is_admin) return <>{children}</>;
  if (auths.includes(Authorizations.registered) && localAccount) return <>{children}</>;
  if (auths.includes(Authorizations.matchId) && localAccount?.id === id) return <>{children}</>;
  return <h1 style={{ textAlign: "center" }}>You are not authorized to view this page.</h1>;
};

export default AuthGuard;

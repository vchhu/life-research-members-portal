import { FunctionComponent, PropsWithChildren, ReactElement, useContext } from "react";
import { AccountCtx } from "../../context/account-ctx";
import CenteredSpinner from "../loading/centered-spinner";
import Authorizations from "./authorizations";

type Props = {
  auths: Authorizations[];
  id?: number;
  loadingIcon?: ReactElement | null;
};

const AuthGuard: FunctionComponent<PropsWithChildren<Props>> = ({
  auths,
  id,
  loadingIcon,
  children,
}) => {
  if (!loadingIcon) loadingIcon = null;
  const { localAccount, loading } = useContext(AccountCtx);
  if (loading) return loadingIcon;
  if (!localAccount) return null;
  if (auths.includes(Authorizations.registered)) return <>{children}</>;
  if (auths.includes(Authorizations.admin) && localAccount.is_admin) return <>{children}</>;
  if (auths.includes(Authorizations.matchId) && localAccount.id === id) return <>{children}</>;
  return null;
};

export default AuthGuard;

import { FC, PropsWithChildren, ReactElement, useContext } from "react";
import { AccountCtx } from "../../api-facade/context/account-ctx";
import CenteredSpinner from "../loading/centered-spinner";
import Authorizations from "./authorizations";

type Props = {
  auths: Authorizations[];
  id?: number;
  loadingIcon?: ReactElement;
};

const notAuthorized = (
  <h1 style={{ textAlign: "center" }}>You are not authorized to view this page.</h1>
);

const PageAuthGuard: FC<PropsWithChildren<Props>> = ({ auths, id, loadingIcon, children }) => {
  if (!loadingIcon) loadingIcon = <CenteredSpinner />;
  const { localAccount, loading } = useContext(AccountCtx);
  if (loading) return loadingIcon;
  if (!localAccount) return notAuthorized;
  if (auths.includes(Authorizations.registered)) return <>{children}</>;
  if (auths.includes(Authorizations.admin) && localAccount.is_admin) return <>{children}</>;
  if (auths.includes(Authorizations.matchId) && localAccount.id === id) return <>{children}</>;
  return notAuthorized;
};

export default PageAuthGuard;

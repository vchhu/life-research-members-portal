import { useRouter } from "next/router";
import type { NextPage } from "next/types";
import { useContext, useEffect } from "react";
import { ActiveAccountCtx } from "../../../services/context/active-account-ctx";
import CardSkeleton from "../../../components/loading/card-skeleton";
import PageRoutes from "../../../routing/page-routes";
import { useAdminDetails } from "../../../services/context/selected-institute-ctx";

const PrivateSupervisionPage: NextPage = () => {
  const router = useRouter();
  const { localAccount, loading } = useContext(ActiveAccountCtx);
  const isAdmin = useAdminDetails();
  const { id: idString } = router.query;

  useEffect(() => {
    if (!(typeof idString === "string")) {
      return;
    }
    if (loading) return;

    const id = parseInt(idString);

    if (isAdmin) {
      router.replace(PageRoutes.privateSupervisionProfile(id));
      return;
    }

    if (localAccount?.member) {
      router.replace(PageRoutes.privateSupervisionProfile(id));

      return;
    }
  }, [localAccount, loading, idString, router]);

  return <CardSkeleton />;
};

export default PrivateSupervisionPage;

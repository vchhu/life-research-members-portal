import type { FC, PropsWithChildren } from "react";
import { ActiveAccountCtxProvider } from "./active-account-ctx";
import { AllAccountsCtxProvider } from "./all-accounts-ctx";
import { AllKeywordsCtxProvider } from "./all-keywords-ctx";
import { AllTargetsCtxProvider } from "./all-targets-ctx";
import { AllOrganizationsCtxProvider } from "./all-organizations-ctx";
import { AllTopicsCtxProvider } from "./all-topics-ctx";
import { AllMembersCtxProvider } from "./all-members-ctx";
import { AllPartnersCtxProvider } from "./all-partners-ctx";
import { FacultiesCtxProvider } from "./faculties-ctx";
import { LanguageCtxProvider } from "./language-ctx";
import { MemberTypesCtxProvider } from "./member-types-ctx";
import { SaveChangesCtxProvider } from "./save-changes-ctx";
import { OrgScopeCtxProvider } from "./org-scopes-ctx";
import { OrgTypesCtxProvider } from "./org-types-ctx";
import { ProductTitlesCtxProvider } from "./products-title-ctx";
import { ProductTypesCtxProvider } from "./products-types-ctx";
import { AllProductsCtxProvider } from "./all-products-ctx";
import { AllGrantsCtxProvider } from "./all-grants-ctx";
import { GrantSourcesCtxProvider } from "./grant-sources-ctx";
import { GrantStatusCtxProvider } from "./grant-statuses-ctx";
import { AllEventsCtxProvider } from "./all-events-ctx";
import { EventTypesCtxProvider } from "./event-types-ctx";
import { AllSupervisionsCtxProvider } from "./all-supervisions-ctx";
import { LevelsCtxProvider } from "./levels-ctx";

// Bundles context providers, first element in array is the outer-most provider
const AllContextProviders: FC<PropsWithChildren> = [
  ActiveAccountCtxProvider,
  LanguageCtxProvider,
  MemberTypesCtxProvider,
  FacultiesCtxProvider,
  SaveChangesCtxProvider,
  AllKeywordsCtxProvider,
  AllTargetsCtxProvider,
  AllTopicsCtxProvider,
  AllOrganizationsCtxProvider,
  AllAccountsCtxProvider,
  AllMembersCtxProvider,
  AllPartnersCtxProvider,
  OrgTypesCtxProvider,
  OrgScopeCtxProvider,
  ProductTypesCtxProvider,
  ProductTitlesCtxProvider,
  AllProductsCtxProvider,
  GrantSourcesCtxProvider,
  AllGrantsCtxProvider,
  GrantStatusCtxProvider,
  AllEventsCtxProvider,
  EventTypesCtxProvider,
  AllSupervisionsCtxProvider,
  LevelsCtxProvider,
].reduceRight((Accumulator, Parent) => {
  const Provider: FC<PropsWithChildren> = ({ children }) => (
    <Parent>
      <Accumulator>{children}</Accumulator>
    </Parent>
  );
  return Provider;
});

export default AllContextProviders;

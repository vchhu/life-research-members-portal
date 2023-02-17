import type { FC, PropsWithChildren } from "react";
import { ActiveAccountCtxProvider } from "./active-account-ctx";
import { AllAccountsCtxProvider } from "./all-accounts-ctx";
import { AllKeywordsCtxProvider } from "./all-keywords-ctx";
import { AllMembersCtxProvider } from "./all-members-ctx";
import { AllPartnersCtxProvider } from "./all-partners-ctx";
import { FacultiesCtxProvider } from "./faculties-ctx";
import { LanguageCtxProvider } from "./language-ctx";
import { MemberTypesCtxProvider } from "./member-types-ctx";
import { SaveChangesCtxProvider } from "./save-changes-ctx";
import { OrgScopeCtxProvider } from "./org-scopes-ctx";
import { OrgTypesCtxProvider } from "./org-types-ctx";

// Bundles context providers, first element in array is the outer-most provider
const AllContextProviders: FC<PropsWithChildren> = [
  ActiveAccountCtxProvider,
  LanguageCtxProvider,
  MemberTypesCtxProvider,
  FacultiesCtxProvider,
  SaveChangesCtxProvider,
  AllKeywordsCtxProvider,
  AllAccountsCtxProvider,
  AllMembersCtxProvider,
  AllPartnersCtxProvider,
  OrgTypesCtxProvider,
  OrgScopeCtxProvider,
].reduceRight((Accumulator, Parent) => {
  const Provider: FC<PropsWithChildren> = ({ children }) => (
    <Parent>
      <Accumulator>{children}</Accumulator>
    </Parent>
  );
  return Provider;
});

export default AllContextProviders;

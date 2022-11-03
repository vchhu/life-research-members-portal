import type { FC, PropsWithChildren } from "react";
import { AccountCtxProvider } from "./account-ctx";
import { FacultiesCtxProvider } from "./faculties-ctx";
import { LanguageCtxProvider } from "./language-ctx";
import { MemberTypesCtxProvider } from "./member-types-ctx";

// Bundles context providers, first element in array is the outer-most provider
const AllContextProviders: FC<PropsWithChildren> = [
  AccountCtxProvider,
  LanguageCtxProvider,
  MemberTypesCtxProvider,
  FacultiesCtxProvider,
].reduceRight((Accumulator, Parent) => {
  const Provider: FC<PropsWithChildren> = ({ children }) => (
    <Parent>
      <Accumulator>{children}</Accumulator>
    </Parent>
  );
  return Provider;
});

export default AllContextProviders;

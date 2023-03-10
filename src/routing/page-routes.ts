const PageRoutes = {
  home: "/",
  allMembers: "/members",
  memberProfile: (id: number) => "/members/" + id,
  publicMemberProfile: (id: number) => "/members/" + id + "/public",
  publicPartnerProfile: (id: number) => "/partners/" + id + "/public",
  organizationProfile: (id: number) => "/partners/" + id + "/public",
  privateMemberProfile: (id: number) => "/members/" + id + "/private",
  privateProductProfile: (id: number) => "/products/" + id + "/private",
  productProfile: (id: number) => "/products/" + id + "/public",
  myProfile: "/my-profile",
  allAccounts: "/accounts",
  //partners: "/partners",
  allPartners: "/partners",
  allProducts: "/products",
  products: "/products",
  allGrants: "/grants",
  accountProfile: (id: number) => "/accounts/" + id,
  register: "/register",
  _404: "/404",
} as const;

export default PageRoutes;

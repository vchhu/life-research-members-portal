const PageRoutes = {
  home: "/",
  allMembers: "/members",
  memberProfile: (id: number) => "/members/" + id,
  publicMemberProfile: (id: number) => "/members/" + id + "/public",
  publicPartnerProfile: (id: number) => "/partners/" + id + "/public",
  organizationProfile: (id: number) => "/partners/" + id + "/public",
  privateMemberProfile: (id: number) => "/members/" + id + "/private",
  myProfile: "/my-profile",
  allAccounts: "/accounts",
  //partners: "/partners",
  allPartners: "/partners",
  products: "/products",
  accountProfile: (id: number) => "/accounts/" + id,
  register: "/register",
  _404: "/404",
} as const;

export default PageRoutes;

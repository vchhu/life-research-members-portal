const accounts = "/accounts" as const;
const members = "/members" as const;
const myProfile = "/my-profile" as const;

const PageRoutes = {
  home: "/",
  allMembers: members,
  memberProfile: (id: number) => members + "/" + id,
  myProfile: myProfile,
  allAccounts: accounts,
  accountProfile: (id: number) => accounts + "/" + id,
  register: "/register",
  _404: "/404",
} as const;

export default PageRoutes;

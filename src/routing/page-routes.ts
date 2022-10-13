const accounts = "/accounts" as const;
const members = "/members" as const;
const myProfile = "/my-profile" as const;

const PageRoutes = {
  home: "/",
  allMembers: members,
  memberProfile: (id: number) => members + "/" + id,
  editMember: (id: number) => members + "/" + id + "/edit",
  myProfile: myProfile,
  myProfileEdit: myProfile + "/edit",
  allAccounts: accounts,
  accountProfile: (id: number) => accounts + "/" + id,
  editAccount: (id: number) => accounts + "/" + id + "/edit",
  register: "/register",
  _404: "/404",
} as const;

export default PageRoutes;

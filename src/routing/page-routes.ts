const members = "/members" as const;
const myProfile = "/my-profile" as const;

const PageRoutes = {
  home: "/",
  allMembers: members,
  memberProfile: (id: number) => members + "/" + id,
  editMember: (id: number) => members + "/" + id + "/edit",
  accounts: "/accounts",
  register: "/register",
  viewAccount: "/view-account/",
  editAccount: "/edit-account/",
  viewMember: "/view-member/",
  myProfile: myProfile,
  myProfileEdit: myProfile + "/edit",
  _404: "/404",
} as const;

export default PageRoutes;

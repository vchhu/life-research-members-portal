import Grid from "antd/lib/grid";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import type { FC } from "react";
import type { Member } from "../../api-facade/_types";

const { useBreakpoint } = Grid;

type Props = {
  member: Member;
};

const MemberDescription: FC<Props> = ({ member }) => {
  return null;
  // const screens = useBreakpoint();

  // let address = "";
  // if (member.address) address += member.address;
  // if (member.city) {
  //   if (address) address += ", ";
  //   address += member.city;
  // }
  // if (member.province) {
  //   if (address) address += ", ";
  //   address += member.province;
  // }
  // if (member.country) {
  //   if (address) address += ", ";
  //   address += member.country;
  // }
  // if (member.postal_code) {
  //   if (address) address += ", ";
  //   address += member.postal_code;
  // }

  // let faculty = "";
  // if (member.faculty)
  //   faculty = member.faculty.faculty_name_en + " / " + member.faculty.faculty_name_fr;

  // let category = "";
  // if (member.member_type)
  //   category = member.member_type.category_name_en + " / " + member.member_type.category_name_fr;

  // return (
  //   <Descriptions
  //     size="small"
  //     bordered
  //     column={1}
  //     labelStyle={{ whiteSpace: "nowrap", width: "2rem" }}
  //     layout={screens.xs ? "vertical" : "horizontal"}
  //   >
  //     <Item label="Business Name">{member.business_name}</Item>
  //     <Item label="Email">{member.email}</Item>
  //     <Item label="Mobile Phone">{member.mobile_phone}</Item>
  //     <Item label="Business Phone">{member.business_phone}</Item>
  //     <Item label="Address">{address}</Item>
  //     <Item label="Faculty">{faculty}</Item>
  //     <Item label="Category">{category}</Item>
  //     <Item label="Problems">{member.problems_EN}</Item>
  //     <Item label="How We Can Help">{member.how_can_we_help}</Item>
  //     <Item label="Dream">{member.dream}</Item>
  //     <Item label="Notes">{member.notes}</Item>
  //     <Item label="Keywords">{member.keywords_EN}</Item>
  //   </Descriptions>
  // );
};

export default MemberDescription;

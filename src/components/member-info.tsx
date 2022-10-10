import Grid from "antd/lib/grid";
import Button from "antd/lib/button";
import Card from "antd/lib/card";
import Descriptions from "antd/lib/descriptions";
import Item from "antd/lib/descriptions/Item";
import { FunctionComponent } from "react";
import { all_member_info } from "../../prisma/types";
import MemberInfoSkeleton from "./loading/member-info-skeleton";
import Title from "antd/lib/typography/Title";

const { useBreakpoint } = Grid;

type Props = {
  editable: boolean;
  member: all_member_info;
};

const MemberInfo: FunctionComponent<Props> = ({ editable, member }) => {
  const screens = useBreakpoint();

  if (!member) return <MemberInfoSkeleton />;

  let titleText = "";
  if (!member.first_name || !member.last_name) titleText = "Member " + member.id;
  else titleText = (member.first_name || "") + " " + (member.last_name || "");

  let address = "";
  if (member.address) address += member.address;
  if (member.city) {
    if (address) address += ", ";
    address += member.city;
  }
  if (member.province) {
    if (address) address += ", ";
    address += member.province;
  }
  if (member.country) {
    if (address) address += ", ";
    address += member.country;
  }
  if (member.postal_code) {
    if (address) address += ", ";
    address += member.postal_code;
  }

  let faculty = "";
  if (member.faculty_id)
    faculty = member.types_faculty?.faculty_name_en + " / " + member.types_faculty?.faculty_name_fr;

  let category = "";
  if (member.category_id)
    category =
      member.types_member_category?.category_name_en +
      " / " +
      member.types_member_category?.category_name_fr;

  const editButton = () => {
    if (!editable) return null;
    return (
      <Button size="large" type="primary" style={{ flexGrow: 1, maxWidth: "10rem" }}>
        Edit
      </Button>
    );
  };

  const title = (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Title
        level={2}
        style={{
          margin: 0,
          // overflow: "hidden",
          // textOverflow: "ellipsis",
          minWidth: 0,
          marginRight: "auto",
          paddingRight: 16,
          whiteSpace: "break-spaces",
        }}
      >
        {titleText}
      </Title>
      {editButton()}
    </div>
  );

  return (
    <Card title={title} bodyStyle={{ padding: 0 }}>
      <Descriptions
        size="small"
        bordered
        column={1}
        labelStyle={{ whiteSpace: "nowrap" }}
        layout={screens.xs ? "vertical" : "horizontal"}
      >
        <Item label="Business Name">{member.business_name}</Item>
        <Item label="Email">{member.email}</Item>
        <Item label="Mobile Phone">{member.mobile_phone}</Item>
        <Item label="Business Phone">{member.business_phone}</Item>
        <Item label="Address">{address}</Item>
        <Item label="Faculty">{faculty}</Item>
        <Item label="Category">{category}</Item>
        <Item label="Problems">{member.problems_EN}</Item>
        <Item label="How We Can Help">{member.how_can_we_help}</Item>
        <Item label="Dream">{member.dream}</Item>
        <Item label="Notes">{member.notes}</Item>
        <Item label="Keywords (EN)">{member.keywords_EN}</Item>
        <Item label="Keywords (FR)">{member.keywords_FR}</Item>
      </Descriptions>
    </Card>
  );
};

export default MemberInfo;

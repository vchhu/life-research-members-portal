import Button from "antd/lib/button";
import Form from "antd/lib/form";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input";
import { FunctionComponent } from "react";
import { all_member_info } from "../../../prisma/types";
import authHeader from "../../api-facade/headers/auth-header";
import { contentTypeJsonHeader } from "../../api-facade/headers/content-type-headers";
import ApiRoutes from "../../routing/api-routes";
import InputNumber from "antd/lib/input-number";

type Props = {
  member: all_member_info;
};

type Data = Partial<all_member_info>;

const MemberForm: FunctionComponent<Props> = ({ member }) => {
  const [form] = useForm<Data>();

  async function updateMember(data: Data) {
    try {
      const result = await fetch(ApiRoutes.updateMember + member.id, {
        method: "PATCH",
        headers: { ...(await authHeader()), ...contentTypeJsonHeader },
        body: JSON.stringify(data),
      });
      if (!result.ok) {
        const e = await result.text();
        console.error(e);
        alert(e);
        return;
      }
      alert("Success!");
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  return (
    <Form form={form} onFinish={updateMember} initialValues={member}>
      <Form.Item label="First Name" name="first_name">
        <Input />
      </Form.Item>

      <Form.Item label="Last Name" name="last_name">
        <Input />
      </Form.Item>

      <Form.Item label="Business Name" name="business_name">
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="Address" name="address">
        <Input />
      </Form.Item>

      <Form.Item label="City" name="city">
        <Input />
      </Form.Item>

      <Form.Item label="Province" name="province">
        <Input />
      </Form.Item>

      <Form.Item label="Country" name="country">
        <Input />
      </Form.Item>

      <Form.Item label="Postal Code" name="postal_code">
        <Input />
      </Form.Item>

      <Form.Item label="Business Phone" name="business_phone">
        <Input />
      </Form.Item>

      <Form.Item label="Mobile Phone" name="mobile_phone">
        <Input />
      </Form.Item>

      <Form.Item label="Faculty" name="faculty_id">
        <InputNumber />
      </Form.Item>

      <Form.Item label="Category" name="category_id">
        <InputNumber />
      </Form.Item>

      <Form.Item label="Problems" name="problems_EN">
        <Input />
      </Form.Item>

      <Form.Item label="How We Can Help" name="how_can_we_help">
        <Input />
      </Form.Item>

      <Form.Item label="Dream" name="dream">
        <Input />
      </Form.Item>

      <Form.Item label="Notes" name="notes">
        <Input />
      </Form.Item>

      <Form.Item label="Keywords" name="keywords_EN">
        <Input />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ paddingLeft: 40, paddingRight: 40 }}
          size="large"
        >
          Save Changes
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MemberForm;

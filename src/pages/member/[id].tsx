import { main_Members } from "@prisma/client";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { useEffect, useState } from "react";
import ApiRoutes from "../../utils/front-end/api-routes";
import authHeader from "../../utils/front-end/auth-header";

const MemberById: NextPage = () => {
  const [member, setMember] = useState<main_Members | null>(null);
  const router = useRouter();
  const { id } = router.query as { id: string };

  useEffect(() => {
    async function fetchMember(id: string) {
      const member = await fetch(ApiRoutes.member + id, { headers: await authHeader() });
      setMember(await member.json());
    }
    if (id) fetchMember(id).catch((e) => console.error(e));
  }, [id]);

  if (!member) return <div>Loading...</div>;

  return (
    <>
      <h1>{member.first_name + " " + member.last_name}</h1>
      <pre>{JSON.stringify(member, null, 2)}</pre>
    </>
  );
};

export default MemberById;

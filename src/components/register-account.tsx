import { FunctionComponent, useRef } from "react";
import ApiRoutes from "../utils/front-end/api-facade/api-routes";
import authHeader from "../utils/front-end/api-facade/auth-header";
import { contentTypeJsonHeader } from "../utils/front-end/api-facade/content-type-headers";

const RegisterAccount: FunctionComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const getEmail = () => emailRef.current?.value || "";

  async function registerAccount() {
    try {
      const microsoft_email = getEmail();
      const result = await fetch(ApiRoutes.registerAccount, {
        method: "PUT",
        headers: { ...(await authHeader()), ...contentTypeJsonHeader },
        body: JSON.stringify({ microsoft_email }),
      });
      if (!result.ok) {
        const e = await result.text();
        console.error(e);
        alert(e);
        return;
      }
      alert(await result.text());
      if (emailRef.current) emailRef.current.value = "";
    } catch (e: any) {
      console.error(e);
      alert(e);
    }
  }

  return (
    <>
      <h1>Register Account</h1>
      <label>
        Microsoft Email:&nbsp;
        <input type="text" ref={emailRef}></input>
      </label>
      <br />
      <br />
      <button onClick={() => registerAccount()}>Register Account</button>
    </>
  );
};

export default RegisterAccount;

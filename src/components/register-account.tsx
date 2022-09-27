import { FunctionComponent, useRef } from "react";
import ApiRoutes from "../utils/front-end/api-routes";
import authHeader from "../utils/front-end/auth-header";
import { contentTypeJsonHeader } from "../utils/front-end/content-type-headers";

async function registerAccount(email: string) {
  try {
    const result = await fetch(ApiRoutes.registerAccount, {
      method: "PUT",
      headers: { ...(await authHeader()), ...contentTypeJsonHeader },
      body: JSON.stringify({ email }),
    });
    if (!result.ok) return console.error(await result.text());
    console.log(await result.text());
  } catch (e: any) {
    console.error(e);
  }
}

const RegisterAccount: FunctionComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const getEmail = () => emailRef.current?.value || "";

  return (
    <>
      <h1>Register Account</h1>
      <label>
        Email:&nbsp;
        <input type="text" ref={emailRef}></input>
      </label>
      <br />
      <button onClick={() => registerAccount(getEmail())}>Register Account</button>
    </>
  );
};

export default RegisterAccount;

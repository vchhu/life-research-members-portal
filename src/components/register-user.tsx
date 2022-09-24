import { FunctionComponent, useRef } from "react";
import authHeader from "../utils/front-end/auth-header";
import { contentTypeJsonHeader } from "../utils/front-end/content-type-headers";

async function registerUser(email: string) {
  try {
    const result = await fetch("/api/register-user", {
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

const RegisterUser: FunctionComponent = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const getEmail = () => emailRef.current?.value || "";

  return (
    <>
      <h1>Register User</h1>
      <input type="text" ref={emailRef}></input>
      <br />
      <button onClick={() => registerUser(getEmail())}>Register User</button>
    </>
  );
};

export default RegisterUser;

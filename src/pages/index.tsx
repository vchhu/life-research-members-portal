import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const App: NextPage = () => {
  const { instance } = useMsal();
  const name = instance.getActiveAccount()?.name?.split(" ")[0];

  return (
    <div style={{ textAlign: "center", paddingTop: 36 }}>
      <h1>Welcome!</h1>
      <AuthenticatedTemplate>
        <h1>Good to see you {name}!</h1>
      </AuthenticatedTemplate>
    </div>
  );
};

export default App;

import { useMsal } from "@azure/msal-react";
import type { NextPage } from "next";

const App: NextPage = () => {
  const { instance } = useMsal();
  const name = instance.getActiveAccount()?.name?.split(" ")[0];

  return (
    <div style={{ textAlign: "center", paddingTop: 36 }}>
      <h1>Welcome!</h1>
      {name ? <h1>Good to see you {name}!</h1> : ""}
    </div>
  );
};

export default App;

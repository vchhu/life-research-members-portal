import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../../auth-config";
import Head from "next/head";
import Navbar from "../components/navbar/@navbar";
import { AccountCtxProvider } from "../api-facade/account-ctx";
import { useRouter } from "next/router";
import PageRoutes from "../routing/page-routes";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  function getSuffix() {
    const path = router.pathname;
    // Order matters!
    if (path.startsWith(PageRoutes.allAccounts)) return "Accounts";
    if (path.startsWith(PageRoutes.allMembers)) return "Members";
    if (path.startsWith(PageRoutes.register)) return "Register";
    if (path.startsWith(PageRoutes.home)) return "Home";
    return "";
  }
  let suffix = getSuffix();
  let title = "LIFE";
  if (suffix) title += " - " + suffix;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <MsalProvider instance={msalInstance}>
        <AccountCtxProvider>
          <Navbar />
          <div className="next-page-container">
            <Component {...pageProps} />
          </div>
        </AccountCtxProvider>
      </MsalProvider>
    </>
  );
}

export default MyApp;

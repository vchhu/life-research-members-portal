import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../../auth-config";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>WIIM</title>
      </Head>
      <MsalProvider instance={msalInstance}>
        <Component {...pageProps} />
      </MsalProvider>
    </>
  );
}

export default MyApp;

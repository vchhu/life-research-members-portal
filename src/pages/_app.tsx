import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../../auth-config";
import Head from "next/head";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>WIIM</title>
      </Head>
      <MsalProvider instance={msalInstance}>
        <Navbar />
        <Component {...pageProps} />
      </MsalProvider>
    </>
  );
}

export default MyApp;

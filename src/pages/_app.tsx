import "../styles/global.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { Layout } from "../modules/layout/components";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CircularProgress, LinearProgress } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>
        {session ? (
          <Auth>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </ThemeProvider>
    </SessionProvider>
  );
}

function Auth({ children }: any) {
  const router = useRouter();

  const { status } = useSession({
    required: true,
  });

  if (status === "loading") {
    return <LinearProgress color="primary" />;
  }

  return children;
}

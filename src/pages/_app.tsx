import "../styles/global.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { Layout } from "../modules/layout/components";
import { getSession, SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CircularProgress, LinearProgress } from "@mui/material";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { NotifficationProvider } from "../shared/hooks/NotifficationContext";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        {pageProps.session ? (
          <NotifficationProvider>
            <Layout>
              <Auth>
                <Component {...pageProps} />
              </Auth>
            </Layout>
          </NotifficationProvider>
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
    onUnauthenticated() {
      router.push("/api/auth/signin");
    },
  });

  if (status === "loading") {
    return <LinearProgress color="primary" />;
  }

  return children;
}

import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient, Hydrate } from "react-query";
import NextNprogress from "nextjs-progressbar";

import createEmotionCache from "../createEmotionCache";
import { useAppTheme } from "../hooks";
import { Layout } from "../components/layout";
import { AuthGruard } from "../components/auth";
import AuthProvider from "../context/authContext";

declare module "react-query/types/react/QueryClientProvider" {
  interface QueryClientProviderProps {
    children?: React.ReactNode;
  }
  interface HydrateProps {
    children?: React.ReactNode;
  }
}

declare module "react-query/types/react/Hydrate" {
  interface HydrateProps {
    children?: React.ReactNode;
  }
}
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const theme = useAppTheme();
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthProvider>
              <Layout>
                <NextNprogress height={8} color={theme.palette.primary.main} />
                {(Component as any).requireAuth ? (
                  <AuthGruard>
                    <Component {...pageProps} />
                  </AuthGruard>
                ) : (
                  <Component {...pageProps} />
                )}
              </Layout>
            </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;

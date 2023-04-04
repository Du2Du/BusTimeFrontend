import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import { Footer } from "../components";
import { Header } from "../components/header";
import { UserProvider } from "../global-context";
import { routesName } from "../routes-name";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 5 } },
  });

  const isCredential =
    pathname === routesName.LOGIN ||
    pathname === routesName.REGISTER ||
    pathname === "/";
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          {!isCredential ? <Header /> : null}
          <Component {...pageProps} />

          <Footer />
          <Toaster
            toastOptions={{
              style: {
                background: "#7e4ccb",
                color: "#2a292c",
              },
            }}
            position="top-right"
          />
          <Oval
            ariaLabel="loading-indicator"
            wrapperClass="loading"
            height={100}
            width={100}
            strokeWidth={5}
            color="#343434"
            secondaryColor="#7e4ccb"
          />
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;

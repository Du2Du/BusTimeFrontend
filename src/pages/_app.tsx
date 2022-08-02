import type { AppProps } from "next/app";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { Footer } from "../components";
import { UserProvider, useUserContext } from "../global-context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <UserProvider>
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
    </>
  );
}

export default MyApp;

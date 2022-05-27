import type { AppProps } from "next/app";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Footer } from "../components";
import { UserProvider } from "../global-context";
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
      </UserProvider>
    </>
  );
}

export default MyApp;

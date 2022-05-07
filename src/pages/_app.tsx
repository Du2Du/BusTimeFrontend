import type { AppProps } from "next/app";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        toastOptions={{
          style: {
            background: "#7e4ccb",
            color: "#2a292c",
          },
        }}
        position="top-right"
      />
    </>
  );
}

export default MyApp;

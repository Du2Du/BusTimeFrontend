import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script src="bootstrap/dist/js/bootstrap" type="text\javascript"></Script>
      <Toaster position="top-right" />
    </>
  );
}

export default MyApp;

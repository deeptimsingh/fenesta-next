import type { AppProps } from "next/app";
import "@/app/globals.css";
import RightStickyBar from "@/components/base/RightStickyBar";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Page Content */}
      <Component {...pageProps} />

      {/* Right Side Sticky Bar */}
      <RightStickyBar />
    </>
  );
}

import { freezeMainThread } from "@/freezeMainThread";
import { useInpOverlay } from "@/inpOverlay";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {    
  useInpOverlay();
  return <Component {...pageProps} />;
}

// @ts-ignore
globalThis.freezeMainThread = freezeMainThread;

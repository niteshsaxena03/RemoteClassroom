"use client";

import { ImageKitProvider } from "@imagekit/next";


export default function Providers({ children }) {
  const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>{children}</ImageKitProvider>
  );
}

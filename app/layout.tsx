import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./_components/SessionProvider";
import { KAKAO_SDK_URL } from "./_components/kakao-map";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "뻔맵-BbunMap",
  description: "뻔맵-BbunMap for Korea University students",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const mainURL = process.env.NEXT_PUBLIC_MAIN_URL;
  return (
    <html lang="en" className="overflow-scroll scrollbar-hide">
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
      <meta property="og:url" content="https://www.bbunmap.com/home" />
      <meta property="og:title" content="뻔맵-BbunMap" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.bbunmap.com/main.png" />
      <meta
        property="og:description"
        content="뻔맵-BbunMap for Korea University students"
      />

      <link rel="manifest" href="/manifest.json" />
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      </body>
    </html>
  );
}

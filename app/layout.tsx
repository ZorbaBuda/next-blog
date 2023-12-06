import "./globals.module.scss";
import config from "@/data/config.json";
import type { Metadata } from "next";
import { ThemeProviders } from "./theme-providers";
import TwSizeIndicator from "@/components/helpers/TwSizeIndicator";
import { NavMenu } from "@/components/header/NavMenu";
import { getAboutPost } from "@/lib/postsOctokit";
import NavWrapper from "./navWrapper";
import Head from "./head";

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="font-roboto antialiased"
      lang="es"
      suppressHydrationWarning
    >
      <Head />
      <body>
      
        <ThemeProviders>
          <TwSizeIndicator />
          <NavWrapper />
            {/* <NextAuthProvider> */}
          <main className=" bg-white dark:bg-darkmode-bg1 text-black dark:text-white">
            {children}
          </main>
           {/* </NextAuthProvider> */}
        </ThemeProviders>
       
      </body>
    </html>
  );
}

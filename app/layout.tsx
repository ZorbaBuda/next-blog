import "./globals.scss";
import type { Metadata } from "next";
import { ThemeProviders } from "./theme-providers";
import TwSizeIndicator from "@/components/helpers/TwSizeIndicator";

export const metadata: Metadata = {
  title: "Neuro Primal",
  description: "Resúmenes, ideas, textos...",
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
      <body>
      
        <ThemeProviders>
          <TwSizeIndicator />
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

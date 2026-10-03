import type { Metadata } from "next";
import localFont from "next/font/local";

const studioSans = localFont({
  src: "./fonts/studio-sans.woff2",
  display: "swap",
  variable: "--font-studio",
  weight: "100 900",
});

import "./globals.css";
export const metadata: Metadata = {
  title: "Bloodline Studio — Make Some Noise",
  description: "A creative space for recording, music production, mixing and mastering. Find your sound at Bloodline Studio.",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en"><body className={studioSans.variable}>{children}</body></html>;
}

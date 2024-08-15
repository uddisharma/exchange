import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { Appbar } from "./components/Appbar";
import { cn } from "../lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Crypto Exchange",
  description: "Crypto Exchange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased container  bg-[#0e0f14] text-white",
        fontSans.variable
      )}>
        <Appbar />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import ClientWalletProvider from "@/components/ClientWalletProvider";

export const metadata: Metadata = {
  title: "Anime Market - Prediction Markets for Anime & Manga",
  description: "Bet on anime releases, manga chapters, and industry events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-950">
        <ClientWalletProvider>
          {children}
        </ClientWalletProvider>
      </body>
    </html>
  );
}

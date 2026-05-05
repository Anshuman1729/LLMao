import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Style Bazaar — Find Your Perfect Products",
  description: "Personalized product recommendations for creators on Meesho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50`}>
        {children}
      </body>
    </html>
  );
}

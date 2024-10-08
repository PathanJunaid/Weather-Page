import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreContext from "./Context/StoreContext";
import Navbar from "@/Components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather",
  description: "Weather App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://kit.fontawesome.com/ff1d1ff675.js"
          crossOrigin="anonymous"
        async ></script>
      </head>
      <StoreContext>
        <body className={inter.className}>
          <Navbar />
          <section className="w-11/12 mx-auto">{children}</section>
        </body>
      </StoreContext>
    </html>
  );
}

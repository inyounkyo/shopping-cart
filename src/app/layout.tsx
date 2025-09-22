"use client";

import { Noto_Sans_KR } from "next/font/google";

import { useRouter } from "next/navigation";
// Zustand
import useShoppingCart from "@/store/useShoppingCart";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Remix Icon
import { RiShoppingBagLine } from "@remixicon/react";
// Shadcn UI
import { Toaster } from "@/components/ui/sonner";
// CSS
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Shopping-Cart",
//   description: "",
// };

const NOTO_SANS_KR = Noto_Sans_KR({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const x = useRouter();
  const { addItems } = useShoppingCart();

  return (
    <html lang="en">
      <body className={NOTO_SANS_KR.className}>
        <nav>
          <a href="#" onClick={() => x.push("/")} className="logo">
            Ecommerce.
          </a>
          <a
            href="#"
            className="cart-icon"
            onClick={() => x.push("/board/cart")}
          >
            <RiShoppingBagLine size={36} color="black" className="" />
            <span className="cart-item-count">{addItems.length}</span>
          </a>
        </nav>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

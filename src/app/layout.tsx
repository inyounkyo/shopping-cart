'use client';

import { useRouter } from "next/navigation";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// Remix Icon
import { RiShoppingBagLine } from "@remixicon/react";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const x = useRouter();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav>
          <a href="#" onClick={ () => x.push('/') } className="logo">Ecommerce.</a>
          <a href='cart.html' className="cart-icon">
            <RiShoppingBagLine size={36} color="black" className=""/>
            <span className='cart-item-count'>4</span>
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}

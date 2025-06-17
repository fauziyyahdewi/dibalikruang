import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const font = Poppins({
  weight: ["100", "300", "400", "500", "700", "900", "200", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dibalik Ruang",
  description: "dibalikruang.com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}

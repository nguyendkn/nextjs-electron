import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Electron Next.js",
  description: "Electron + Next.js base project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

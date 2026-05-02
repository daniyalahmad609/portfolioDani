import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneX Studio | Daniyal Ahmad",
  description: "Premium graphic design portfolio by Daniyal Ahmad."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

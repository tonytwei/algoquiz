import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fonts = localFont({ src: "../fonts/Gabarito-VariableFont_wght.ttf" });

export const metadata: Metadata = {
  title: "AlgoQuiz",
  description: "Algorithm and Data Structures Web-based Quiz App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fonts.className}>{children}</body>
    </html>
  );
}

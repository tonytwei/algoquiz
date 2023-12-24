import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
/*
google font not working, cba internet issue?
import { Gabarito } from 'next/font/google'
const gabarito = Gabarito({
  subsets: ['latin']
})
*/

const fonts = localFont({ src: "../fonts/Gabarito-VariableFont_wght.ttf" });

export const metadata: Metadata = {
  title: "AlgoQuiz",
  description: "Algorithm and Data Structures Web-based Quiz App",
};

export default function RootLayout({
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

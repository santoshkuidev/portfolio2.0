import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "../components/ThemeRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio2.0",
  description: "Built on NextJS with React and MaterialUI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>{children}</ThemeRegistry>
        {/* Feedback Widget Script */}
        <script
          src="https://santoshkuidev.github.io/feedback-widget/feedback-widget.js"
          data-auto-init
          data-api-url="https://feedback-widget-pl4o74oqw-santoshs-projects-b7bab93e.vercel.app"
          data-probability="1"
          data-delay="5000"
          data-primary-color="#4a6cf7"
          data-position="bottom-right"
          data-dark-mode="false"
          data-company-name="Santosh Kui"
        />
      </body>
    </html>
  );
}

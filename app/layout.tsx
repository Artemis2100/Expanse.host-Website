import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Chatwoot from "./components/Chatwoot";
import ScrollToTop from "./components/ScrollToTop";
import { CurrencyProvider } from "./contexts/CurrencyContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Expanse Host",
  description: "Expanse Host main website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${montserrat.variable} antialiased overflow-x-hidden`}
      >
        <CurrencyProvider>
          {children}
          <ScrollToTop />
          <Chatwoot />
        </CurrencyProvider>
      </body>
    </html>
  );
}

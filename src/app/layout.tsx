import { auth } from "@/auth";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kiray | Find Your Perfect Vehicle",
  description: "Rent, buy, or sell your next vehicle with Kiray.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <Navbar session={session} />
          <main style={{ minHeight: '100vh' }}>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

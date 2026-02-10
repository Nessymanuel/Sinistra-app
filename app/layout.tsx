import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClaimsProvider } from "./claims-context";
import AppShell from "./shell";
import { AuthProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sinistra - Portal de Sinistros Automóvel",
  description:
    "Registo e acompanhamento simples de sinistros entre condutores e seguradoras.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ClaimsProvider>
            <AppShell>{children}</AppShell>
          </ClaimsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

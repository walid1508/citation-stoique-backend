import GlobalStyle from "@/components/global-style";
import type { Metadata } from "next";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title:
    "Citations Stoïques | Les meilleures citations des grands stoïciens romains",
  description:
    "Les meilleures citations stoïques des trois grands stoïciens romains : Marc Aurèle, Cléanthe, Zénon de Kition, Sénèque et Épictète. Présentées en morceaux concis, apprenez de leur sagesse et intégrez le stoïcisme dans votre vie quotidienne.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalStyle />
        {children}
      </body>
    </html>
  );
}

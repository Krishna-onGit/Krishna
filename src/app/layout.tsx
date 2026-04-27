import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

import FootballDialog from "@/components/FootballDialog";
import SpotifyFloatingPlayer from "@/components/SpotifyFloatingPlayer";


const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Krishna Enagandula — Portfolio",
  description: "Designer who also codes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bgPrimary text-textPrimary selection:bg-accent selection:text-bgPrimary">
        <SmoothScroll>
          <CustomCursor />
          <FootballDialog />
          <SpotifyFloatingPlayer />

          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

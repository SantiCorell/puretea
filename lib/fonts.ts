import { DM_Sans } from "next/font/google";
import { Cormorant_Garamond } from "next/font/google";

/**
 * Satoshi is the brand font for body text (see brand guidelines).
 * Using DM Sans as a similar geometric sans-serif until Satoshi is self-hosted.
 * To use Satoshi: add woff2 to /public/fonts/ and use next/font/local.
 */
export const fontSatoshi = DM_Sans({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
});

/**
 * Canela is the brand font for logo and headings.
 * Using Cormorant Garamond as a similar elegant serif until Canela is self-hosted.
 * To use Canela: add woff2 to /public/fonts/ and use next/font/local.
 */
export const fontCanela = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-canela",
  display: "swap",
});

import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kapsca.in"),
  title: {
    default: "KAPS & Co. — Chartered Accountants | Vadodara, Gujarat",
    template: "%s · KAPS & Co.",
  },
  description:
    "KAPS & Co. is a partner-led firm of Chartered Accountants in Vadodara, Gujarat — assurance, GST & indirect tax, direct tax, forensic audit and advisory for businesses of every size.",
  keywords: [
    "Chartered Accountants Vadodara",
    "GST consultant Gujarat",
    "Indirect tax litigation",
    "Forensic audit",
    "Statutory audit",
    "KAPS & Co.",
  ],
  openGraph: {
    title: "KAPS & Co. — Chartered Accountants",
    description:
      "Integrity beyond the numbers. Assurance, taxation, forensic and advisory services from Vadodara, Gujarat.",
    url: "https://www.kapsca.in",
    siteName: "KAPS & Co.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy-950 font-sans text-ink">
        {children}
      </body>
    </html>
  );
}

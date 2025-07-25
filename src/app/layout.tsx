import Providers from "@/components/providers";
import { TConfig } from "@/stores/config";
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Image from "next/image";

const fontGaeilgeKids = localFont({
  src: [
    {
      path: "../../public/fonts/gaeilge-kids/GaeilgeKids.otf",
      weight: "400",
    },
  ],
  variable: "--font-gaeilge-kids",
});

const fontSukhumvitSet = localFont({
  src: [
    {
      path: "../../public/fonts/sukhumvit-set/SukhumvitSet-Bold.ttf",
      weight: "700",
    },
    {
      path: "../../public/fonts/sukhumvit-set/SukhumvitSet-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../../public/fonts/sukhumvit-set/SukhumvitSet-Text.ttf",
      weight: "500",
    },
    {
      path: "../../public/fonts/sukhumvit-set/SukhumvitSet-Medium.ttf",
      weight: "400",
    },
    {
      path: "../../public/fonts/sukhumvit-set/SukhumvitSet-Light.ttf",
      weight: "300",
    },
    {
      path: "../../public/fonts/sukhumvit-set/SukhumvitSet-Thin.ttf",
      weight: "200",
    },
  ],
  variable: "--font-sukhumvit-set",
});

export const metadata: Metadata = {
  title: "LOKALTUR",
  description: "Kolaborasi Kebudayaan Lokal dengan Permainan yang menyenangkan",
  openGraph: {
    title: "",
    description: "",
    url: "",
    images: [
      {
        url: "",
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description: "",
    images: [""],
  },
  icons: {
    icon: "",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = {
    title: metadata?.title,
    description: metadata?.description,
  };

  return (
    <html lang="en">
      <body
        className={`${fontGaeilgeKids.variable} ${fontSukhumvitSet.variable} font-sukhumvit-set bg-opacity-50 relative bg-[url('/assets/line-bg.png')] bg-cover bg-center antialiased`}
      >
        <Providers config={config as TConfig}>
          <div className="relative z-10">{children}</div>
        </Providers>

        <div className="absolute bottom-0 left-0 z-0">
          <Image
            src="/assets/layout/left-bg.png"
            alt="line-bg"
            width={480}
            height={480}
            className="h-[75vh] w-auto"
          />
        </div>
        <div className="absolute right-0 bottom-0 z-0">
          <Image
            src="/assets/layout/right-bg.png"
            alt="line-bg"
            width={480}
            height={480}
            className="h-[75vh] w-auto"
          />
        </div>
      </body>
    </html>
  );
}

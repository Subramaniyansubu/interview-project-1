import type { Metadata } from "next";

interface CreateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  publishedTime?: string;
  type?: "website" | "article";
}

export function createMetadata({
  title,
  description = "açıklama",
  keywords = [],
  image = "/favicon.ico",
  path = "",
  publishedTime,
  type = "website",
}: CreateMetadataProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = `${baseUrl}${path}`;

  return {
    title: `${title} - ${process.env.NEXT_PUBLIC_APP_TITLE}`,
    description,
    keywords: ["kaplumbağa", ...keywords],
    authors: [{ name: process.env.NEXT_PUBLIC_APP_TITLE, url: baseUrl }],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: `${title} - ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description,
      url,
      siteName: process.env.NEXT_PUBLIC_APP_TITLE!,
      images: [
        {
          url: image.startsWith("http") ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime,
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - ${process.env.NEXT_PUBLIC_APP_TITLE}`,
      description,
      images: [image.startsWith("http") ? image : `${baseUrl}${image}`],
      creator: "@savasoto",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}

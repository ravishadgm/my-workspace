import dynamic from "next/dynamic";

// layout //
export const Header = dynamic(
  () => import("shared/Shared").then((mod) => mod.Header),
  { ssr: false }
);

export const Footer = dynamic(
  () => import("shared/Shared").then((mod) => mod.Footer),
  { ssr: false }
);

// components //

export const Downloader = dynamic(
  () => import("shared/Shared").then((mod) => mod.Downloader),
  { ssr: false }
);

export const MediaPreview = dynamic(
  () => import("shared/Shared").then((mod) => mod.MediaPreview),
  { ssr: false }
);
export const WhyUs = dynamic(
  () => import("shared/Shared").then((mod) => mod.WhyUs),
  { ssr: false }
);

// common  //

export const AboutProcess = dynamic(
  () => import("shared/Shared").then((mod) => mod.AboutProcess),
  { ssr: false }
);

export const DownloadDescription = dynamic(
  () => import("shared/Shared").then((mod) => mod.DownloadDescription),
  { ssr: false }
);
export const AppPromotion = dynamic(
  () => import("shared/Shared").then((mod) => mod.AppPromotion),
  { ssr: false }
);

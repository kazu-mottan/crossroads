"use client";

import dynamic from "next/dynamic";

const MarriageContent = dynamic(
  () => import("@/components/MarriageContent"),
  { ssr: false }
);

export default function MarriagePage() {
  return <MarriageContent />;
}

"use client";

import dynamic from "next/dynamic";

const OverseasContent = dynamic(
  () => import("@/components/OverseasContent"),
  { ssr: false }
);

export default function OverseasPage() {
  return <OverseasContent />;
}

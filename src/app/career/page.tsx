"use client";

import dynamic from "next/dynamic";

const CareerContent = dynamic(
  () => import("@/components/CareerContent"),
  { ssr: false }
);

export default function CareerPage() {
  return <CareerContent />;
}

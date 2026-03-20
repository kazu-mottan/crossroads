"use client";

import dynamic from "next/dynamic";

const StrategyContent = dynamic(
  () => import("@/components/StrategyContent"),
  { ssr: false }
);

export default function StrategyPage() {
  return <StrategyContent />;
}

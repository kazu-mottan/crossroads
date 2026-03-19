"use client";

import dynamic from "next/dynamic";

const FinancialContent = dynamic(
  () => import("@/components/FinancialContent"),
  { ssr: false }
);

export default function FinancialPage() {
  return <FinancialContent />;
}

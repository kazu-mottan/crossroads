"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "ホーム", icon: "🏠" },
  { href: "/dashboard", label: "総合ダッシュボード", icon: "📊" },
  { href: "/financial", label: "財務シミュレーション", icon: "💰" },
  { href: "/career", label: "キャリア分析", icon: "💼" },
  { href: "/overseas", label: "海外移住比較", icon: "🌏" },
  { href: "/strategy", label: "移住・ビジネス戦略", icon: "🧭" },
  { href: "/marriage", label: "ライフイベント", icon: "💍" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col gap-2 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-xl font-bold">将来設計プランナー</h1>
        <p className="text-gray-400 text-sm mt-1">Life Decision Analyzer</p>
      </div>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span>{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        );
      })}
      <div className="mt-auto pt-6 border-t border-gray-700">
        <div className="text-xs text-gray-500">
          <p>29歳 / アクセンチュア</p>
          <p>年収: 2,000万円</p>
          <p>（本業700万 + 副業1,300万）</p>
        </div>
      </div>
    </nav>
  );
}

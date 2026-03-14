"use client";

import Link from "next/link";
import { profile } from "@/data/profile";

const cards = [
  {
    href: "/dashboard",
    title: "総合ダッシュボード",
    description: "全シナリオの比較スコアと推奨アクションを一覧表示",
    icon: "📊",
    color: "from-blue-500 to-blue-700",
  },
  {
    href: "/financial",
    title: "財務シミュレーション",
    description: "各シナリオの収入・支出・貯蓄推移を35年分シミュレーション",
    icon: "💰",
    color: "from-green-500 to-green-700",
  },
  {
    href: "/career",
    title: "キャリア分析",
    description: "本業継続 vs フリーランス専業の比較分析",
    icon: "💼",
    color: "from-purple-500 to-purple-700",
  },
  {
    href: "/overseas",
    title: "海外移住比較",
    description: "移住先候補の生活費・税制・環境を徹底比較",
    icon: "🌏",
    color: "from-orange-500 to-orange-700",
  },
  {
    href: "/marriage",
    title: "ライフイベント",
    description: "結婚・英語学習のタイムラインとプランニング",
    icon: "💍",
    color: "from-pink-500 to-pink-700",
  },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          将来設計プランナー
        </h1>
        <p className="text-gray-600 text-lg">
          30歳を目前に、最適なライフプランを分析・可視化するツール
        </p>
      </div>

      {/* 現状サマリー */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          現在のステータス
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">年齢</p>
            <p className="text-2xl font-bold text-gray-900">
              {profile.age}歳
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">本業年収</p>
            <p className="text-2xl font-bold text-gray-900">
              {(profile.income.mainJob / 10000).toLocaleString()}万円
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">副業年収</p>
            <p className="text-2xl font-bold text-emerald-600">
              {(profile.income.sideJob / 10000).toLocaleString()}万円
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">合計年収</p>
            <p className="text-2xl font-bold text-blue-600">
              {(profile.income.total / 10000).toLocaleString()}万円
            </p>
          </div>
        </div>
      </div>

      {/* 検討事項 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-amber-800 mb-3">
          整理したい意思決定
        </h2>
        <ul className="space-y-2 text-amber-900">
          <li className="flex items-start gap-2">
            <span className="mt-1">▸</span>
            <span>
              アクセンチュアを辞めて副業（月単価110万）を本業化すべきか？
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">▸</span>
            <span>30歳を機に海外移住すべきか？するならどの国か？</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">▸</span>
            <span>英語学習を貯金を使わずにどう進めるか？</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1">▸</span>
            <span>結婚のタイミングとライフプランをどう設計するか？</span>
          </li>
        </ul>
      </div>

      {/* ナビカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link key={card.href} href={card.href}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl mb-4`}
              >
                {card.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500">{card.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

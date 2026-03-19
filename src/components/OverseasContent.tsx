"use client";

import GeorgiaVsMalaysia from "./GeorgiaVsMalaysia";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { countries, profile } from "@/data/profile";

const income = profile.freelance.annualRate;

export default function OverseasContent() {
  const costData = [
    { name: "日本", monthlyCost: profile.livingCost.japan / 1000 },
    ...countries.map((c) => ({
      name: c.nameJa.split("（")[0],
      monthlyCost: c.monthlyCost / 1000,
    })),
  ].sort((a, b) => a.monthlyCost - b.monthlyCost);

  const savingsData = countries
    .map((c) => {
      const annualCost = c.monthlyCost * 12;
      const tax = income * c.taxRate;
      const netSavings = income - tax - annualCost;
      return {
        name: c.nameJa.split("（")[0],
        年間貯蓄: Math.round(netSavings / 10000),
        taxRate: `${(c.taxRate * 100).toFixed(0)}%`,
      };
    })
    .sort((a, b) => b["年間貯蓄"] - a["年間貯蓄"]);

  // 日本の年間貯蓄（比較用）
  const japanSavings = Math.round(
    (income - income * 0.25 - profile.livingCost.japan * 12) / 10000
  );

  const radarData = [
    { dimension: "ビザ取得", ...Object.fromEntries(countries.map((c) => [c.nameJa.split("（")[0], c.visaEase * 20])) },
    { dimension: "英語環境", ...Object.fromEntries(countries.map((c) => [c.nameJa.split("（")[0], c.englishLevel * 20])) },
    { dimension: "安全性", ...Object.fromEntries(countries.map((c) => [c.nameJa.split("（")[0], c.safety * 20])) },
    { dimension: "ネット速度", ...Object.fromEntries(countries.map((c) => [c.nameJa.split("（")[0], Math.min(c.internetSpeed / 3, 100)])) },
    { dimension: "コスパ", ...Object.fromEntries(countries.map((c) => [c.nameJa.split("（")[0], Math.max(0, 100 - c.monthlyCost / 4000)])) },
    { dimension: "時差少", ...Object.fromEntries(countries.map((c) => [c.nameJa.split("（")[0], Math.max(0, 100 - Math.abs(c.japanTimeDiff) * 15)])) },
  ];

  const radarColors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        海外移住先の比較
      </h1>
      <p className="text-gray-500 mb-8">
        フリーランス年収{(income / 10000).toLocaleString()}
        万円ベースでの各国シミュレーション
      </p>

      {/* 月額生活費比較 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          月額生活費の比較（千円）
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={costData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip
              formatter={(val) => `${val}千円/月`}
            />
            <Bar dataKey="monthlyCost" name="月額生活費" fill="#f59e0b" radius={[4, 4, 0, 0]}>
              {costData.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.name === "日本" ? "#94a3b8" : "#f59e0b"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 年間貯蓄比較 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          年間貯蓄額の比較（万円） — 日本残留: {japanSavings}万円
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={savingsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis />
            <Tooltip
              formatter={(val) => `${Number(val).toLocaleString()}万円/年`}
            />
            <Bar
              dataKey="年間貯蓄"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">
          ※日本残留フリーランス（税率25%想定）の場合: 年間{japanSavings}万円
        </p>
      </div>

      {/* レーダーチャート */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          総合環境比較
        </h3>
        <ResponsiveContainer width="100%" height={450}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis domain={[0, 100]} />
            {countries.map((c, i) => (
              <Radar
                key={c.name}
                name={c.nameJa.split("（")[0]}
                dataKey={c.nameJa.split("（")[0]}
                stroke={radarColors[i]}
                fill={radarColors[i]}
                fillOpacity={0.1}
              />
            ))}
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* 国別カード */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        各国の詳細情報
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {countries.map((c) => {
          const annualNet =
            income - income * c.taxRate - c.monthlyCost * 12;
          return (
            <div
              key={c.name}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <h4 className="font-semibold text-gray-900 mb-3">{c.nameJa}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">月額生活費</span>
                  <span className="font-medium">
                    {(c.monthlyCost / 10000).toFixed(1)}万円
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">税率</span>
                  <span className="font-medium">
                    {(c.taxRate * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">年間貯蓄</span>
                  <span className="font-bold text-green-600">
                    {Math.round(annualNet / 10000)}万円
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">日本との時差</span>
                  <span>{c.japanTimeDiff}時間</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">ビザ取得</span>
                  <span>{"★".repeat(c.visaEase)}{"☆".repeat(5 - c.visaEase)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">英語環境</span>
                  <span>{"★".repeat(c.englishLevel)}{"☆".repeat(5 - c.englishLevel)}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {c.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 推奨 */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-orange-800 mb-3">
          移住先の推奨
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div>
            <strong className="text-orange-700">第1候補: ジョージア</strong>
            <p>
              税率1%・ビザ不要・生活費月10万。貯金を減らしたくないなら最適。
              ただし英語環境はやや弱い。
            </p>
          </div>
          <div>
            <strong className="text-orange-700">第2候補: マレーシア</strong>
            <p>
              英語が通じやすく、時差1時間。日本のクライアントとも仕事しやすい。
              生活費も安めで、長期滞在ビザあり。
            </p>
          </div>
          <div>
            <strong className="text-orange-700">第3候補: タイ</strong>
            <p>
              日本人コミュニティが充実。生活費が安く、食事も合いやすい。
              LTRビザで税制優遇も。英語はマレーシアより弱い。
            </p>
          </div>
        </div>
      </div>

      {/* ジョージア vs マレーシア 詳細比較 */}
      <div className="mt-12">
        <GeorgiaVsMalaysia />
      </div>
    </div>
  );
}

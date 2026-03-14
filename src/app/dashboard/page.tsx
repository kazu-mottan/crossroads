"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { scenarios } from "@/data/profile";
import { scoreScenarios, simulateFinancials } from "@/lib/simulator";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

const dimensionLabels: Record<string, string> = {
  financial: "財務力",
  freedom: "自由度",
  englishGrowth: "英語成長",
  careerSafety: "キャリア安定",
  marriageProspect: "結婚見込み",
  lifeExperience: "人生経験",
};

export default function DashboardPage() {
  const scores = scoreScenarios();
  const sorted = [...scores].sort(
    (a, b) => b.scores.overall - a.scores.overall
  );

  // レーダーチャート用データ
  const radarData = Object.keys(dimensionLabels).map((key) => {
    const entry: Record<string, string | number> = {
      dimension: dimensionLabels[key],
    };
    scores.forEach((s) => {
      entry[s.label] = s.scores[key as keyof typeof s.scores];
    });
    return entry;
  });

  // 5年後貯蓄比較
  const savingsData = scenarios.map((s, i) => {
    const sim = simulateFinancials(s, 5);
    return {
      name: s.label.replace(/ \+ /g, "\n"),
      "5年後貯蓄": Math.round(sim[4].cumulativeSavings / 10000),
      fill: COLORS[i],
    };
  });

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        総合ダッシュボード
      </h1>
      <p className="text-gray-500 mb-8">
        4つのシナリオを多角的に比較・評価した結果
      </p>

      {/* 推奨シナリオ */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-6 mb-8">
        <p className="text-sm opacity-80 mb-1">総合スコア1位</p>
        <h2 className="text-2xl font-bold mb-2">{sorted[0].label}</h2>
        <p className="text-lg">
          総合スコア: {sorted[0].scores.overall}点 / 100点
        </p>
        <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-3">
          {Object.entries(dimensionLabels).map(([key, label]) => (
            <div key={key} className="bg-white/10 rounded-lg p-2 text-center">
              <p className="text-xs opacity-70">{label}</p>
              <p className="text-lg font-bold">
                {sorted[0].scores[key as keyof typeof sorted[0]["scores"]]}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* スコアランキング */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {sorted.map((s, i) => (
          <div
            key={s.scenarioId}
            className={`bg-white rounded-xl border p-5 ${
              i === 0 ? "border-blue-300 ring-2 ring-blue-100" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-sm font-bold px-2 py-0.5 rounded ${
                  i === 0
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                #{i + 1}
              </span>
              <span className="text-sm font-medium text-gray-700 truncate">
                {s.label}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {s.scores.overall}
              <span className="text-sm text-gray-400 ml-1">点</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* レーダーチャート */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            シナリオ別 多軸比較
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              {scores.map((s, i) => (
                <Radar
                  key={s.scenarioId}
                  name={s.label}
                  dataKey={s.label}
                  stroke={COLORS[i]}
                  fill={COLORS[i]}
                  fillOpacity={0.15}
                />
              ))}
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 5年後貯蓄比較 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            5年後の累計貯蓄（万円）
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={savingsData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis
                dataKey="name"
                type="category"
                width={140}
                tick={{ fontSize: 11 }}
              />
              <Tooltip
                formatter={(val) => `${Number(val).toLocaleString()}万円`}
              />
              <Bar dataKey="5年後貯蓄" radius={[0, 4, 4, 0]}>
                {savingsData.map((entry, i) => (
                  <rect key={i} fill={COLORS[i]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 各シナリオ詳細 */}
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        シナリオ詳細
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h4 className="font-semibold text-gray-900 mb-1">{s.label}</h4>
            <p className="text-sm text-gray-500 mb-4">{s.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-green-600 mb-2">
                  メリット
                </p>
                <ul className="space-y-1">
                  {s.pros.map((p, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-1">
                      <span className="text-green-500">+</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-red-600 mb-2">
                  デメリット
                </p>
                <ul className="space-y-1">
                  {s.cons.map((c, i) => (
                    <li key={i} className="text-xs text-gray-600 flex gap-1">
                      <span className="text-red-500">-</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

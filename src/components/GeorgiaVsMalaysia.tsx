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
  Cell,
} from "recharts";

const income = 13_200_000; // フリーランス年収

const comparison = {
  georgia: {
    name: "ジョージア（トビリシ）",
    flag: "🇬🇪",
    monthlyCost: 150_000,
    taxRate: 0.01,
    visaEase: 5,
    englishLevel: 2,
    internet: 150,
    safety: 4,
    timeDiff: -5,
    japanFoodAccess: 1,
    community: 2,
    climate: 3,
    healthcare: 2,
    startupScene: 3,
  },
  malaysia: {
    name: "マレーシア（KL）",
    flag: "🇲🇾",
    monthlyCost: 130_000,
    taxRate: 0.0,
    visaEase: 4,
    englishLevel: 4,
    internet: 100,
    safety: 4,
    timeDiff: -1,
    japanFoodAccess: 5,
    community: 4,
    climate: 3,
    healthcare: 4,
    startupScene: 3,
  },
};

const radarData = [
  { dim: "ビザ取得", ジョージア: 100, マレーシア: 80 },
  { dim: "英語環境", ジョージア: 40, マレーシア: 80 },
  { dim: "コスパ", ジョージア: 95, マレーシア: 85 },
  { dim: "時差の少なさ", ジョージア: 30, マレーシア: 90 },
  { dim: "日本食入手", ジョージア: 20, マレーシア: 100 },
  { dim: "日本人コミュニティ", ジョージア: 40, マレーシア: 80 },
  { dim: "医療水準", ジョージア: 40, マレーシア: 80 },
  { dim: "節税効果", ジョージア: 95, マレーシア: 100 },
];

export default function GeorgiaVsMalaysia() {
  const gTax = income * comparison.georgia.taxRate;
  const mTax = income * comparison.malaysia.taxRate;
  const jTax = income * 0.25;
  const gCost = comparison.georgia.monthlyCost * 12;
  const mCost = comparison.malaysia.monthlyCost * 12;
  const jCost = 200_000 * 12;

  const savingsData = [
    { name: "日本", 年間貯蓄: Math.round((income - jTax - jCost) / 10000), color: "#94a3b8" },
    { name: "ジョージア", 年間貯蓄: Math.round((income - gTax - gCost) / 10000), color: "#f59e0b" },
    { name: "マレーシア", 年間貯蓄: Math.round((income - mTax - mCost) / 10000), color: "#10b981" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        ジョージア vs マレーシア 徹底比較
      </h2>

      {/* 基本データ比較テーブル */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-3 text-gray-600">項目</th>
              <th className="text-center py-3 px-3 text-amber-700">🇬🇪 ジョージア</th>
              <th className="text-center py-3 px-3 text-emerald-700">🇲🇾 マレーシア</th>
              <th className="text-center py-3 px-3 text-gray-500">判定</th>
            </tr>
          </thead>
          <tbody>
            {[
              { label: "ビザ", g: "不要（1年間滞在可）", m: "De Rantauビザ（要申請）", win: "g" },
              { label: "税率", g: "売上の1%（SBS制度）", m: "海外源泉所得は非課税", win: "m" },
              { label: "年間税額", g: `${Math.round(gTax/10000)}万円`, m: `${Math.round(mTax/10000)}万円`, win: "m" },
              { label: "月額生活費", g: "約15万円", m: "約13万円", win: "m" },
              { label: "日本との時差", g: "-5時間", m: "-1時間", win: "m" },
              { label: "英語環境", g: "弱い（ジョージア語中心）", m: "強い（公用語レベル）", win: "m" },
              { label: "ネット速度", g: "100-230 Mbps", m: "50-300 Mbps", win: "draw" },
              { label: "日本食入手", g: "困難（少数の日本人店）", m: "容易（日系スーパーあり）", win: "m" },
              { label: "日本人コミュニティ", g: "小規模だが増加中", m: "大規模で充実", win: "m" },
              { label: "医療水準", g: "基本的な医療のみ", m: "高水準（医療ツーリズム）", win: "m" },
              { label: "気候", g: "四季あり（夏暑く冬寒い）", m: "年中暑い（27-33℃）", win: "draw" },
              { label: "永住権への道", g: "投資5-10年", m: "MM2Hプログラム", win: "draw" },
              { label: "語学学校", g: "あり（月2-4万円）", m: "豊富（月1-5万円）", win: "m" },
              { label: "独自の魅力", g: "ワイン発祥の地・温泉文化", m: "多文化・食の宝庫", win: "draw" },
            ].map((row, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-2.5 px-3 font-medium text-gray-700">{row.label}</td>
                <td className={`py-2.5 px-3 text-center ${row.win === "g" ? "font-bold text-amber-700" : ""}`}>
                  {row.g} {row.win === "g" && "✓"}
                </td>
                <td className={`py-2.5 px-3 text-center ${row.win === "m" ? "font-bold text-emerald-700" : ""}`}>
                  {row.m} {row.win === "m" && "✓"}
                </td>
                <td className="py-2.5 px-3 text-center">
                  {row.win === "g" ? "🇬🇪" : row.win === "m" ? "🇲🇾" : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* レーダーチャート */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">総合比較レーダー</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dim" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="ジョージア" dataKey="ジョージア" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
              <Radar name="マレーシア" dataKey="マレーシア" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 年間貯蓄比較 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">年間貯蓄の比較（万円）</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(val) => `${Number(val).toLocaleString()}万円`} />
              <Bar dataKey="年間貯蓄" radius={[4, 4, 0, 0]}>
                {savingsData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 text-xs text-gray-500 space-y-1">
            <p>日本: 税率25%・生活費月20万 → 年間貯蓄 {savingsData[0]["年間貯蓄"]}万円</p>
            <p>ジョージア: 税率1%・生活費月15万 → 年間貯蓄 {savingsData[1]["年間貯蓄"]}万円</p>
            <p>マレーシア: 税率0%・生活費月13万 → 年間貯蓄 {savingsData[2]["年間貯蓄"]}万円</p>
          </div>
        </div>
      </div>

      {/* 結論 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-semibold text-amber-800 mb-3">🇬🇪 ジョージアが向いている人</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• とにかくハードル低く海外生活を始めたい（ビザ不要）</li>
            <li>• 冒険的な体験を重視したい</li>
            <li>• ヨーロッパ旅行も楽しみたい</li>
            <li>• ワイン・温泉文化に興味がある</li>
            <li>• 日本のクライアントとの時差を許容できる</li>
          </ul>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <h3 className="font-semibold text-emerald-800 mb-3">🇲🇾 マレーシアが向いている人</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 仕事への影響を最小限にしたい（時差1時間）</li>
            <li>• 英語を実践的に使いたい</li>
            <li>• 日本食が恋しくなりそう</li>
            <li>• 医療面の安心感がほしい</li>
            <li>• アジア圏の安定した生活環境を求めたい</li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-3">推奨プラン</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>契約先との交渉を考えると、マレーシアが第一候補。</strong>
            時差1時間は「ほぼ日本と同じ」と説明でき、クライアントの抵抗感が最も少ない。
          </p>
          <p>
            <strong>ステップアップとして：</strong>
            まずマレーシアで半年〜1年リモートワーク体制を確立。
            クライアントとの信頼関係ができたら、ジョージア（税率1%）への移動も選択肢に。
          </p>
          <p>
            <strong>英語学習：</strong>
            マレーシアは英語が公用語レベルで通じるため、
            語学学校に通わなくても日常生活で英語力が伸びる。
            語学学校も豊富で月1〜3万円程度。
          </p>
        </div>
      </div>
    </div>
  );
}

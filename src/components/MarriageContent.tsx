"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { marriageTimelines, englishPlans } from "@/lib/simulator";

const difficultyColors = ["#22c55e", "#84cc16", "#f59e0b", "#ef4444", "#dc2626"];

export default function MarriageContent() {
  const difficultyData = marriageTimelines.map((t) => ({
    name: t.scenario,
    difficulty: t.difficulty,
  }));

  const englishCostData = englishPlans.map((p) => ({
    name: p.method.split("（")[0],
    月額コスト: p.monthlyCost / 1000,
    効果: p.effectiveness * 20,
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        ライフイベント計画
      </h1>
      <p className="text-gray-500 mb-8">結婚・英語学習のタイムラインと戦略</p>

      {/* ===== 結婚セクション ===== */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          結婚タイムライン分析
        </h2>

        {/* 難易度チャート */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            シナリオ別 婚活難易度（1=簡単, 5=難しい）
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={difficultyData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 5]} />
              <YAxis
                dataKey="name"
                type="category"
                width={160}
                tick={{ fontSize: 12 }}
              />
              <Tooltip />
              <Bar dataKey="difficulty" name="難易度" radius={[0, 4, 4, 0]}>
                {difficultyData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={difficultyColors[entry.difficulty - 1]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* タイムラインカード */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {marriageTimelines.map((t) => (
            <div
              key={t.scenario}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{t.scenario}</h4>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    t.difficulty <= 2
                      ? "bg-green-100 text-green-700"
                      : t.difficulty <= 3
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  難易度 {t.difficulty}/5
                </span>
              </div>
              <div className="flex gap-4 mb-3 text-sm">
                <div className="flex-1 bg-blue-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-blue-600">出会い</p>
                  <p className="font-bold text-blue-800">{t.meetingAge}</p>
                </div>
                <div className="flex-1 bg-pink-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-pink-600">結婚</p>
                  <p className="font-bold text-pink-800">{t.marriageAge}</p>
                </div>
                <div className="flex-1 bg-purple-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-purple-600">第一子</p>
                  <p className="font-bold text-purple-800">{t.childAge}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{t.notes}</p>
            </div>
          ))}
        </div>

        {/* 結婚に関するアドバイス */}
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-6">
          <h3 className="font-semibold text-pink-800 mb-3">
            結婚に関する考察
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>29歳の今がベストタイミング：</strong>
              統計的に男性の婚活市場価値は30代前半がピーク。
              年収2,000万は上位数%であり、婚活では大きな強み。
            </p>
            <p>
              <strong>海外移住と結婚の両立：</strong>
              順序としては「①まず1-2年海外→②帰国して婚活」か「①婚活→②パートナーと海外」の二択。
              後者のほうがリスクは低いが、海外移住の実現が遅れる。
            </p>
            <p>
              <strong>推奨プラン：</strong>
              フリーランス化直後に1年間の海外移住を経験。
              30-31歳で帰国し、経験と英語力を武器に婚活開始。
              32-33歳での結婚を目標に。
            </p>
          </div>
        </div>
      </div>

      {/* ===== 英語学習セクション ===== */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
          英語学習戦略（低コスト重視）
        </h2>

        {/* コスト vs 効果 */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            学習法の比較
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-3">学習法</th>
                  <th className="text-right py-2 px-3">月額コスト</th>
                  <th className="text-right py-2 px-3">週あたり時間</th>
                  <th className="text-center py-2 px-3">効果</th>
                  <th className="text-left py-2 px-3">コメント</th>
                </tr>
              </thead>
              <tbody>
                {englishPlans.map((p) => (
                  <tr
                    key={p.method}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-3 font-medium">
                      {p.method}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {p.monthlyCost === 0 ? (
                        <span className="text-green-600 font-bold">無料</span>
                      ) : (
                        `${(p.monthlyCost).toLocaleString()}円`
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {p.hoursPerWeek}h
                    </td>
                    <td className="py-3 px-3 text-center">
                      {"★".repeat(p.effectiveness)}
                      {"☆".repeat(5 - p.effectiveness)}
                    </td>
                    <td className="py-3 px-3 text-gray-500 text-xs">
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 推奨プラン */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-800 mb-3">
            推奨: 低コスト英語学習ロードマップ
          </h3>
          <div className="space-y-4">
            {[
              {
                phase: "Step 1: 今すぐ（0円）",
                content:
                  "YouTube・Podcastでリスニングを習慣化。通勤・作業中のBGMとして。Tandemアプリで言語交換パートナーを見つける。",
              },
              {
                phase: "Step 2: 1-3ヶ月目（月7,000円）",
                content:
                  "オンライン英会話（NativeCamp）を開始。毎日25分でスピーキングを鍛える。月7,000円は副業収入の0.5%未満。",
              },
              {
                phase: "Step 3: 海外移住後（0円）",
                content:
                  "生活自体が英語環境。最も効率的かつ無料。英語環境の国を選べば、自然にビジネス英語も身につく。",
              },
            ].map((step) => (
              <div key={step.phase}>
                <p className="font-medium text-blue-700 text-sm">
                  {step.phase}
                </p>
                <p className="text-sm text-gray-700">{step.content}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-blue-200 text-xs text-blue-600">
            ポイント: 貯金を使わず月7,000円以内で英語力を伸ばし、
            海外移住で一気にレベルアップするのが最もコスパが良い戦略。
          </div>
        </div>
      </div>
    </div>
  );
}

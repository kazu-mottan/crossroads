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
import { profile } from "@/data/profile";

const careerComparison = [
  {
    category: "年収（税引前）",
    "会社員+副業": profile.income.total / 10000,
    フリーランス専業: profile.freelance.annualRate / 10000,
  },
  {
    category: "推定手取り",
    "会社員+副業": Math.round(profile.income.total * 0.67) / 10000,
    フリーランス専業: profile.freelance.estimatedTakeHome / 10000,
  },
  {
    category: "年間可処分時間（h）",
    "会社員+副業": 1200,
    フリーランス専業: 2400,
  },
];

const factorsData = [
  { factor: "収入安定性", employee: 95, freelance: 55 },
  { factor: "収入上限", employee: 60, freelance: 90 },
  { factor: "自由度", employee: 25, freelance: 95 },
  { factor: "社会的信用", employee: 90, freelance: 50 },
  { factor: "スキル成長", employee: 70, freelance: 80 },
  { factor: "福利厚生", employee: 85, freelance: 20 },
  { factor: "海外移住との相性", employee: 20, freelance: 90 },
  { factor: "結婚活動との相性", employee: 80, freelance: 55 },
];

export default function CareerPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">キャリア分析</h1>
      <p className="text-gray-500 mb-8">
        アクセンチュア継続 vs フリーランス専業の多角比較
      </p>

      {/* 収入比較 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            会社員 + 副業（現状）
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">アクセンチュア</span>
              <span className="font-bold">
                {(profile.income.mainJob / 10000).toLocaleString()}万円/年
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">副業</span>
              <span className="font-bold text-emerald-600">
                {(profile.income.sideJob / 10000).toLocaleString()}万円/年
              </span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="text-gray-600">合計</span>
              <span className="font-bold text-lg">
                {(profile.income.total / 10000).toLocaleString()}万円/年
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">推定手取り（税率33%）</span>
              <span className="text-gray-700">
                約{Math.round((profile.income.total * 0.67) / 10000)}万円/年
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            フリーランス専業（副業→本業化）
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">月単価</span>
              <span className="font-bold">
                {(profile.freelance.monthlyRate / 10000).toLocaleString()}
                万円/月
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">年間売上</span>
              <span className="font-bold text-emerald-600">
                {(profile.freelance.annualRate / 10000).toLocaleString()}
                万円/年
              </span>
            </div>
            <hr />
            <div className="flex justify-between">
              <span className="text-gray-600">推定手取り</span>
              <span className="font-bold text-lg">
                {(profile.freelance.estimatedTakeHome / 10000).toLocaleString()}
                万円/年
              </span>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              ※法人化で節税可。経費・社保を考慮した概算。
              単価UP（120-150万）の余地あり。
            </div>
          </div>
        </div>
      </div>

      {/* 要素別比較 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          要素別スコア比較
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={factorsData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis
              dataKey="factor"
              type="category"
              width={120}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="employee" name="会社員+副業" fill="#3b82f6" />
            <Bar dataKey="freelance" name="フリーランス" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* タイムライン提案 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          推奨キャリア移行タイムライン
        </h3>
        <div className="space-y-4">
          {[
            {
              phase: "Phase 1（今〜3ヶ月）",
              title: "準備期間",
              items: [
                "副業の案件を安定化（契約期間の確認）",
                "フリーランスの開業届・法人化の検討",
                "退職に必要な引き継ぎ計画を策定",
                "3〜6ヶ月分の生活費を確保（60〜120万円）",
              ],
              color: "border-blue-400 bg-blue-50",
            },
            {
              phase: "Phase 2（3〜6ヶ月後）",
              title: "退職＆移行",
              items: [
                "アクセンチュアに退職意思を伝達",
                "有給消化中に海外移住の下見旅行",
                "フリーランスとしての契約を正式化",
                "法人設立（マイクロ法人で節税）",
              ],
              color: "border-green-400 bg-green-50",
            },
            {
              phase: "Phase 3（6ヶ月〜1年後）",
              title: "フリーランス安定化",
              items: [
                "月単価110万→120万以上を目指す",
                "複数クライアントでリスク分散",
                "海外移住の最終判断",
                "英語学習を本格化",
              ],
              color: "border-purple-400 bg-purple-50",
            },
          ].map((phase) => (
            <div
              key={phase.phase}
              className={`border-l-4 ${phase.color} rounded-r-lg p-4`}
            >
              <p className="text-sm font-bold text-gray-600">{phase.phase}</p>
              <p className="font-semibold text-gray-900 mb-2">{phase.title}</p>
              <ul className="space-y-1">
                {phase.items.map((item, i) => (
                  <li key={i} className="text-sm text-gray-600 flex gap-2">
                    <span>・</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 結論 */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-emerald-800 mb-3">
          分析結論
        </h3>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>短期（1年以内）：</strong>
            手取りベースでは会社員+副業のほうが約400万円多い。
            ただし自由時間は半分以下。
          </p>
          <p>
            <strong>中期（3-5年）：</strong>
            フリーランスで単価が120-150万に上がれば手取りは逆転。
            法人化による節税効果も大きい。
          </p>
          <p>
            <strong>長期ビジョン：</strong>
            海外移住や英語習得を視野に入れるなら、フリーランスのほうが圧倒的に柔軟。
            アクセンチュアのキャリアは「いつでも戻れる」保険にはならないが、経歴としての価値は残る。
          </p>
        </div>
      </div>
    </div>
  );
}

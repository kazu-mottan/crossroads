"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { scenarios } from "@/data/profile";
import { simulateFinancials } from "@/lib/simulator";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function FinancialContent() {
  const [years, setYears] = useState(20);
  const [growthRate, setGrowthRate] = useState(2);

  const allSims = scenarios.map((s) =>
    simulateFinancials(s, years, 3_000_000, growthRate / 100)
  );

  // 累計貯蓄の比較データ
  const savingsComparison = allSims[0].map((_, i) => {
    const entry: Record<string, number> = { age: allSims[0][i].age };
    scenarios.forEach((s, j) => {
      entry[s.label] = Math.round(allSims[j][i].cumulativeSavings / 10000);
    });
    return entry;
  });

  // 年間手取りの比較データ
  const incomeComparison = allSims[0].map((_, i) => {
    const entry: Record<string, number> = { age: allSims[0][i].age };
    scenarios.forEach((s, j) => {
      entry[s.label] = Math.round(allSims[j][i].netIncome / 10000);
    });
    return entry;
  });

  // 選択中のシナリオ詳細
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedSim = allSims[selectedIdx];
  const selectedScenario = scenarios[selectedIdx];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        財務シミュレーション
      </h1>
      <p className="text-gray-500 mb-6">
        各シナリオの収入・税金・貯蓄を長期シミュレーション
      </p>

      {/* パラメータ調整 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          シミュレーション設定
        </h3>
        <div className="flex flex-wrap gap-8">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              シミュレーション期間: {years}年（〜{29 + years}歳）
            </label>
            <input
              type="range"
              min={5}
              max={36}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-48"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              収入成長率: 年{growthRate}%
            </label>
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={growthRate}
              onChange={(e) => setGrowthRate(Number(e.target.value))}
              className="w-48"
            />
          </div>
        </div>
      </div>

      {/* 累計貯蓄グラフ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          累計貯蓄の推移（万円）
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={savingsComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="age"
              tickFormatter={(v) => `${v}歳`}
            />
            <YAxis tickFormatter={(v) => `${v.toLocaleString()}`} />
            <Tooltip
              formatter={(val) => `${Number(val).toLocaleString()}万円`}
              labelFormatter={(v) => `${v}歳`}
            />
            <Legend />
            {scenarios.map((s, i) => (
              <Area
                key={s.id}
                type="monotone"
                dataKey={s.label}
                stroke={COLORS[i]}
                fill={COLORS[i]}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* 年間手取り比較 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          年間手取り収入の推移（万円）
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={incomeComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" tickFormatter={(v) => `${v}歳`} />
            <YAxis tickFormatter={(v) => `${v.toLocaleString()}`} />
            <Tooltip
              formatter={(val) => `${Number(val).toLocaleString()}万円`}
              labelFormatter={(v) => `${v}歳`}
            />
            <Legend />
            {scenarios.map((s, i) => (
              <Line
                key={s.id}
                type="monotone"
                dataKey={s.label}
                stroke={COLORS[i]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 個別シナリオ詳細テーブル */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">詳細テーブル</h3>
          <select
            value={selectedIdx}
            onChange={(e) => setSelectedIdx(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          >
            {scenarios.map((s, i) => (
              <option key={s.id} value={i}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-500 mb-4">
          {selectedScenario.description}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-gray-600">年齢</th>
                <th className="text-right py-2 px-3 text-gray-600">
                  総収入
                </th>
                <th className="text-right py-2 px-3 text-gray-600">税金</th>
                <th className="text-right py-2 px-3 text-gray-600">
                  手取り
                </th>
                <th className="text-right py-2 px-3 text-gray-600">
                  生活費
                </th>
                <th className="text-right py-2 px-3 text-gray-600">
                  年間貯蓄
                </th>
                <th className="text-right py-2 px-3 text-gray-600">
                  累計貯蓄
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedSim
                .filter((_, i) => i % (years > 20 ? 3 : 1) === 0 || i === selectedSim.length - 1)
                .map((row) => (
                  <tr
                    key={row.age}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-2 px-3 font-medium">{row.age}歳</td>
                    <td className="py-2 px-3 text-right">
                      {(row.grossIncome / 10000).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                      万
                    </td>
                    <td className="py-2 px-3 text-right text-red-500">
                      -{(row.tax / 10000).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                      万
                    </td>
                    <td className="py-2 px-3 text-right">
                      {(row.netIncome / 10000).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                      万
                    </td>
                    <td className="py-2 px-3 text-right text-gray-500">
                      {(row.livingCost / 10000).toLocaleString()}万
                    </td>
                    <td className="py-2 px-3 text-right text-green-600 font-medium">
                      +
                      {(row.savings / 10000).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}
                      万
                    </td>
                    <td className="py-2 px-3 text-right font-bold text-blue-600">
                      {(row.cumulativeSavings / 10000).toLocaleString(
                        undefined,
                        { maximumFractionDigits: 0 }
                      )}
                      万
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

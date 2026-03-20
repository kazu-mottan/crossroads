"use client";

import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LineChart, Line, Legend,
} from "recharts";

const INCOME = 13_200_000;

// ===== 型定義 =====
interface PhaseResult {
  label: string;
  months: number;
  country: string;
  monthlyCost: number;
  taxRate: number;
  langSchoolCost: number;
  netMonthlySavings: number;
  totalSavings: number;
  totalLangCost: number;
}

// ===== 試住シミュレーター =====
function TrialSimulator() {
  const [georgiaMonths, setGeorgiaMonths] = useState(6);
  const [malaysiaCost, setMalaysiaCost] = useState(130_000);
  const [georgiaCost, setGeorgiaCost] = useState(100_000);
  const [langSchoolMonthly, setLangSchoolMonthly] = useState(7_000);
  const [langSchoolEnabled, setLangSchoolEnabled] = useState(true);

  const monthlyIncome = INCOME / 12;

  const calc = (
    months: number,
    monthlyCost: number,
    taxRate: number,
    langCost: number
  ) => {
    const monthlyTax = monthlyIncome * taxRate;
    const net = monthlyIncome - monthlyTax - monthlyCost - (langCost);
    return {
      monthlyNet: Math.round(net),
      totalSavings: Math.round(net * months),
      totalLangCost: langCost * months,
    };
  };

  const georgiaResult = calc(georgiaMonths, georgiaCost, 0.01, langSchoolEnabled ? langSchoolMonthly : 0);
  const malaysiaMonths = 12 - georgiaMonths;
  const malaysiaResult = calc(malaysiaMonths, malaysiaCost, 0.0, langSchoolEnabled ? langSchoolMonthly : 0);
  const japanResult = calc(12, 200_000, 0.25, 0);

  const phases: PhaseResult[] = [
    {
      label: `Phase 1: ジョージア（${georgiaMonths}ヶ月）`,
      months: georgiaMonths,
      country: "ジョージア",
      monthlyCost: georgiaCost,
      taxRate: 0.01,
      langSchoolCost: langSchoolEnabled ? langSchoolMonthly : 0,
      netMonthlySavings: georgiaResult.monthlyNet,
      totalSavings: georgiaResult.totalSavings,
      totalLangCost: georgiaResult.totalLangCost,
    },
    {
      label: `Phase 2: マレーシア（${malaysiaMonths}ヶ月）`,
      months: malaysiaMonths,
      country: "マレーシア",
      monthlyCost: malaysiaCost,
      taxRate: 0.0,
      langSchoolCost: langSchoolEnabled ? langSchoolMonthly : 0,
      netMonthlySavings: malaysiaResult.monthlyNet,
      totalSavings: malaysiaResult.totalSavings,
      totalLangCost: malaysiaResult.totalLangCost,
    },
  ];

  const combinedSavings = georgiaResult.totalSavings + malaysiaResult.totalSavings;

  const barData = [
    { name: "日本（現状）", 貯蓄: Math.round(japanResult.totalSavings / 10000), fill: "#94a3b8" },
    { name: "ジョージア試住", 貯蓄: Math.round(georgiaResult.totalSavings / 10000), fill: "#f59e0b" },
    { name: "マレーシア移住", 貯蓄: Math.round(malaysiaResult.totalSavings / 10000), fill: "#10b981" },
    { name: "戦略合計（1年）", 貯蓄: Math.round(combinedSavings / 10000), fill: "#3b82f6" },
  ];

  // 月次累積貯蓄グラフ
  const monthlyData = [];
  let cum = 0;
  for (let m = 1; m <= 12; m++) {
    if (m <= georgiaMonths) {
      cum += georgiaResult.monthlyNet;
      monthlyData.push({ month: `${m}月`, 試住戦略: Math.round(cum / 10000), 日本: Math.round((japanResult.monthlyNet * m) / 10000) });
    } else {
      cum += malaysiaResult.monthlyNet;
      monthlyData.push({ month: `${m}月`, 試住戦略: Math.round(cum / 10000), 日本: Math.round((japanResult.monthlyNet * m) / 10000) });
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        試住シミュレーター
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        「ジョージアで試住 → マレーシアで本移住」の1年間の収支を計算します
      </p>

      {/* パラメータ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="font-semibold text-gray-700 mb-4">パラメータ調整</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              ジョージア滞在: <strong>{georgiaMonths}ヶ月</strong>
              （残り{12 - georgiaMonths}ヶ月はマレーシア）
            </label>
            <input type="range" min={1} max={11} value={georgiaMonths}
              onChange={e => setGeorgiaMonths(Number(e.target.value))}
              className="w-full accent-amber-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1ヶ月（試し）</span><span>11ヶ月（じっくり）</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              ジョージア月額生活費: <strong>{(georgiaCost / 10000).toFixed(0)}万円</strong>
            </label>
            <input type="range" min={80000} max={200000} step={5000} value={georgiaCost}
              onChange={e => setGeorgiaCost(Number(e.target.value))}
              className="w-full accent-amber-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>8万（節約）</span><span>20万（快適）</span>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              マレーシア月額生活費: <strong>{(malaysiaCost / 10000).toFixed(0)}万円</strong>
            </label>
            <input type="range" min={100000} max={250000} step={5000} value={malaysiaCost}
              onChange={e => setMalaysiaCost(Number(e.target.value))}
              className="w-full accent-emerald-500" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>10万（節約）</span><span>25万（快適）</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <input type="checkbox" checked={langSchoolEnabled}
                onChange={e => setLangSchoolEnabled(e.target.checked)}
                className="accent-blue-500" id="langToggle" />
              <label htmlFor="langToggle" className="text-sm text-gray-600">
                語学学校: <strong>{langSchoolEnabled ? `月${(langSchoolMonthly / 1000).toFixed(0)}千円` : "なし"}</strong>
              </label>
            </div>
            {langSchoolEnabled && (
              <input type="range" min={0} max={200000} step={1000} value={langSchoolMonthly}
                onChange={e => setLangSchoolMonthly(Number(e.target.value))}
                className="w-full accent-blue-500" />
            )}
            {langSchoolEnabled && (
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0円（独学）</span><span>20万（コーチング）</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* フェーズ別結果カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {phases.map((p) => (
          <div key={p.country}
            className={`rounded-xl border p-5 ${p.country === "ジョージア" ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}>
            <p className="text-sm font-bold text-gray-600 mb-3">{p.label}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">月額生活費</span>
                <span>{(p.monthlyCost / 10000).toFixed(0)}万円</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">税率</span>
                <span>{(p.taxRate * 100).toFixed(0)}%</span>
              </div>
              {langSchoolEnabled && (
                <div className="flex justify-between">
                  <span className="text-gray-600">語学学校</span>
                  <span>{(p.langSchoolCost / 1000).toFixed(0)}千円/月</span>
                </div>
              )}
              <hr className="border-gray-200" />
              <div className="flex justify-between font-bold">
                <span>月次貯蓄</span>
                <span className={p.netMonthlySavings >= 0 ? "text-green-600" : "text-red-500"}>
                  {p.netMonthlySavings >= 0 ? "+" : ""}{(p.netMonthlySavings / 10000).toFixed(1)}万円
                </span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>{p.months}ヶ月計</span>
                <span className={p.totalSavings >= 0 ? "text-green-700" : "text-red-500"}>
                  {p.totalSavings >= 0 ? "+" : ""}{(p.totalSavings / 10000).toFixed(0)}万円
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="rounded-xl border border-blue-300 bg-blue-50 p-5">
          <p className="text-sm font-bold text-gray-600 mb-3">合計（1年間）</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">日本の場合</span>
              <span>{(japanResult.totalSavings / 10000).toFixed(0)}万円</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">試住戦略</span>
              <span className="font-bold text-blue-700">{(combinedSavings / 10000).toFixed(0)}万円</span>
            </div>
            <hr className="border-blue-200" />
            <div className="flex justify-between font-bold text-base">
              <span>差額</span>
              <span className={combinedSavings > japanResult.totalSavings ? "text-green-600" : "text-red-500"}>
                {combinedSavings > japanResult.totalSavings ? "+" : ""}
                {((combinedSavings - japanResult.totalSavings) / 10000).toFixed(0)}万円
              </span>
            </div>
            {langSchoolEnabled && (
              <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-blue-200">
                語学学校総額: {((georgiaResult.totalLangCost + malaysiaResult.totalLangCost) / 10000).toFixed(1)}万円含む
              </div>
            )}
          </div>
        </div>
      </div>

      {/* グラフ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">シナリオ別 年間貯蓄（万円）</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip formatter={(val) => `${Number(val).toLocaleString()}万円`} />
              <Bar dataKey="貯蓄" radius={[4, 4, 0, 0]}>
                {barData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">月次累積貯蓄の推移（万円）</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis />
              <Tooltip formatter={(val) => `${Number(val).toLocaleString()}万円`} />
              <Legend />
              <Line type="monotone" dataKey="試住戦略" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="日本" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-400 mt-2">
            ※ {georgiaMonths}ヶ月目までジョージア、以降マレーシア
          </p>
        </div>
      </div>
    </div>
  );
}

// ===== 語学学校コスト比較 =====
function LangSchoolCalc() {
  const [months, setMonths] = useState(12);

  const methods = [
    { name: "独学（YouTube/Podcast）", monthly: 0, effect: 2, detail: "無料。リスニングは伸びるがスピーキングは別途必要" },
    { name: "Language Exchange（Tandem）", monthly: 0, effect: 3, detail: "無料で実践的。友人もできる" },
    { name: "オンライン英会話（NativeCamp）", monthly: 7_000, effect: 3, detail: "毎日25分。コスパ最強" },
    { name: "マレーシア現地語学学校", monthly: 30_000, effect: 4, detail: "英語環境で通学。ネットワークもできる" },
    { name: "海外生活（没入）", monthly: 0, effect: 5, detail: "生活そのものが英語。最も効果的" },
    { name: "英語コーチング（PROGRIT等）", monthly: 180_000, effect: 4, detail: "短期集中。高額のため非推奨" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">語学学校・英語学習コスト比較</h2>
      <p className="text-gray-500 text-sm mb-6">
        「貯金を使いたくない」前提で最適な英語学習を選ぶ
      </p>
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 inline-flex items-center gap-4">
        <label className="text-sm text-gray-600">計算期間: <strong>{months}ヶ月</strong></label>
        <input type="range" min={1} max={24} value={months}
          onChange={e => setMonths(Number(e.target.value))}
          className="w-40 accent-blue-500" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm bg-white rounded-xl border border-gray-200">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-4 text-gray-600">学習法</th>
              <th className="text-right py-3 px-4 text-gray-600">月額</th>
              <th className="text-right py-3 px-4 text-gray-600">{months}ヶ月合計</th>
              <th className="text-center py-3 px-4 text-gray-600">効果</th>
              <th className="text-left py-3 px-4 text-gray-600">特徴</th>
            </tr>
          </thead>
          <tbody>
            {methods.sort((a, b) => a.monthly - b.monthly).map((m, i) => (
              <tr key={i} className={`border-b border-gray-100 hover:bg-gray-50 ${m.monthly === 0 ? "bg-green-50" : ""}`}>
                <td className="py-3 px-4 font-medium text-gray-800">{m.name}</td>
                <td className="py-3 px-4 text-right">
                  {m.monthly === 0
                    ? <span className="text-green-600 font-bold">無料</span>
                    : `${m.monthly.toLocaleString()}円`}
                </td>
                <td className="py-3 px-4 text-right font-bold">
                  {m.monthly === 0
                    ? <span className="text-green-600">0円</span>
                    : `${(m.monthly * months / 10000).toFixed(1)}万円`}
                </td>
                <td className="py-3 px-4 text-center text-yellow-500">
                  {"★".repeat(m.effect)}{"☆".repeat(5 - m.effect)}
                </td>
                <td className="py-3 px-4 text-gray-500 text-xs">{m.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-700">
        <strong className="text-blue-700">結論：</strong>
        「Tandem（無料）+ NativeCamp（月7,000円）」でスピーキング力を準備し、
        マレーシア移住後は生活没入で一気に伸ばすのが最もコスパが高い戦略。
        コーチングは貯金を使いたくない条件に合わないため非推奨。
      </div>
    </div>
  );
}

// ===== 海外ビジネス実績ロードマップ =====
function BusinessRoadmap() {
  const [companyCountry, setCompanyCountry] = useState<"georgia" | "malaysia" | "uae">("malaysia");

  const setupCosts = {
    georgia: { setup: 30, annual: 10, tax: 1, label: "ジョージア", note: "SBS制度・売上1%" },
    malaysia: { setup: 30, annual: 15, tax: 0, label: "マレーシア", note: "海外源泉所得は非課税" },
    uae: { setup: 100, annual: 50, tax: 0, label: "UAE（ドバイ）", note: "所得税ゼロ・英語圏・信頼性◎" },
  };
  const selected = setupCosts[companyCountry];

  const roadmap = [
    {
      phase: "今〜3ヶ月",
      title: "準備期間",
      icon: "📋",
      color: "border-blue-400 bg-blue-50",
      items: [
        "副業クライアントとリモート継続の確認・交渉",
        "PowerPoint資料を使ってクライアントに海外移住を説明",
        "フリーランス法人の設立先を決定（マレーシア推奨）",
        "LinkedInプロフィールを英語で整備",
        "GitHubのREADMEを英語化",
      ],
    },
    {
      phase: "3〜6ヶ月",
      title: "ジョージア試住",
      icon: "🇬🇪",
      color: "border-amber-400 bg-amber-50",
      items: [
        "ビザなしで入国（ノーリスクで海外生活を体験）",
        "Tandem・NativeCampで英語学習を継続",
        "現地ノマドコミュニティに参加（Tbilisi Nomadsなど）",
        "リモートワーク体制が問題ないか検証",
        "マレーシア法人設立の手続きを並行して進める",
      ],
    },
    {
      phase: "6〜12ヶ月",
      title: "マレーシア本移住",
      icon: "🇲🇾",
      color: "border-emerald-400 bg-emerald-50",
      items: [
        "De Rantauビザ（デジタルノマドビザ）で入国",
        "現地語学学校に通い英語力を本格化",
        "海外法人を活用してToptal等へ登録・グローバル案件獲得",
        "英語でのブログ・LinkedIn発信を開始",
        "現地日系企業・日本進出支援案件を狙う",
      ],
    },
    {
      phase: "1〜2年後",
      title: "グローバルビジネス確立",
      icon: "🌐",
      color: "border-purple-400 bg-purple-50",
      items: [
        "海外クライアント1社以上獲得（月単価+30〜50万円を目標）",
        "国際カンファレンス（AWS/DevFest等）でLT登壇",
        "「海外法人 CEO / ITコンサルタント」の肩書きが確立",
        "帰国するか引き続き海外に残るかを判断",
        "結婚市場では「海外経験+高収入フリーランス」として希少価値UP",
      ],
    },
  ];

  const incomeGoal = [
    { year: "現在", 日本クライアント: 1320, 海外クライアント: 0 },
    { year: "1年後", 日本クライアント: 1320, 海外クライアント: 240 },
    { year: "2年後", 日本クライアント: 1320, 海外クライアント: 480 },
    { year: "3年後", 日本クライアント: 1320, 海外クライアント: 720 },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        海外ビジネス実績ロードマップ
      </h2>
      <p className="text-gray-500 text-sm mb-6">
        ワーホリ（労働者）ではなく「海外法人オーナー × ITコンサル」として実績を積む
      </p>

      {/* ワーホリ vs 法人設立 比較 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <h3 className="font-semibold text-red-700 mb-3">❌ カナダワーホリ（やめた方がよい理由）</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 「アルバイト・労働者」の立場→ビジネス実績にならない</li>
            <li>• 就労制限あり（職種・時間・期間）</li>
            <li>• 月単価110万の案件を持つあなたにはビザのランクが低すぎる</li>
            <li>• 1年限りで、その後のキャリアが不明確</li>
            <li>• 時差が大きい（-17時間）→日本クライアントとの仕事が困難</li>
          </ul>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-semibold text-green-700 mb-3">✅ 海外法人設立（こちらが正解）</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• 「海外法人CEO / ITコンサルタント」→明確なビジネス実績</li>
            <li>• 就労制限なし・永続的な事業体として機能</li>
            <li>• 節税効果が大きい（税率1〜0%）</li>
            <li>• グローバルクライアント獲得の基盤になる</li>
            <li>• 移住先の選択肢が広い（アジア圏中心に時差小）</li>
          </ul>
        </div>
      </div>

      {/* 法人設立コスト計算 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-4">法人設立コストシミュレーション</h3>
        <div className="flex gap-4 mb-4">
          {(["georgia", "malaysia", "uae"] as const).map((k) => (
            <button key={k}
              onClick={() => setCompanyCountry(k)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${companyCountry === k ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {setupCosts[k].label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "初期設立費用", value: `約${selected.setup}万円` },
            { label: "年間維持費", value: `約${selected.annual}万円` },
            { label: "実効税率", value: `${selected.tax}%` },
            { label: "年間節税効果", value: `約${Math.round(INCOME * (0.25 - selected.tax / 100) / 10000)}万円` },
          ].map((item) => (
            <div key={item.label} className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-lg font-bold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {selected.note}。設立費用は初年度のみ。節税効果は日本での税率25%との比較。
        </p>
      </div>

      {/* 収入目標グラフ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <h3 className="font-semibold text-gray-800 mb-4">
          海外クライアント獲得による収入成長目標（万円/年）
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={incomeGoal}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(val) => `${Number(val).toLocaleString()}万円`} />
            <Legend />
            <Bar dataKey="日本クライアント" stackId="a" fill="#3b82f6" />
            <Bar dataKey="海外クライアント" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-500 mt-2">
          ※海外クライアント月20〜60万円（Toptal等）を想定。日本の案件は現状維持。
        </p>
      </div>

      {/* ロードマップ */}
      <h3 className="font-semibold text-gray-800 mb-4">実行ロードマップ</h3>
      <div className="space-y-4">
        {roadmap.map((phase, i) => (
          <div key={i} className={`border-l-4 ${phase.color} rounded-r-xl p-5`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{phase.icon}</span>
              <div>
                <p className="text-xs font-bold text-gray-500">{phase.phase}</p>
                <p className="font-bold text-gray-900">{phase.title}</p>
              </div>
            </div>
            <ul className="space-y-1.5">
              {phase.items.map((item, j) => (
                <li key={j} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-gray-400 mt-0.5">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== メインページ =====
export default function StrategyContent() {
  const [tab, setTab] = useState<"trial" | "lang" | "business">("trial");

  const tabs = [
    { id: "trial" as const, label: "試住シミュレーター", icon: "🧳" },
    { id: "lang" as const, label: "語学学習コスト", icon: "📚" },
    { id: "business" as const, label: "海外ビジネス実績", icon: "🌐" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        海外移住・ビジネス戦略
      </h1>
      <p className="text-gray-500 mb-6">
        ジョージア試住 → マレーシア本移住 → グローバルビジネス確立の3段階戦略
      </p>

      {/* タブ */}
      <div className="flex gap-2 mb-8 border-b border-gray-200">
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
              tab === t.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}>
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {tab === "trial" && <TrialSimulator />}
      {tab === "lang" && <LangSchoolCalc />}
      {tab === "business" && <BusinessRoadmap />}
    </div>
  );
}

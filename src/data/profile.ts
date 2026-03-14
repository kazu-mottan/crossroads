// ===== 現在のプロフィール・前提データ =====

export const profile = {
  age: 29,
  targetAge: 30, // 意思決定のタイミング
  planHorizon: 65, // シミュレーション終了年齢

  // 現在の収入
  income: {
    mainJob: 7_000_000, // アクセンチュア年収
    sideJob: 13_000_000, // 副業年収
    total: 20_000_000,
  },

  // 副業→本業化した場合
  freelance: {
    monthlyRate: 1_100_000, // 月単価110万
    annualRate: 13_200_000,
    // フリーランスの経費率・税負担を考慮した手取り目安
    estimatedTakeHome: 9_500_000,
  },

  // 生活費の目安（月額）
  livingCost: {
    japan: 200_000,
    // 主要な移住先候補の生活費
    overseas: {
      singapore: 350_000,
      dubai: 300_000,
      thailand: 120_000,
      portugal: 180_000,
      georgia: 100_000,
      malaysia: 130_000,
    } as Record<string, number>,
  },

  // 現在の資産
  savings: 3_000_000, // 仮値（貯金はあまり使いたくない）
} as const;

// ===== 各シナリオ定義 =====
export type ScenarioId =
  | "stay-japan-dual"
  | "stay-japan-freelance"
  | "overseas-freelance"
  | "overseas-dual";

export interface Scenario {
  id: ScenarioId;
  label: string;
  description: string;
  mainJobIncome: number;
  sideJobIncome: number;
  monthlyCost: number;
  taxRate: number;
  location: string;
  pros: string[];
  cons: string[];
}

export const scenarios: Scenario[] = [
  {
    id: "stay-japan-dual",
    label: "日本残留 + 本業＆副業継続",
    description: "アクセンチュアに在籍しながら副業も継続。安定重視。",
    mainJobIncome: 7_000_000,
    sideJobIncome: 13_000_000,
    monthlyCost: 200_000,
    taxRate: 0.33,
    location: "日本",
    pros: [
      "安定収入（社会保険・福利厚生）",
      "副業収入もそのまま維持",
      "キャリアの空白なし",
      "リスク最小",
    ],
    cons: [
      "税負担が重い（累進課税で約33%）",
      "自由な時間が限られる",
      "海外経験が積めない",
      "英語を使う機会が少ない",
    ],
  },
  {
    id: "stay-japan-freelance",
    label: "日本残留 + フリーランス専業",
    description: "アクセンチュアを退職し、副業を本業化。",
    mainJobIncome: 0,
    sideJobIncome: 13_200_000,
    monthlyCost: 200_000,
    taxRate: 0.25,
    location: "日本",
    pros: [
      "時間の自由度が大幅UP",
      "法人化で節税可能",
      "副業に集中して単価UPの可能性",
      "英語学習の時間を確保しやすい",
    ],
    cons: [
      "社会保険を自分で負担",
      "収入が不安定になるリスク",
      "アクセンチュアのキャリアを手放す",
      "海外経験は積めない",
    ],
  },
  {
    id: "overseas-freelance",
    label: "海外移住 + フリーランス専業",
    description: "退職＆海外移住。副業を本業として海外からリモートワーク。",
    mainJobIncome: 0,
    sideJobIncome: 13_200_000,
    monthlyCost: 150_000, // 東南アジア等の平均
    taxRate: 0.15, // 税制優遇国を想定
    location: "海外（税制優遇国）",
    pros: [
      "英語環境で自然に語学力UP",
      "生活費が安い国なら貯蓄ペースUP",
      "税制優遇で手取りが増える可能性",
      "人生経験・視野の拡大",
      "自由な働き方",
    ],
    cons: [
      "ビザ・法的手続きの手間",
      "日本のクライアントとの時差問題",
      "孤独・文化の違いへのストレス",
      "健康保険の自己負担",
      "結婚相手を見つけにくい可能性",
    ],
  },
  {
    id: "overseas-dual",
    label: "海外移住 + 本業＆副業（リモート）",
    description: "アクセンチュアをリモート継続しながら海外拠点。可能なら最強。",
    mainJobIncome: 7_000_000,
    sideJobIncome: 13_000_000,
    monthlyCost: 150_000,
    taxRate: 0.2,
    location: "海外（リモート可の場合）",
    pros: [
      "安定収入＋副業の両立",
      "英語環境での生活",
      "生活費を抑えつつ高収入を維持",
    ],
    cons: [
      "アクセンチュアが海外リモートを許可するか不明",
      "税務が複雑（二重課税リスク）",
      "時差による業務効率低下",
      "実現可能性が低い",
    ],
  },
];

// ===== 海外移住先の詳細データ =====
export interface CountryOption {
  name: string;
  nameJa: string;
  monthlyCost: number;
  taxRate: number;
  visaEase: number; // 1-5
  englishLevel: number; // 1-5
  internetSpeed: number; // Mbps目安
  safety: number; // 1-5
  timezone: string;
  japanTimeDiff: number; // hours
  highlights: string[];
}

export const countries: CountryOption[] = [
  {
    name: "Thailand",
    nameJa: "タイ（バンコク/チェンマイ）",
    monthlyCost: 120_000,
    taxRate: 0.0, // LTRビザ等で免税の可能性
    visaEase: 4,
    englishLevel: 3,
    internetSpeed: 200,
    safety: 4,
    timezone: "UTC+7",
    japanTimeDiff: -2,
    highlights: ["生活費が安い", "日本人コミュニティが大きい", "時差が少ない", "食事が美味しい"],
  },
  {
    name: "Malaysia",
    nameJa: "マレーシア（KL）",
    monthlyCost: 130_000,
    taxRate: 0.0, // 海外源泉所得は非課税
    visaEase: 4,
    englishLevel: 4,
    internetSpeed: 100,
    safety: 4,
    timezone: "UTC+8",
    japanTimeDiff: -1,
    highlights: ["英語が通じやすい", "多文化", "時差1時間", "医療水準が高い"],
  },
  {
    name: "Georgia",
    nameJa: "ジョージア",
    monthlyCost: 100_000,
    taxRate: 0.01, // Small Business Status
    visaEase: 5,
    englishLevel: 2,
    internetSpeed: 50,
    safety: 4,
    timezone: "UTC+4",
    japanTimeDiff: -5,
    highlights: ["ビザなしで1年滞在可", "税率1%", "生活費が非常に安い", "ノマドに人気"],
  },
  {
    name: "Dubai",
    nameJa: "ドバイ（UAE）",
    monthlyCost: 300_000,
    taxRate: 0.0,
    visaEase: 3,
    englishLevel: 5,
    internetSpeed: 300,
    safety: 5,
    timezone: "UTC+4",
    japanTimeDiff: -5,
    highlights: ["所得税ゼロ", "英語環境", "インフラが充実", "生活費は高め"],
  },
  {
    name: "Portugal",
    nameJa: "ポルトガル（リスボン）",
    monthlyCost: 180_000,
    taxRate: 0.2,
    visaEase: 3,
    englishLevel: 3,
    internetSpeed: 100,
    safety: 5,
    timezone: "UTC+0",
    japanTimeDiff: -9,
    highlights: ["D7ビザでフリーランス可", "EU圏", "気候が良い", "時差が大きい"],
  },
  {
    name: "Singapore",
    nameJa: "シンガポール",
    monthlyCost: 350_000,
    taxRate: 0.15,
    visaEase: 2,
    englishLevel: 5,
    internetSpeed: 300,
    safety: 5,
    timezone: "UTC+8",
    japanTimeDiff: -1,
    highlights: ["時差1時間", "英語公用語", "ビジネス環境◎", "生活費が非常に高い"],
  },
];

import { profile, countries as allCountries, type Scenario, type CountryOption } from "@/data/profile";

// ===== 財務シミュレーション =====

export interface YearlySnapshot {
  age: number;
  year: number;
  grossIncome: number;
  tax: number;
  netIncome: number;
  livingCost: number;
  savings: number;
  cumulativeSavings: number;
}

export function simulateFinancials(
  scenario: Scenario,
  years: number = 36, // 29→65歳
  initialSavings: number = profile.savings,
  incomeGrowthRate: number = 0.02 // 年2%の収入成長
): YearlySnapshot[] {
  const snapshots: YearlySnapshot[] = [];
  let cumSavings = initialSavings;
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < years; i++) {
    const age = profile.age + i;
    const growthFactor = Math.pow(1 + incomeGrowthRate, i);

    const grossIncome =
      (scenario.mainJobIncome + scenario.sideJobIncome) * growthFactor;
    const tax = grossIncome * scenario.taxRate;
    const netIncome = grossIncome - tax;
    const annualCost = scenario.monthlyCost * 12;
    const savings = netIncome - annualCost;
    cumSavings += savings;

    snapshots.push({
      age,
      year: currentYear + i,
      grossIncome: Math.round(grossIncome),
      tax: Math.round(tax),
      netIncome: Math.round(netIncome),
      livingCost: annualCost,
      savings: Math.round(savings),
      cumulativeSavings: Math.round(cumSavings),
    });
  }

  return snapshots;
}

// ===== 国別コスト比較 =====

export interface CountryCostComparison {
  country: CountryOption;
  annualCost: number;
  annualTax: number;
  annualNetSavings: number;
  fiveYearSavings: number;
  tenYearSavings: number;
}

export function compareCountries(
  income: number = profile.freelance.annualRate
): CountryCostComparison[] {
  return (
    [
      {
        name: "Japan",
        nameJa: "日本（現状維持）",
        monthlyCost: profile.livingCost.japan,
        taxRate: 0.25,
        visaEase: 5,
        englishLevel: 1,
        internetSpeed: 200,
        safety: 5,
        timezone: "UTC+9",
        japanTimeDiff: 0,
        highlights: ["母国", "安定"],
      } as CountryOption,
    ]
      .concat(allCountries)
      .map((country: CountryOption) => {
        const annualCost = country.monthlyCost * 12;
        const annualTax = income * country.taxRate;
        const annualNetSavings = income - annualTax - annualCost;
        return {
          country,
          annualCost,
          annualTax,
          annualNetSavings,
          fiveYearSavings: annualNetSavings * 5,
          tenYearSavings: annualNetSavings * 10,
        };
      })
  );
}

// ===== 意思決定スコアリング =====

export interface DecisionScore {
  scenarioId: string;
  label: string;
  scores: {
    financial: number; // 0-100
    freedom: number;
    englishGrowth: number;
    careerSafety: number;
    marriageProspect: number;
    lifeExperience: number;
    overall: number;
  };
}

export function scoreScenarios(
  weights = {
    financial: 0.25,
    freedom: 0.15,
    englishGrowth: 0.2,
    careerSafety: 0.1,
    marriageProspect: 0.15,
    lifeExperience: 0.15,
  }
): DecisionScore[] {
  const rawScores: Record<
    string,
    Omit<DecisionScore["scores"], "overall"> & { label: string }
  > = {
    "stay-japan-dual": {
      label: "日本 + 本業＆副業",
      financial: 85,
      freedom: 30,
      englishGrowth: 20,
      careerSafety: 95,
      marriageProspect: 80,
      lifeExperience: 30,
    },
    "stay-japan-freelance": {
      label: "日本 + フリーランス",
      financial: 70,
      freedom: 75,
      englishGrowth: 30,
      careerSafety: 60,
      marriageProspect: 75,
      lifeExperience: 40,
    },
    "overseas-freelance": {
      label: "海外 + フリーランス",
      financial: 80,
      freedom: 90,
      englishGrowth: 90,
      careerSafety: 45,
      marriageProspect: 50,
      lifeExperience: 95,
    },
    "overseas-dual": {
      label: "海外 + 本業＆副業",
      financial: 90,
      freedom: 50,
      englishGrowth: 80,
      careerSafety: 70,
      marriageProspect: 55,
      lifeExperience: 80,
    },
  };

  return Object.entries(rawScores).map(([id, raw]) => {
    const overall = Math.round(
      raw.financial * weights.financial +
        raw.freedom * weights.freedom +
        raw.englishGrowth * weights.englishGrowth +
        raw.careerSafety * weights.careerSafety +
        raw.marriageProspect * weights.marriageProspect +
        raw.lifeExperience * weights.lifeExperience
    );
    return {
      scenarioId: id,
      label: raw.label,
      scores: {
        financial: raw.financial,
        freedom: raw.freedom,
        englishGrowth: raw.englishGrowth,
        careerSafety: raw.careerSafety,
        marriageProspect: raw.marriageProspect,
        lifeExperience: raw.lifeExperience,
        overall,
      },
    };
  });
}

// ===== 英語学習プラン =====

export interface EnglishPlan {
  method: string;
  monthlyCost: number;
  effectiveness: number; // 1-5
  hoursPerWeek: number;
  description: string;
}

export const englishPlans: EnglishPlan[] = [
  {
    method: "オンライン英会話（DMM/NativeCamp）",
    monthlyCost: 7_000,
    effectiveness: 3,
    hoursPerWeek: 3.5,
    description: "毎日25分。コスパ最強。海外移住前の準備に最適。",
  },
  {
    method: "海外移住（英語環境への没入）",
    monthlyCost: 0,
    effectiveness: 5,
    hoursPerWeek: 40,
    description: "生活そのものが英語。最も効果的だが移住が前提。",
  },
  {
    method: "YouTube / Podcast（無料教材）",
    monthlyCost: 0,
    effectiveness: 2,
    hoursPerWeek: 5,
    description: "隙間時間に。リスニング力は伸びるがスピーキングは別途必要。",
  },
  {
    method: "英語コーチング（PROGRIT等）",
    monthlyCost: 180_000,
    effectiveness: 4,
    hoursPerWeek: 15,
    description: "短期集中で伸ばせるが高額。貯金を使いたくないなら非推奨。",
  },
  {
    method: "Language Exchange（Tandem等）",
    monthlyCost: 0,
    effectiveness: 3,
    hoursPerWeek: 3,
    description: "無料で実践的。友人もできる。海外移住の準備にも。",
  },
];

// ===== 結婚タイムライン分析 =====

export interface MarriageTimeline {
  scenario: string;
  meetingAge: string;
  marriageAge: string;
  childAge: string;
  difficulty: number; // 1-5 (5=難しい)
  notes: string;
}

export const marriageTimelines: MarriageTimeline[] = [
  {
    scenario: "日本残留・会社員",
    meetingAge: "29-31歳",
    marriageAge: "31-33歳",
    childAge: "33-35歳",
    difficulty: 2,
    notes:
      "最も出会いの機会が多い。社会的信用もある。マッチングアプリや社内恋愛。",
  },
  {
    scenario: "日本残留・フリーランス",
    meetingAge: "30-33歳",
    marriageAge: "32-35歳",
    childAge: "34-37歳",
    difficulty: 3,
    notes:
      "出会いの場は減るが、時間の自由度で積極的に活動可能。収入証明がネック。",
  },
  {
    scenario: "海外移住・現地パートナー",
    meetingAge: "30-34歳",
    marriageAge: "33-36歳",
    childAge: "35-38歳",
    difficulty: 4,
    notes:
      "国際結婚の可能性。文化の違い、法的手続きの複雑さ。ただし視野は広がる。",
  },
  {
    scenario: "海外移住→帰国後",
    meetingAge: "32-35歳",
    marriageAge: "34-37歳",
    childAge: "36-39歳",
    difficulty: 3,
    notes:
      "海外経験は魅力になるが、帰国後の再スタートに時間がかかる可能性。",
  },
];

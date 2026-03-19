import { createRequire } from "module";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const PptxGenJS = require(path.join(__dirname, "..", "node_modules", "pptxgenjs", "dist", "pptxgen.cjs.js"));

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Life Planner";

// ===== カラーパレット =====
const C = {
  dark: "1a1a2e",
  primary: "16213e",
  accent: "0f3460",
  highlight: "e94560",
  white: "ffffff",
  lightGray: "f0f0f0",
  gray: "888888",
  green: "27ae60",
  blue: "2980b9",
  orange: "f39c12",
};

// ===== ヘルパー =====
function addTitle(slide, title, subtitle) {
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: "100%", h: 1.2,
    fill: { color: C.primary },
  });
  slide.addText(title, {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, fontFace: "Yu Gothic", color: C.white, bold: true,
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: 0.7, w: 12, h: 0.4,
      fontSize: 14, fontFace: "Yu Gothic", color: C.lightGray,
    });
  }
}

function addFooter(slide, pageNum) {
  slide.addText("Confidential | リモートワーク体制のご提案", {
    x: 0.5, y: 7.0, w: 10, h: 0.3,
    fontSize: 9, fontFace: "Yu Gothic", color: C.gray,
  });
  slide.addText(`${pageNum}`, {
    x: 12.5, y: 7.0, w: 0.5, h: 0.3,
    fontSize: 9, fontFace: "Yu Gothic", color: C.gray, align: "right",
  });
}

// ===== スライド1: 表紙 =====
const s1 = pptx.addSlide();
s1.addShape(pptx.ShapeType.rect, {
  x: 0, y: 0, w: "100%", h: "100%",
  fill: { color: C.primary },
});
s1.addText("リモートワーク体制移行の\nご提案", {
  x: 1, y: 1.5, w: 11, h: 2,
  fontSize: 40, fontFace: "Yu Gothic", color: C.white, bold: true,
  lineSpacingMultiple: 1.3,
});
s1.addText("— 海外拠点からのフルリモート稼働について —", {
  x: 1, y: 3.5, w: 11, h: 0.6,
  fontSize: 18, fontFace: "Yu Gothic", color: C.lightGray,
});
s1.addShape(pptx.ShapeType.rect, {
  x: 1, y: 4.5, w: 3, h: 0.05, fill: { color: C.highlight },
});
s1.addText("2026年3月\nStrictly Confidential", {
  x: 1, y: 5, w: 11, h: 1,
  fontSize: 14, fontFace: "Yu Gothic", color: C.gray,
});

// ===== スライド2: アジェンダ =====
const s2 = pptx.addSlide();
addTitle(s2, "アジェンダ");
const agenda = [
  "1. ご提案の背景・目的",
  "2. リモートワーク移行プラン",
  "3. 品質・コミュニケーション体制",
  "4. 想定されるご懸念と対策",
  "5. 契約条件のご相談",
  "6. まとめ・ネクストステップ",
];
agenda.forEach((item, i) => {
  s2.addText(item, {
    x: 1.5, y: 1.6 + i * 0.7, w: 10, h: 0.6,
    fontSize: 20, fontFace: "Yu Gothic", color: i === 0 ? C.highlight : C.dark,
    bold: i === 0,
  });
});
addFooter(s2, 2);

// ===== スライド3: 背景・目的 =====
const s3 = pptx.addSlide();
addTitle(s3, "1. ご提案の背景・目的", "なぜリモートワーク体制への移行をお願いしたいのか");

s3.addText("背景", {
  x: 0.5, y: 1.5, w: 5.5, h: 0.4,
  fontSize: 16, fontFace: "Yu Gothic", color: C.accent, bold: true,
});
const bgItems = [
  "• 現在のプロジェクトで安定した成果を継続的に提供中",
  "• 個人的なキャリア成長のため、海外拠点での活動を計画",
  "• IT業界全体でリモートワークが標準化している潮流",
  "• グローバル視点の獲得により、さらなる価値提供が可能",
];
bgItems.forEach((item, i) => {
  s3.addText(item, {
    x: 0.7, y: 2.0 + i * 0.5, w: 5.5, h: 0.45,
    fontSize: 13, fontFace: "Yu Gothic", color: C.dark,
  });
});

s3.addText("お伝えしたいこと", {
  x: 6.8, y: 1.5, w: 6, h: 0.4,
  fontSize: 16, fontFace: "Yu Gothic", color: C.highlight, bold: true,
});
s3.addShape(pptx.ShapeType.roundRect, {
  x: 6.8, y: 2.0, w: 5.8, h: 2.5,
  fill: { color: "fef3f3" }, rectRadius: 0.15,
  line: { color: C.highlight, width: 1 },
});
s3.addText(
  "拠点が変わっても、\nこれまでと同等以上の品質・\nスピードでお仕事をお届けします。\n\nむしろ、時間の自由度が上がることで\nより柔軟な対応が可能になります。", {
  x: 7.1, y: 2.2, w: 5.3, h: 2.2,
  fontSize: 13, fontFace: "Yu Gothic", color: C.dark, lineSpacingMultiple: 1.4,
});

s3.addText("目的: 貴社との継続的なパートナーシップを維持しながら、\n稼働体制をリモートに移行させていただきたい", {
  x: 0.5, y: 5.0, w: 12, h: 0.8,
  fontSize: 14, fontFace: "Yu Gothic", color: C.accent, bold: true,
  fill: { color: "eef4ff" },
  align: "center",
});
addFooter(s3, 3);

// ===== スライド4: リモートワーク移行プラン =====
const s4 = pptx.addSlide();
addTitle(s4, "2. リモートワーク移行プラン", "段階的な移行で品質を担保");

const phases = [
  { phase: "Phase 1", period: "1-2ヶ月目", title: "準備期間", color: C.blue,
    items: "• 現行業務の引き継ぎ文書整備\n• リモート環境のセットアップ\n• コミュニケーションツール確認\n• 日本時間での稼働ルール合意" },
  { phase: "Phase 2", period: "3-4ヶ月目", title: "ハイブリッド期間", color: C.green,
    items: "• 週3-4日リモート稼働開始\n• 定期的なオンライン定例会議\n• 課題の早期発見と対策\n• 必要に応じて出社対応" },
  { phase: "Phase 3", period: "5ヶ月目〜", title: "フルリモート", color: C.orange,
    items: "• フルリモート体制に完全移行\n• 月次レビューで品質を確認\n• 必要時は一時帰国で対面MTG\n• 安定運用の継続" },
];

phases.forEach((p, i) => {
  const x = 0.5 + i * 4.2;
  s4.addShape(pptx.ShapeType.roundRect, {
    x, y: 1.5, w: 3.8, h: 0.7,
    fill: { color: p.color }, rectRadius: 0.1,
  });
  s4.addText(`${p.phase}  ${p.period}`, {
    x, y: 1.5, w: 3.8, h: 0.35,
    fontSize: 11, fontFace: "Yu Gothic", color: C.white, align: "center",
  });
  s4.addText(p.title, {
    x, y: 1.85, w: 3.8, h: 0.35,
    fontSize: 15, fontFace: "Yu Gothic", color: C.white, bold: true, align: "center",
  });
  s4.addShape(pptx.ShapeType.roundRect, {
    x, y: 2.4, w: 3.8, h: 2.8,
    fill: { color: C.lightGray }, rectRadius: 0.1,
  });
  s4.addText(p.items, {
    x: x + 0.2, y: 2.6, w: 3.4, h: 2.4,
    fontSize: 12, fontFace: "Yu Gothic", color: C.dark, lineSpacingMultiple: 1.5,
  });
});

// 矢印
s4.addText("→", { x: 4.1, y: 1.65, w: 0.5, h: 0.4, fontSize: 24, color: C.gray, align: "center" });
s4.addText("→", { x: 8.3, y: 1.65, w: 0.5, h: 0.4, fontSize: 24, color: C.gray, align: "center" });

s4.addText("移行期間中も成果物の品質・納期は現行水準を維持します", {
  x: 0.5, y: 5.5, w: 12, h: 0.5,
  fontSize: 13, fontFace: "Yu Gothic", color: C.accent, bold: true, align: "center",
});
addFooter(s4, 4);

// ===== スライド5: 品質・コミュニケーション体制 =====
const s5 = pptx.addSlide();
addTitle(s5, "3. 品質・コミュニケーション体制", "距離を感じさせない仕組み");

// 時差
s5.addText("時差について", {
  x: 0.5, y: 1.5, w: 6, h: 0.4,
  fontSize: 16, fontFace: "Yu Gothic", color: C.accent, bold: true,
});

const tzRows = [
  ["移住先候補", "時差", "日本時間 10:00-19:00 の現地時間"],
  ["マレーシア（KL）", "-1時間", "9:00 - 18:00（ほぼ同じ）"],
  ["ジョージア（トビリシ）", "-5時間", "5:00 - 14:00（早朝スタート）"],
];
s5.addTable(tzRows, {
  x: 0.5, y: 2.0, w: 6,
  fontSize: 11, fontFace: "Yu Gothic",
  border: { type: "solid", pt: 0.5, color: "cccccc" },
  colW: [2.5, 1.2, 2.3],
  rowH: [0.35, 0.35, 0.35],
  autoPage: false,
  headerRow: true,
  color: C.dark,
  headerRowColor: C.white,
  headerRowBackColor: C.accent,
});

// コミュニケーション
s5.addText("コミュニケーション体制", {
  x: 7, y: 1.5, w: 6, h: 0.4,
  fontSize: 16, fontFace: "Yu Gothic", color: C.accent, bold: true,
});
const commItems = [
  ["日次", "Slackで進捗共有・テキスト報告"],
  ["週次", "オンライン定例（30-60分）"],
  ["月次", "成果レビュー・翌月計画すり合わせ"],
  ["随時", "緊急時は即座にビデオ通話対応"],
  ["四半期", "一時帰国での対面ミーティング"],
];
commItems.forEach(([freq, desc], i) => {
  s5.addShape(pptx.ShapeType.roundRect, {
    x: 7, y: 2.0 + i * 0.55, w: 1.2, h: 0.45,
    fill: { color: C.accent }, rectRadius: 0.08,
  });
  s5.addText(freq, {
    x: 7, y: 2.0 + i * 0.55, w: 1.2, h: 0.45,
    fontSize: 11, fontFace: "Yu Gothic", color: C.white, align: "center", bold: true,
  });
  s5.addText(desc, {
    x: 8.4, y: 2.0 + i * 0.55, w: 4.5, h: 0.45,
    fontSize: 12, fontFace: "Yu Gothic", color: C.dark,
  });
});

// ツール
s5.addText("使用ツール", {
  x: 0.5, y: 4.0, w: 6, h: 0.4,
  fontSize: 16, fontFace: "Yu Gothic", color: C.accent, bold: true,
});
const tools = ["Slack / Teams", "Zoom / Google Meet", "GitHub / GitLab", "Notion / Confluence", "Jira / Backlog"];
tools.forEach((tool, i) => {
  s5.addShape(pptx.ShapeType.roundRect, {
    x: 0.5 + i * 2.3, y: 4.5, w: 2.1, h: 0.5,
    fill: { color: "e8f0fe" }, rectRadius: 0.1,
    line: { color: C.blue, width: 0.5 },
  });
  s5.addText(tool, {
    x: 0.5 + i * 2.3, y: 4.5, w: 2.1, h: 0.5,
    fontSize: 11, fontFace: "Yu Gothic", color: C.accent, align: "center",
  });
});

s5.addShape(pptx.ShapeType.roundRect, {
  x: 0.5, y: 5.3, w: 12, h: 0.7,
  fill: { color: "f0faf0" }, rectRadius: 0.1,
});
s5.addText("ポイント: マレーシアなら時差わずか1時間。日本と同じ感覚でリアルタイムに連携できます。\nジョージアでも日本の午前中（10-14時）は現地の業務時間内でカバー可能です。", {
  x: 0.7, y: 5.35, w: 11.6, h: 0.6,
  fontSize: 11, fontFace: "Yu Gothic", color: C.green, lineSpacingMultiple: 1.3,
});
addFooter(s5, 5);

// ===== スライド6: 想定されるご懸念と対策 =====
const s6 = pptx.addSlide();
addTitle(s6, "4. 想定されるご懸念と対策");

const concerns = [
  { q: "品質が下がるのでは？", a: "移行前と同じKPI・レビュープロセスを維持。月次レビューで品質を可視化。むしろ集中できる環境で生産性向上が見込めます。" },
  { q: "緊急対応が遅れるのでは？", a: "Slackは常時オンライン。緊急時は即座にビデオ通話対応可能。SLAを事前に合意します。" },
  { q: "情報セキュリティは大丈夫？", a: "VPN経由での接続、端末暗号化、二要素認証を徹底。現行のセキュリティポリシーに完全準拠します。" },
  { q: "対面が必要な場面は？", a: "四半期に1回の一時帰国で対面MTGを実施。重要なマイルストーンには柔軟に対応します。" },
  { q: "契約形態はどうなる？", a: "現行の業務委託契約を維持。稼働場所の変更のみ。成果物ベースの評価は変わりません。" },
];

concerns.forEach((c, i) => {
  const y = 1.5 + i * 1.05;
  s6.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y, w: 4, h: 0.85,
    fill: { color: "fff5f5" }, rectRadius: 0.1,
    line: { color: C.highlight, width: 0.5 },
  });
  s6.addText(`Q: ${c.q}`, {
    x: 0.7, y: y + 0.1, w: 3.6, h: 0.65,
    fontSize: 12, fontFace: "Yu Gothic", color: C.highlight, bold: true, valign: "middle",
  });
  s6.addText("→", {
    x: 4.5, y, w: 0.5, h: 0.85,
    fontSize: 18, fontFace: "Yu Gothic", color: C.gray, align: "center", valign: "middle",
  });
  s6.addShape(pptx.ShapeType.roundRect, {
    x: 5, y, w: 8, h: 0.85,
    fill: { color: "f0faf0" }, rectRadius: 0.1,
    line: { color: C.green, width: 0.5 },
  });
  s6.addText(`A: ${c.a}`, {
    x: 5.2, y: y + 0.05, w: 7.6, h: 0.75,
    fontSize: 11, fontFace: "Yu Gothic", color: C.dark, valign: "middle", lineSpacingMultiple: 1.2,
  });
});
addFooter(s6, 6);

// ===== スライド7: 契約条件 =====
const s7 = pptx.addSlide();
addTitle(s7, "5. 契約条件のご相談");

s7.addText("変更なし（維持する項目）", {
  x: 0.5, y: 1.5, w: 6, h: 0.4,
  fontSize: 16, fontFace: "Yu Gothic", color: C.green, bold: true,
});

const keepRows = [
  ["項目", "内容"],
  ["月額単価", "現行通り（110万円/月）"],
  ["契約形態", "業務委託契約（準委任 or 請負）"],
  ["成果物・品質基準", "現行のKPI・レビュー基準を維持"],
  ["稼働時間", "月160-180時間（現行通り）"],
  ["コミュニケーション", "日本語での業務遂行"],
];
s7.addTable(keepRows, {
  x: 0.5, y: 2.0, w: 5.5,
  fontSize: 12, fontFace: "Yu Gothic",
  border: { type: "solid", pt: 0.5, color: "cccccc" },
  colW: [2, 3.5],
  rowH: [0.4, 0.4, 0.4, 0.4, 0.4, 0.4],
  autoPage: false,
  headerRow: true,
  color: C.dark,
  headerRowColor: C.white,
  headerRowBackColor: C.green,
});

s7.addText("変更をお願いしたい項目", {
  x: 7, y: 1.5, w: 6, h: 0.4,
  fontSize: 16, fontFace: "Yu Gothic", color: C.blue, bold: true,
});

const changeRows = [
  ["項目", "変更内容"],
  ["稼働場所", "オフィス → フルリモート（海外拠点）"],
  ["MTG形態", "対面 → オンライン中心"],
  ["対面頻度", "四半期に1回の一時帰国"],
  ["連絡可能時間", "日本時間 10:00-19:00 を基本"],
];
s7.addTable(changeRows, {
  x: 7, y: 2.0, w: 5.5,
  fontSize: 12, fontFace: "Yu Gothic",
  border: { type: "solid", pt: 0.5, color: "cccccc" },
  colW: [2, 3.5],
  rowH: [0.4, 0.4, 0.4, 0.4, 0.4],
  autoPage: false,
  headerRow: true,
  color: C.dark,
  headerRowColor: C.white,
  headerRowBackColor: C.blue,
});

s7.addShape(pptx.ShapeType.roundRect, {
  x: 0.5, y: 5.0, w: 12, h: 1.0,
  fill: { color: "eef4ff" }, rectRadius: 0.1,
  line: { color: C.blue, width: 1 },
});
s7.addText("ご提案のポイント\n単価・品質・稼働量はすべて現行維持。変更は「稼働場所」と「MTG形態」のみです。\n貴社にとってのリスクを最小化しつつ、パートナーシップを継続させていただきたいと考えています。", {
  x: 0.7, y: 5.1, w: 11.6, h: 0.85,
  fontSize: 12, fontFace: "Yu Gothic", color: C.accent, lineSpacingMultiple: 1.3,
});
addFooter(s7, 7);

// ===== スライド8: まとめ =====
const s8 = pptx.addSlide();
addTitle(s8, "6. まとめ・ネクストステップ");

s8.addText("まとめ", {
  x: 0.5, y: 1.5, w: 12, h: 0.4,
  fontSize: 18, fontFace: "Yu Gothic", color: C.accent, bold: true,
});

const summaryItems = [
  "リモート移行後も、品質・納期・コミュニケーションは現行水準を維持します",
  "段階的な移行（2ヶ月の準備期間）により、リスクを最小化します",
  "単価・契約形態は一切変更なし。変わるのは稼働場所のみです",
  "時差が少ない拠点（マレーシア: -1時間）を候補としており、即時連携が可能です",
  "四半期に1回の帰国で、対面でのすり合わせも継続します",
];
summaryItems.forEach((item, i) => {
  s8.addShape(pptx.ShapeType.ellipse, {
    x: 0.7, y: 2.15 + i * 0.6, w: 0.25, h: 0.25,
    fill: { color: C.green },
  });
  s8.addText("✓", {
    x: 0.7, y: 2.1 + i * 0.6, w: 0.25, h: 0.3,
    fontSize: 12, fontFace: "Yu Gothic", color: C.white, align: "center",
  });
  s8.addText(item, {
    x: 1.2, y: 2.1 + i * 0.6, w: 11, h: 0.5,
    fontSize: 14, fontFace: "Yu Gothic", color: C.dark,
  });
});

s8.addText("ネクストステップ", {
  x: 0.5, y: 5.2, w: 12, h: 0.4,
  fontSize: 18, fontFace: "Yu Gothic", color: C.highlight, bold: true,
});

const nextSteps = [
  ["Step 1", "本資料の内容についてご意見・ご質問をいただく"],
  ["Step 2", "リモート稼働の条件を合意（SLA・連絡体制等）"],
  ["Step 3", "Phase 1（準備期間）を開始"],
];
nextSteps.forEach(([step, desc], i) => {
  s8.addShape(pptx.ShapeType.roundRect, {
    x: 0.5 + i * 4.2, y: 5.8, w: 3.8, h: 0.7,
    fill: { color: i === 0 ? C.highlight : C.accent }, rectRadius: 0.1,
  });
  s8.addText(`${step}: ${desc}`, {
    x: 0.7 + i * 4.2, y: 5.8, w: 3.4, h: 0.7,
    fontSize: 12, fontFace: "Yu Gothic", color: C.white, valign: "middle",
  });
});
addFooter(s8, 8);

// ===== 出力 =====
const outDir = "./docs";
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/remote-work-proposal.pptx`;
await pptx.writeFile({ fileName: outPath });
console.log(`Generated: ${outPath}`);

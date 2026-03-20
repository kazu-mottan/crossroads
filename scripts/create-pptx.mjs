import { createRequire } from "module";
const require = createRequire(import.meta.url);
const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE"; // 16:9

const DARK = "1a1a2e";
const ACCENT = "4361ee";
const ACCENT2 = "06d6a0";
const WHITE = "ffffff";
const LIGHT = "f0f4ff";
const GRAY = "6b7280";

// ===== ヘルパー =====
function titleSlide(pptx, title, subtitle) {
  const slide = pptx.addSlide();
  slide.background = { color: DARK };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: "40%", h: "100%",
    fill: { color: ACCENT },
  });
  slide.addText(title, {
    x: "42%", y: "35%", w: "55%", h: 1.2,
    fontSize: 32, bold: true, color: WHITE, fontFace: "Yu Gothic",
  });
  slide.addText(subtitle, {
    x: "42%", y: "55%", w: "55%", h: 0.6,
    fontSize: 16, color: "aabbcc", fontFace: "Yu Gothic",
  });
  slide.addText("2026年 提案資料", {
    x: "42%", y: "85%", w: "55%", h: 0.4,
    fontSize: 12, color: "667788", fontFace: "Yu Gothic",
  });
  return slide;
}

function sectionHeader(pptx, num, title) {
  const slide = pptx.addSlide();
  slide.background = { color: ACCENT };
  slide.addText(`${num}`, {
    x: "5%", y: "30%", w: "15%", h: 1.5,
    fontSize: 72, bold: true, color: WHITE, align: "center", fontFace: "Yu Gothic",
  });
  slide.addText(title, {
    x: "22%", y: "38%", w: "70%", h: 1.0,
    fontSize: 28, bold: true, color: WHITE, fontFace: "Yu Gothic",
  });
  return slide;
}

function contentSlide(pptx, title, fn) {
  const slide = pptx.addSlide();
  slide.background = { color: WHITE };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: "100%", h: 0.7,
    fill: { color: DARK },
  });
  slide.addText(title, {
    x: "3%", y: 0.05, w: "90%", h: 0.6,
    fontSize: 18, bold: true, color: WHITE, fontFace: "Yu Gothic",
  });
  fn(slide);
  return slide;
}

// ===== スライド1: タイトル =====
titleSlide(
  pptx,
  "海外リモート勤務への移行について",
  "契約継続のご相談 ― 品質・成果物は変わりません"
);

// ===== スライド2: アジェンダ =====
contentSlide(pptx, "本日のご説明内容", (slide) => {
  const items = [
    ["1", "現在の状況と背景"],
    ["2", "提案内容（海外リモート移行）"],
    ["3", "業務品質・納期への影響はゼロ"],
    ["4", "コミュニケーション体制"],
    ["5", "移行スケジュール"],
    ["6", "お願い事項"],
  ];
  items.forEach(([num, text], i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: "5%", y: 0.9 + i * 0.65, w: 0.5, h: 0.5,
      fill: { color: ACCENT }, line: { color: ACCENT },
    });
    slide.addText(num, {
      x: "5%", y: 0.9 + i * 0.65, w: 0.5, h: 0.5,
      fontSize: 16, bold: true, color: WHITE, align: "center", fontFace: "Yu Gothic",
    });
    slide.addText(text, {
      x: "13%", y: 0.95 + i * 0.65, w: "80%", h: 0.45,
      fontSize: 16, color: DARK, fontFace: "Yu Gothic",
    });
  });
});

// ===== スライド3: 現在の状況 =====
contentSlide(pptx, "1. 現在の状況と背景", (slide) => {
  slide.addText("現在のご支援内容", {
    x: "5%", y: 0.9, w: "90%", h: 0.4,
    fontSize: 14, bold: true, color: ACCENT, fontFace: "Yu Gothic",
  });
  slide.addText(
    "・月単価110万円にてITコンサルティング業務を担当\n" +
    "・主にリモートでの業務遂行（既に90%以上がオンライン対応）\n" +
    "・これまでの成果物品質・納期遵守率は100%",
    {
      x: "7%", y: 1.35, w: "86%", h: 1.2,
      fontSize: 14, color: DARK, fontFace: "Yu Gothic", lineSpacingMultiple: 1.4,
    }
  );
  slide.addText("今後の意向", {
    x: "5%", y: 2.7, w: "90%", h: 0.4,
    fontSize: 14, bold: true, color: ACCENT, fontFace: "Yu Gothic",
  });
  slide.addText(
    "・30歳を機に、拠点を海外（マレーシアまたはジョージア）へ移すことを検討\n" +
    "・業務の継続性・品質に影響がないことを確認した上でご提案\n" +
    "・貴社との契約を継続させていただきたく、ご相談に参りました",
    {
      x: "7%", y: 3.15, w: "86%", h: 1.2,
      fontSize: 14, color: DARK, fontFace: "Yu Gothic", lineSpacingMultiple: 1.4,
    }
  );
});

// ===== スライド4: 提案内容 =====
contentSlide(pptx, "2. 提案内容", (slide) => {
  const boxes = [
    { label: "拠点", value: "マレーシア（クアラルンプール）\nまたはジョージア（トビリシ）" },
    { label: "移行時期", value: "2026年7月〜（3ヶ月前に通知）" },
    { label: "勤務スタイル", value: "フルリモート（現状と変わらず）" },
    { label: "稼働時間", value: "日本時間9:00〜18:00に対応可能\n（マレーシアは時差1時間のみ）" },
    { label: "契約形態", value: "現行契約を継続\n（単価・成果物・納期 変更なし）" },
    { label: "連絡手段", value: "Slack / Zoom / メール\n（レスポンスタイムは現状維持）" },
  ];
  boxes.forEach((b, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.5 + col * 4.1, y: 0.9 + row * 2.0, w: 3.8, h: 1.7,
      fill: { color: LIGHT }, line: { color: ACCENT, pt: 1.5 },
    });
    slide.addText(b.label, {
      x: 0.5 + col * 4.1, y: 0.9 + row * 2.0, w: 3.8, h: 0.45,
      fontSize: 12, bold: true, color: WHITE,
      fill: { color: ACCENT }, align: "center", fontFace: "Yu Gothic",
    });
    slide.addText(b.value, {
      x: 0.6 + col * 4.1, y: 1.38 + row * 2.0, w: 3.6, h: 1.1,
      fontSize: 13, color: DARK, fontFace: "Yu Gothic", lineSpacingMultiple: 1.4,
    });
  });
});

// ===== スライド5: 品質への影響なし =====
contentSlide(pptx, "3. 業務品質・納期への影響はゼロ", (slide) => {
  const points = [
    ["✓ 通信環境", "光ファイバー（300Mbps以上）の固定回線を確保\nバックアップとして4G/5G回線も常時準備"],
    ["✓ 時差問題", "マレーシアは日本との時差わずか1時間\nコアタイム（10:00〜17:00 JST）を100%カバー"],
    ["✓ セキュリティ", "VPN接続・デバイス暗号化・現行のセキュリティポリシーを維持"],
    ["✓ 実績", "現在も週5日フルリモートで100%成果物提出・納期遵守"],
  ];
  points.forEach(([label, text], i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: "5%", y: 0.9 + i * 1.2, w: "90%", h: 1.0,
      fill: { color: i % 2 === 0 ? LIGHT : WHITE },
      line: { color: "dddddd" },
    });
    slide.addText(label, {
      x: "7%", y: 0.95 + i * 1.2, w: "20%", h: 0.9,
      fontSize: 13, bold: true, color: ACCENT, fontFace: "Yu Gothic", valign: "middle",
    });
    slide.addText(text, {
      x: "28%", y: 0.95 + i * 1.2, w: "65%", h: 0.9,
      fontSize: 13, color: DARK, fontFace: "Yu Gothic", lineSpacingMultiple: 1.3, valign: "middle",
    });
  });
});

// ===== スライド6: コミュニケーション体制 =====
contentSlide(pptx, "4. コミュニケーション体制", (slide) => {
  slide.addText("現行と同一の体制を維持します", {
    x: "5%", y: 0.9, w: "90%", h: 0.5,
    fontSize: 15, bold: true, color: DARK, fontFace: "Yu Gothic",
  });

  const rows = [
    ["項目", "現在", "移行後", "変化"],
    ["ミーティング", "Zoom/週2回", "Zoom/週2回", "なし"],
    ["進捗報告", "Slack 日次", "Slack 日次", "なし"],
    ["緊急連絡", "即日対応", "即日対応（時差1h）", "実質なし"],
    ["成果物提出", "期日厳守", "期日厳守", "なし"],
    ["来日対応", "—", "四半期1回来日可", "増加"],
  ];

  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      const isHeader = ri === 0;
      slide.addShape(pptx.ShapeType.rect, {
        x: 0.5 + ci * 3.05, y: 1.5 + ri * 0.65, w: 3.0, h: 0.6,
        fill: { color: isHeader ? ACCENT : (ri % 2 === 0 ? WHITE : LIGHT) },
        line: { color: "cccccc" },
      });
      slide.addText(cell, {
        x: 0.5 + ci * 3.05, y: 1.5 + ri * 0.65, w: 3.0, h: 0.6,
        fontSize: 12, bold: isHeader, align: "center", valign: "middle",
        color: isHeader ? WHITE : (ci === 3 && cell !== "なし" ? ACCENT2 : DARK),
        fontFace: "Yu Gothic",
      });
    });
  });
});

// ===== スライド7: スケジュール =====
contentSlide(pptx, "5. 移行スケジュール（案）", (slide) => {
  const phases = [
    { month: "2026年4月", label: "ご相談・合意", desc: "本資料をもとにご確認・ご承認いただく" },
    { month: "2026年5月", label: "準備期間", desc: "現地環境整備・VPN設定・通信テスト" },
    { month: "2026年6月", label: "試験運用", desc: "1ヶ月間の試験リモート（問題があれば中断）" },
    { month: "2026年7月", label: "本格移行", desc: "海外拠点からのフル稼働開始" },
  ];
  phases.forEach((p, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.4 + i * 3.1, y: 1.0, w: 2.8, h: 0.5,
      fill: { color: ACCENT }, line: { color: ACCENT },
    });
    slide.addText(p.month, {
      x: 0.4 + i * 3.1, y: 1.0, w: 2.8, h: 0.5,
      fontSize: 12, bold: true, color: WHITE, align: "center", fontFace: "Yu Gothic",
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.4 + i * 3.1, y: 1.55, w: 2.8, h: 0.5,
      fill: { color: LIGHT }, line: { color: ACCENT },
    });
    slide.addText(p.label, {
      x: 0.4 + i * 3.1, y: 1.55, w: 2.8, h: 0.5,
      fontSize: 13, bold: true, color: ACCENT, align: "center", fontFace: "Yu Gothic",
    });
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.4 + i * 3.1, y: 2.1, w: 2.8, h: 1.5,
      fill: { color: WHITE }, line: { color: "dddddd" },
    });
    slide.addText(p.desc, {
      x: 0.5 + i * 3.1, y: 2.2, w: 2.6, h: 1.3,
      fontSize: 12, color: DARK, fontFace: "Yu Gothic", lineSpacingMultiple: 1.4, valign: "top",
    });
    if (i < 3) {
      slide.addText("→", {
        x: 3.05 + i * 3.1, y: 1.55, w: 0.3, h: 0.5,
        fontSize: 20, color: ACCENT, align: "center", fontFace: "Yu Gothic",
      });
    }
  });

  slide.addText(
    "※ 6月の試験運用で問題が発生した場合、直ちに国内対応に戻します。貴社にリスクはありません。",
    {
      x: "5%", y: 4.2, w: "90%", h: 0.5,
      fontSize: 12, color: GRAY, italic: true, fontFace: "Yu Gothic",
    }
  );
});

// ===== スライド8: お願い事項 =====
contentSlide(pptx, "6. お願い事項", (slide) => {
  slide.addText("ご確認・ご承認をお願いしたい事項", {
    x: "5%", y: 0.9, w: "90%", h: 0.4,
    fontSize: 14, bold: true, color: DARK, fontFace: "Yu Gothic",
  });
  const items = [
    "海外拠点からのリモート勤務継続のご承認",
    "契約上の住所変更への対応（必要な場合）",
    "セキュリティポリシーの確認・署名（必要な場合）",
  ];
  items.forEach((item, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: "5%", y: 1.5 + i * 0.85, w: "90%", h: 0.7,
      fill: { color: LIGHT }, line: { color: ACCENT, pt: 1 },
    });
    slide.addText(`${i + 1}. ${item}`, {
      x: "8%", y: 1.5 + i * 0.85, w: "85%", h: 0.7,
      fontSize: 14, color: DARK, fontFace: "Yu Gothic", valign: "middle",
    });
  });

  slide.addShape(pptx.ShapeType.rect, {
    x: "5%", y: 4.0, w: "90%", h: 1.1,
    fill: { color: "fff8e1" }, line: { color: "f59e0b", pt: 1.5 },
  });
  slide.addText(
    "これまでのご支援に感謝申し上げます。引き続き高品質なサービスを提供し、\n" +
    "貴社の成長に貢献し続けることをお約束します。\n" +
    "ご不明な点があれば、いつでもご相談ください。",
    {
      x: "7%", y: 4.05, w: "86%", h: 1.0,
      fontSize: 13, color: DARK, fontFace: "Yu Gothic", lineSpacingMultiple: 1.5,
    }
  );
});

// ===== 出力 =====
await pptx.writeFile({ fileName: "海外リモート勤務_提案資料.pptx" });
console.log("✅ PowerPoint作成完了: 海外リモート勤務_提案資料.pptx");

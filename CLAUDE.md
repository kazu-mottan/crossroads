# 将来設計プランナー (crossroads)

## プロフィール

- 29歳、アクセンチュア勤務（年収700万円）
- 副業で月単価110万円の案件あり（年収約1,300万円）
- 合計年収: 約2,000万円
- 副業を本業化予定

### 検討中の意思決定

- 30歳を機に海外移住するかどうか
- アクセンチュアを辞めてフリーランス専業にするか
- 結婚のタイミングとライフプラン設計
- 英語学習（貯金はあまり使いたくない）

## プロジェクト概要

キャリア・海外移住・結婚・財務を総合的に分析・可視化するWebアプリ。

## 技術スタック

- Next.js 16 (App Router) / TypeScript / Tailwind CSS
- Recharts（グラフ・チャート）
- Rechartsコンポーネントは `next/dynamic` で `ssr: false` にすること

## 構成

- `src/data/profile.ts` - プロフィール・シナリオ・国別データ
- `src/lib/simulator.ts` - 財務シミュレーション・スコアリングロジック
- `src/components/` - 各ページのクライアントコンポーネント（dynamic import用）
- `src/app/` - ページルーティング

## コマンド

- `npm run dev` - 開発サーバー起動
- `npx next build` - ビルド確認

## 注意点

- 親ディレクトリ（Workspace）にもpackage-lock.jsonがあるためTurbopackの警告が出るが無視してOK

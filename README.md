# morimaps

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/yourname/morimaps/pulls)

<p align="center">
  <img src="public/vite.svg" alt="morimaps logo" width="120" />
</p>

## 🌍 moripa-map-ui-examples

**moripa-map-ui-examples**は、Minecraftサーバー「もりのパーティ」のワールド地図・マーカー・プレイヤー位置をWeb上で美しく可視化する地図アプリケーションです。React + TypeScript + Leafletを用い、Minecraftの世界を直感的に探索できます。

---

## ✨ 主な機能

- **Minecraftワールド地図表示**（Overworld/Nether/End、カスタムCRS対応）
- **マーカー表示**（駅・拠点・鉄道路線・旗など、JSON定義で柔軟に拡張可能）
- **プレイヤー位置表示**（リアルタイム更新、カスタムアイコン）
- **レイヤー切替**（地図・マーカー・プレイヤーの表示ON/OFF）
- **カーソル座標表示**（Minecraft座標系に対応）
- **レスポンシブデザイン**（PC/タブレット/スマホ対応）

---

## 🛠️ 技術スタック

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Leaflet](https://leafletjs.com/) / [react-leaflet](https://react-leaflet.js.org/)
- [@tanstack/react-query](https://tanstack.com/query/latest)
- [PandaCSS](https://panda-css.com/)（ユーティリティファーストCSS）
- [ESLint](https://eslint.org/)（型安全なLint）

---

## 📁 ディレクトリ構成

```
├── public/           # 静的ファイル・アイコン
├── src/
│   ├── components/   # UIコンポーネント
│   ├── hooks/        # データ取得用カスタムフック
│   ├── types/        # 型定義
│   ├── utils/        # ユーティリティ
│   └── ...
├── styled-system/    # PandaCSS関連
├── package.json
├── vite.config.ts
└── ...
```

---

## ⚡ セットアップ

1. **リポジトリをクローン**

   ```sh
   git clone https://github.com/yourname/morimaps.git
   cd morimaps
   ```

2. **依存パッケージのインストール**

   ```sh
   pnpm install
   ```

3. **開発サーバー起動**

   ```sh
   pnpm dev
   ```

4. **ブラウザでアクセス**

   [http://localhost:5173](http://localhost:5173)

---

## 🧩 拡張・カスタマイズ

- **マーカー/レイヤー追加**: `src/types/MapMaker.d.ts` を参照し、JSONで新規マーカーを定義できます。
- **プレイヤー情報連携**: `/tiles/players.json` 形式で外部APIから取得。
- **地図タイル差し替え**: `public/` 配下にタイル画像を配置し、Leafletの設定を変更。

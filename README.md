# Physics App Frontend

物理添削AIサービスのフロントエンドです。

## 技術スタック

- **Next.js 16** - Reactフレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS** - スタイリング
- **react-markdown** - Markdownレンダリング

## 画面一覧

| URL | 説明 |
|------|------|
| `/` | トップページ |
| `/login` | ログイン画面 |
| `/register` | ユーザー登録画面 |
| `/questions` | 質問一覧画面 |
| `/questions/new` | 質問投稿画面 |

## セットアップ

### 前提条件

- Node.js 20以上
- バックエンド（physics-app-backend）が起動していること

### 起動方法

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

## バックエンドとの連携

バックエンドAPIは `http://localhost:8000` で動作している前提です。
# Noroi 怒氣發洩同事詛咒機

這是一個用於發洩職場壓力的趣味小遊戲。你可以選擇一位「同事」角色，然後透過點擊互動來累積怒氣，最終獲得專屬詛咒語錄！
本專案以 Next.js + TypeScript 製作，並結合 TailwindCSS 與多媒體互動效果。

[點我玩](https://noroi.vercel.app/)

## 功能特色

- 選擇不同的同事角色（可自訂職位名稱）
- 點擊角色發洩怒氣，怒氣值累積
- 怒氣爆表後，隨機顯示詛咒語錄（由 OpenAI API 產生，失敗時 fallback 本地語錄）
- 使用 Redis 快取機制，提升回應速度並節省 API 用量
- 多種互動音效與動畫
- 支援自訂角色名稱

## 安裝與啟動

1. **安裝依賴套件**
   ```bash
   npm install
   ```

2. **設定環境變數**
   - 在專案根目錄建立 `.env.local` 檔案
   - 加入以下環境變數：
     ```
     OPENAI_API_KEY=你的OpenAI_API_KEY
     UPSTASH_REDIS_REST_URL=你的Redis_URL
     UPSTASH_REDIS_REST_TOKEN=你的Redis_TOKEN
     ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```
   啟動後瀏覽器會自動開啟 [http://localhost:3000](http://localhost:3000)

4. **建置生產環境**
   ```bash
   npm run build
   ```
   產生的靜態檔案會在 `.next/` 資料夾。

5. **執行測試**
   ```bash
   npm run lint
   ```

## 目錄結構簡介

- `src/pages/`：Next.js 頁面與 API 路由
- `src/components/`：自訂 React 元件（角色、怒氣條、詛咒文字等）
- `src/data/curses.js`：本地詛咒語錄資料（fallback 用）
- `src/assets/`：角色圖片、道具圖片、動畫等多媒體資源

## 部署

本專案可部署在 Vercel 上，步驟如下：

1. 將專案 push 到 GitHub
2. 在 Vercel 上建立新專案，選擇該 GitHub 倉庫
3. 在 Vercel 專案設定中，加入環境變數 `OPENAI_API_KEY`
4. 部署完成後，Vercel 會自動處理前端與 API 路由

## 其他說明

- 本專案以 [Next.js](https://nextjs.org/) 建立。
- 若需自訂詛咒語錄，可編輯 `src/data/curses.js`。
- 若需自訂角色圖片，請將圖片放入 `public/assets/` 並依照命名規則。

---

如果你需要更詳細的功能說明或安裝教學，也可再告訴我！
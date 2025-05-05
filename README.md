# 怒氣發洩同事詛咒機

這是一個用於發洩職場壓力的趣味小遊戲。你可以選擇一位「同事」角色，然後透過點擊互動來累積怒氣，最終獲得專屬詛咒語錄！
本專案以 React + TypeScript 製作，並結合 TailwindCSS 與多媒體互動效果。

## 功能特色

- 選擇不同的同事角色（可自訂職位名稱）
- 點擊角色發洩怒氣，怒氣值累積
- 怒氣爆表後，隨機顯示詛咒語錄
- 多種互動音效與動畫
- 支援自訂角色名稱

## 安裝與啟動

### `npm install`

### `npm start`

啟動後瀏覽器會自動開啟 http://localhost:3000

### `npm run build`

## 目錄結構簡介

- `src/components/`：自訂 React 元件（角色、怒氣條、詛咒文字等）
- `src/data/curses.js`：詛咒語錄資料
- `src/assets/`：角色圖片、道具圖片、動畫等多媒體資源
- `src/App.tsx`：主要應用程式邏輯

## 其他說明
- 本專案以 Create React App 建立。
- 若需自訂詛咒語錄，可編輯 src/data/curses.js。
- 若需自訂角色圖片，請將圖片放入 src/assets/ 並依照命名規則。
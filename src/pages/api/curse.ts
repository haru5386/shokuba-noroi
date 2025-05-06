import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Redis } from "@upstash/redis";
import { curseLevels as curses } from "../../data/curses";

// 本地詛咒
function getLocalCurse(role: string, rage: number) {
  let arr = curses.low;
  if (rage > 10 && rage <= 20) arr = curses.mid;
  if (rage > 20) arr = curses.high;
  const curse = arr[Math.floor(Math.random() * arr.length)];
  return curse.replace("{職位}", role);
}

// 從 Redis 取得快取
const getFromRedis = async (key: string) => {
  console.log("[getRedis]", key);
  const encodedKey = encodeURIComponent(key);
  const res = await redis.get(encodedKey)
  console.log("[getRedis]", res);
  return res
};

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// 寫入 Redis
const setToRedis = async (key: string, value: string, ttlSeconds = 86400) => {
  const encodedKey = encodeURIComponent(key);
  await redis.set(encodedKey, value, {ex: ttlSeconds});
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { role, rage } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  // 呼叫 OpenAI
  try {
    // 從 Redis 取得快取
    const cacheKey = `${role}:${rage}`;

    const cached = await getFromRedis(cacheKey);
    if (cached) {
      return res.status(200).json({ curse: cached, source: "cache" });
    }

    const prompt = `請用幽默但帶點怒氣的語氣，對一位${role}，根據怒氣值${rage}，給一句詛咒語（不要太長，繁體中文）`;
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4.1-nano",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 50,
        temperature: 0.9,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const curse = response.data.choices[0].message.content.trim();
    await setToRedis(cacheKey, curse);

    res.status(200).json({ curse, source: "openai" });
  } catch(e) {
    console.log("error",e)
    // OpenAI 失敗 fallback 本地
    const curse = getLocalCurse(role, rage);
    res.status(200).json({ curse, source: "local" });
  }
}

import { Hono } from "hono";
import { createFactory, createMiddleware } from "hono/factory";
import { generateNonce } from "siwe";
import { HTTPException } from "hono/http-exception";
import Redis from "ioredis";

const factory = createFactory();

export type BitcoinData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | number;
  last_updated: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

export const getMarketData = factory.createHandlers(async (c) => {
  try {
    const redisClient = new Redis(process.env.KV_URL!, {
      tls: {},
    });

    const redisData = await redisClient.get("explorer");

    if (redisData) {
      const data: BitcoinData[] = JSON.parse(redisData);
      return c.json({ data });
    }

    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d",
    );

    const data: BitcoinData[] = await response.json();

    await redisClient.set("explorer", JSON.stringify(data), "EX", 60);

    if (!response.ok) {
      throw new HTTPException(500, { message: "INTERNAL SERVER ERROR" });
    }

    return c.json({ data });
  } catch (err: any) {
    console.error(err.message);
    throw new HTTPException(500, { message: err.message });
  }
});

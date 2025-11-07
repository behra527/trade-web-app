import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// utils.ts
import { CandleData } from "@/lib/type";

export const generateInitialData = (count = 100): CandleData[] => {
  const data: CandleData[] = [];
  let price = 100;
  for (let i = 0; i < count; i++) {
    const open = price;
    const close = open + (Math.random() - 0.5) * 5;
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    const volume = Math.random() * 1000 + 200;
    data.push({ open, high, low, close, volume });
    price = close;
  }
  return data;
};

export const calculateEMA = (data: CandleData[], period = 20): number[] => {
  const k = 2 / (period + 1);
  let ema = data[0].close;
  return data.map((d) => (ema = d.close * k + ema * (1 - k)));
};

export const calculateSMA = (data: CandleData[], period = 50): number[] =>
  data.map((_, i) => {
    const start = Math.max(0, i - period + 1);
    const subset = data.slice(start, i + 1);
    const avg = subset.reduce((a, b) => a + b.close, 0) / subset.length;
    return avg;
  });

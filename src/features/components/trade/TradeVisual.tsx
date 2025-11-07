"use client";

import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { generateInitialData } from "@/lib/utils";
import {
  ChartConfig,
  TradeVisualProps,
} from "@/lib/type";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  CrosshairMode,
  UTCTimestamp,
} from "lightweight-charts";

const CONFIG: ChartConfig = {
  candleWidth: 8,
  candleGap: 2,
  gridColor: "#2a2a2a",
  bgColor: "#0f172a",
  textColor: "#9ca3af",
  bullColor: "#10b981",
  bearColor: "#ef4444",
  volumeHeight: 60,
  emaColor: "#60a5fa",
  smaColor: "#f59e0b",
  updateInterval: 2000,
  candleCount: 100,
};

export default function TradeVisual({
  config,
  initialData,
  height = 500,
  live = true,
}: TradeVisualProps) {
  const chartConfig = { ...CONFIG, ...config };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  // Initialize chart
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { color: chartConfig.bgColor },
        textColor: chartConfig.textColor,
      },
      grid: {
        vertLines: { color: chartConfig.gridColor },
        horzLines: { color: chartConfig.gridColor },
      },
      width: containerRef.current.clientWidth,
      height,
      crosshair: { mode: CrosshairMode.Normal },
      timeScale: { timeVisible: true, borderVisible: false },
    });

    const series = chart.addCandlestickSeries({
      upColor: chartConfig.bullColor,
      borderUpColor: chartConfig.bullColor,
      wickUpColor: chartConfig.bullColor,
      downColor: chartConfig.bearColor,
      borderDownColor: chartConfig.bearColor,
      wickDownColor: chartConfig.bearColor,
    });

    const data: CandlestickData<UTCTimestamp>[] = (
      initialData || generateInitialData(chartConfig.candleCount)
    ).map((candle, i) => ({
      time: (Math.floor(Date.now() / 1000) - (chartConfig.candleCount - i)) as UTCTimestamp,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));

    series.setData(data);

    chartRef.current = chart;
    seriesRef.current = series;

    // Resize listener
    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [chartConfig, height, initialData]);

  // Live data simulation
  useEffect(() => {
    if (!live || !seriesRef.current) return;

    const interval = setInterval(() => {
      const last = (seriesRef.current!.dataByIndex(seriesRef.current!.data().length - 1)) as CandlestickData<UTCTimestamp> | undefined;
      if (!last) return;

      const nextCandle: CandlestickData<UTCTimestamp> = {
        time: (last.time + 60) as UTCTimestamp,
        open: last.close,
        high: last.close + Math.random() * 3,
        low: last.close - Math.random() * 3,
        close: last.close + (Math.random() - 0.5) * 4,
      };

      seriesRef.current!.update(nextCandle);
    }, chartConfig.updateInterval);

    return () => clearInterval(interval);
  }, [live, chartConfig.updateInterval]);

  return (
    <Card
      className={cn(
        "w-full bg-slate-900 border ml-2 max-h-[80vh] border-slate-700 rounded-xl overflow-hidden relative"
      )}
      style={{ height }}
    >
      <div ref={containerRef} className="w-full h-full" />
    </Card>
  );
}

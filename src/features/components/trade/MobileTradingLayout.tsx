"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  ArrowUp,
  ArrowDown,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  CandlestickData,
  UTCTimestamp,
} from "lightweight-charts";

function MobileTradingLayout() {
  const [time, setTime] = useState("22:32");
  const [investment, setInvestment] = useState(5);
  const [payout] = useState(8.5);
  const [zoomLevel, setZoomLevel] = useState(1);

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  // ---- Generate Candle Data ----
  const generateInitialData = (count: number) => {
    const data = [];
    let price = 0.6517;

    for (let i = 0; i < count; i++) {
      const open = price;
      const high = open + Math.random() * 0.0005;
      const low = open - Math.random() * 0.0005;
      const close = low + Math.random() * (high - low);

      data.push({
        time: (Math.floor(Date.now() / 1000) - (count - i) * 60) as UTCTimestamp,
        open,
        high,
        low,
        close,
      });
      price = close;
    }
    return data;
  };

  // ---- Candle Updater ----
  useEffect(() => {
    if (!seriesRef.current) return;

    const interval = setInterval(() => {
      const data = seriesRef.current?.data();
      if (!data || data.length === 0) return;

      const last = data[data.length - 1] as CandlestickData<UTCTimestamp>;
      const newCandle: CandlestickData<UTCTimestamp> = {
        time: (last.time + 60) as UTCTimestamp,
        open: last.close,
        high: last.close + Math.random() * 0.0003,
        low: last.close - Math.random() * 0.0003,
        close: last.close + (Math.random() - 0.5) * 0.0004,
      };

      seriesRef.current?.update(newCandle);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ---- Chart Setup ----
  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "#1e293b" },
        textColor: "#9ca3af",
      },
      grid: {
        vertLines: { color: "#374151" },
        horzLines: { color: "#374151" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      timeScale: {
        timeVisible: true,
        borderVisible: false,
        barSpacing: 6 * zoomLevel,
      },
      rightPriceScale: { borderVisible: false },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#10b981",
      borderUpColor: "#10b981",
      wickUpColor: "#10b981",
      downColor: "#ef4444",
      borderDownColor: "#ef4444",
      wickDownColor: "#ef4444",
    });

    series.setData(generateInitialData(100));
    chartRef.current = chart;
    seriesRef.current = series;

    const handleResize = () => {
      if (!chartContainerRef.current || !chartRef.current) return;
      const { clientWidth, clientHeight } = chartContainerRef.current;
      chartRef.current.applyOptions({ width: clientWidth, height: clientHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // ---- Zoom Controls ----
  useEffect(() => {
    chartRef.current?.timeScale().applyOptions({ barSpacing: 6 * zoomLevel });
  }, [zoomLevel]);

  const handleZoomIn = () => setZoomLevel((z) => Math.min(3, z + 0.2));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.5, z - 0.2));

  const handleTimeChange = (dir: "increase" | "decrease") => {
    const [h, m] = time.split(":").map(Number);
    const newM = dir === "increase" ? (m + 1) % 60 : (m - 1 + 60) % 60;
    setTime(`${h.toString().padStart(2, "0")}:${newM.toString().padStart(2, "0")}`);
  };

  const handleInvestmentChange = (dir: "increase" | "decrease") => {
    setInvestment((v) => Math.max(1, Math.min(1000, v + (dir === "increase" ? 1 : -1))));
  };

  return (
    <div className="w-full h-screen bg-slate-900 flex flex-col">
      {/* === Chart Area === */}
      <div className="h-[78vh] relative">
        <div ref={chartContainerRef} className="w-full h-full rounded-t-lg" />

        {/* Zoom Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="sm"
            onClick={handleZoomIn}
            className="w-8 h-8 p-0 mr-2 z-50 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={handleZoomOut}
            className="w-8 h-8 p-0 z-50 mr-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* === Trading Panel === */}
      <div className="bg-slate-800 w-full mt-2 mb-3 p-3 border-t border-slate-700 flex flex-col gap-3">
        {/* --- Top Row: Time | Investment | Payout --- */}
        <div className="grid grid-cols-3 gap-3 items-center text-center">
          {/* Time */}
          <div>
            <div className="text-slate-400 text-xs uppercase">Time</div>
            <div className="flex items-center justify-between bg-slate-700 rounded-md px-2 py-1 mt-1">
              <Button
                size="sm"
                variant="ghost"
                className="w-5 h-5 p-0 text-white hover:bg-slate-600"
                onClick={() => handleTimeChange("decrease")}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-white font-mono text-sm font-semibold">{time}</span>
              <Button
                size="sm"
                variant="ghost"
                className="w-5 h-5 p-0 text-white hover:bg-slate-600"
                onClick={() => handleTimeChange("increase")}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Investment */}
          <div>
            <div className="text-slate-400 text-xs uppercase">Investment</div>
            <div className="flex items-center justify-between bg-slate-700 rounded-md px-2 py-1 mt-1">
              <Button
                size="sm"
                variant="ghost"
                className="w-5 h-5 p-0 text-white hover:bg-slate-600"
                onClick={() => handleInvestmentChange("decrease")}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-white font-mono text-sm font-semibold">
                {investment} $
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="w-5 h-5 p-0 text-white hover:bg-slate-600"
                onClick={() => handleInvestmentChange("increase")}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Payout */}
          <div>
            <div className="text-slate-400 text-xs uppercase">Payout</div>
            <div className="bg-slate-700 rounded-md px-2 py-2 mt-1 font-mono text-sm font-semibold text-white shadow-inner">
              {payout.toFixed(2)} $
            </div>
          </div>
        </div>

        {/* --- Bottom Row: Down | Up --- */}
        <div className="grid grid-cols-2 gap-3">
          <Button className="h-10 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg flex flex-col justify-center items-center shadow transition">
            <span className="text-xs">Down</span>
            <ArrowDown className="w-4 h-4" />
          </Button>

          <Button className="h-10 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex flex-col justify-center items-center shadow transition">
            <span className="text-xs">Up</span>
            <ArrowUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MobileTradingLayout;

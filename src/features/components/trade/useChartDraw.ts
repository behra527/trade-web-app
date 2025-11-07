// useChartDraw.ts
import { CandleData, ChartConfig } from "@/lib/type";
import { calculateEMA, calculateSMA } from "@/lib/utils";

export const drawChart = (
  ctx: CanvasRenderingContext2D,
  data: CandleData[],
  config: ChartConfig,
  offset: number,
  scale: number,
  hoverIndex: number | null,
  width: number,
  height: number
) => {
  const chartHeight = height - config.volumeHeight - 20;

  const visibleCount = Math.floor(width / ((config.candleWidth + config.candleGap) / scale));
  const start = Math.max(0, data.length - visibleCount - Math.floor(offset));
  const end = data.length - Math.floor(offset);
  const visibleData = data.slice(start, end);

  const prices = visibleData.flatMap((d) => [d.high, d.low]);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const scaleY = chartHeight / (maxPrice - minPrice);

  const ema20 = calculateEMA(data).slice(start, end);
  const sma50 = calculateSMA(data).slice(start, end);

  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, width, height);

  // Grid lines
  ctx.strokeStyle = config.gridColor;
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 10; i++) {
    const y = (i / 10) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Candles
  visibleData.forEach((d, i) => {
    const x = i * ((config.candleWidth + config.candleGap) / scale);
    const yHigh = chartHeight - (d.high - minPrice) * scaleY;
    const yLow = chartHeight - (d.low - minPrice) * scaleY;
    const yOpen = chartHeight - (d.open - minPrice) * scaleY;
    const yClose = chartHeight - (d.close - minPrice) * scaleY;
    const color = d.close > d.open ? config.bullColor : config.bearColor;

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + config.candleWidth / 2, yHigh);
    ctx.lineTo(x + config.candleWidth / 2, yLow);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.fillRect(
      x,
      Math.min(yOpen, yClose),
      config.candleWidth,
      Math.max(1, Math.abs(yClose - yOpen))
    );
  });

  // Volume
  const maxVolume = Math.max(...visibleData.map((d) => d.volume));
  visibleData.forEach((d, i) => {
    const x = i * ((config.candleWidth + config.candleGap) / scale);
    const volHeight = (d.volume / maxVolume) * config.volumeHeight;
    ctx.fillStyle = (d.close > d.open ? config.bullColor : config.bearColor) + "44";
    ctx.fillRect(x, height - volHeight, config.candleWidth, volHeight);
  });

  // EMA & SMA
  const drawLine = (arr: number[], color: string) => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    arr.forEach((v, i) => {
      const x = i * ((config.candleWidth + config.candleGap) / scale) + config.candleWidth / 2;
      const y = chartHeight - (v - minPrice) * scaleY;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  };
  drawLine(ema20, config.emaColor);
  drawLine(sma50, config.smaColor);

  // Hover crosshair
  if (hoverIndex !== null && visibleData[hoverIndex]) {
    const d = visibleData[hoverIndex];
    const x = hoverIndex * ((config.candleWidth + config.candleGap) / scale);
    const y = chartHeight - (d.close - minPrice) * scaleY;

    ctx.strokeStyle = "#6b7280";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();

    ctx.fillStyle = "#1f2937";
    ctx.fillRect(10, 10, 130, 60);
    ctx.fillStyle = "#f9fafb";
    ctx.font = "12px sans-serif";
    ctx.fillText(`O: ${d.open.toFixed(2)}`, 15, 25);
    ctx.fillText(`H: ${d.high.toFixed(2)}`, 15, 35);
    ctx.fillText(`L: ${d.low.toFixed(2)}`, 15, 45);
    ctx.fillText(`C: ${d.close.toFixed(2)}`, 15, 55);
  }
};

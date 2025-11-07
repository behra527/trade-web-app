// useChartZoomPan.ts
import { useState, useCallback } from "react";
import { ChartState } from "@/lib/type";

export const useChartZoomPan = (minScale = 0.5, maxScale = 3) => {
  const [chartState, setChartState] = useState<ChartState>({
    offset: 0,
    scale: 1,
    isPanning: false,
    startX: 0,
    hoverIndex: null,
  });

  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    setChartState((prev) => {
      const newScale = Math.max(
        minScale,
        Math.min(maxScale, prev.scale * (e.deltaY < 0 ? 1.1 : 0.9))
      );
      return { ...prev, scale: newScale };
    });
  }, [ minScale, maxScale ]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setChartState((prev) => ({
      ...prev,
      isPanning: true,
      startX: e.clientX,
    }));
    }, [setChartState]);

  const handleMouseUp = useCallback(() => {
    setChartState((prev) => ({ ...prev, isPanning: false }));
  }, [setChartState]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    setChartState((prev) => {
      if (prev.isPanning) {
        const delta = e.clientX - prev.startX;
        return {
          ...prev,
          offset: Math.max(0, prev.offset - delta / 10),
          startX: e.clientX,
        };
      }
      return prev;
    });
  }, []);

  return { chartState, setChartState, handleWheel, handleMouseDown, handleMouseUp, handleMouseMove };
};

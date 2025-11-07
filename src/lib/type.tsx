// 📄 types.tsx
// Type definitions for TradeVisual chart component
import { LucideIcon  } from "lucide-react";
import { ComponentType } from "react";

export interface NavLink {
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href: string;
}

// ---------------- Chart Types ----------------

export interface CandleData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartConfig {
  candleWidth: number;     // Width of each candle
  candleGap: number;       // Gap between candles
  gridColor: string;       // Grid line color
  bgColor: string;         // Background color
  textColor: string;       // Axis text color
  bullColor: string;       // Candle up (green)
  bearColor: string;       // Candle down (red)
  volumeHeight: number;    // Volume chart height
  emaColor: string;        // EMA line color
  smaColor: string;        // SMA line color
  updateInterval: number;  // Live update interval (ms)
  candleCount: number;     // Initial candle count
}

export interface TradeVisualProps {
  /** Optional custom config to override default chart settings */
  config?: Partial<ChartConfig>;
  /** Optional custom data source (if you want to feed external candles) */
  initialData?: CandleData[];
  /** Height of the chart container (default 500px) */
  height?: number;
  /** Enable or disable real-time mock updates */
  live?: boolean;
}

export interface ChartState {
  offset: number;          // Horizontal pan offset
  scale: number;           // Zoom scale factor
  isPanning: boolean;      // Whether user is currently dragging
  startX: number;          // Mouse start X for panning
  hoverIndex: number | null; // Index of candle under hover
}

// --------------------- Deposit ---------------------------- //
// lib/type.tsx


// Import type for next/image static imports
import type { StaticImageData } from "next/image";

export interface PaymentMethod {
  id: string;
  name: string;
  logo: string | StaticImageData;
  network?: string; // For crypto (e.g. ERC-20, TRC-20)
}

export interface PaymentCategory {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  methods: PaymentMethod[];
}




// (Removed duplicate PaymentMethod interface)


// (Removed duplicate PaymentCategory interface)

// ----------------------- Profile ------------------------//
export interface UserProfile {
  username: string;
  displayName: string;
  email: string;
  profileImage: string;
}

// ----------------------- Auth ------------------------//
export type LoginResponse = {
  accessToken: string
  refreshToken?: string
  user?: {
    id: string
    email?: string,
    username?: string
  }
}
"use client";
import LeftSidePanel from "./LeftSidePenal";
import TradeVisual from "./TradeVisual";
import TradingPanel from "./TradingPanel";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTradingLayout from "./MobileTradingLayout";

const Trade = () => {
    const isMobile = useIsMobile();
    
    if (isMobile) {
        return (
            <div className="flex h-fit bg-slate-900">
                <MobileTradingLayout />
            </div>
        )
    }
    
    return (
        <div className="flex h-fit bg-slate-900 px-4 py-2 gap-4 overflow-hidden w-full">
            <LeftSidePanel />
            <TradeVisual />
            <TradingPanel />
        </div>
    )
}

export default Trade;


"use client";

import { MarketBar } from "../../components/MarketBar";
import { SwapUI } from "../../components/SwapUI";
import { TradeView } from "../../components/TradeView";
import { Depth } from "../../components/depth/Depth";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const [price, setPrice] = useState(0);
    const LastPrice = (price: any) => {
        setPrice(price);
    };

    const { market } = useParams();
    return (
        <div className="bg-[#0e0f14]">
            <div className="flex flex-row flex-1 bg-[#0e0f14] text-white mx-1">
                <div className="flex flex-col flex-1">
                    <MarketBar market={market as string} LastPrice={LastPrice} />
                    <div className="flex flex-row h-[920px] border-y border-slate-800">
                        <div className="flex flex-col flex-1">
                            {price != 0 &&
                                <TradeView market={market as string} price={price} />
                            }
                        </div>
                        <div className="flex flex-col w-[250px] overflow-hidden">
                            <Depth market={market as string} price={price?.toString()} />
                        </div>
                    </div>
                </div>
                <div className="w-[10px] flex-col border-slate-800 border-l"></div>
                <div>
                    <div className="flex flex-col w-[250px]">
                        {price != 0 &&
                            <SwapUI market={market as string} price={price} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

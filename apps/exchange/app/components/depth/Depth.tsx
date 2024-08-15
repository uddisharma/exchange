"use client";
import { useEffect, useState } from "react";
import { getDepth, getKlines, getTicker, getTrades } from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "../../utils/SignalingManager";
import { TradeTable } from "./TradeTable";

export function Depth({ market, price: _price }: { market: string, price: string }) {
    const [bids, setBids] = useState<[string, string][]>();
    const [asks, setAsks] = useState<[string, string][]>();
    const [price, setPrice] = useState<string>();
    const [trades, setTrades] = useState<any[]>();

    useEffect(() => {
        SignalingManager.getInstance().registerCallback("depth", (data: any) => {
            setBids((originalBids) => {
                const updatedBids: any = [...(originalBids || [])];
                for (let i = 0; i < updatedBids.length; i++) {
                    for (let j = 0; j < data?.bids.length; j++) {
                        if (updatedBids[i][0] === data.bids[j][0]) {
                            updatedBids[i][1] = data.bids[j][1];
                            break;
                        }
                    }
                }

                return updatedBids
            })
            setAsks((originalAsks) => {
                const updatedAsks: any = [...(originalAsks || [])];
                for (let i = 0; i < updatedAsks.length; i++) {
                    for (let j = 0; j < data?.asks.length; j++) {
                        if (updatedAsks[i][0] === data.asks[j][0]) {
                            updatedAsks[i][1] = data.asks[j][1];
                            break;
                        }
                    }
                }
                return updatedAsks
            })
        }, `DEPTH.${market}`)

        SignalingManager.getInstance().sendMessage({ "method": "SUBSCRIBE", "params": [`depth.200ms.${market}`] })
        getDepth(market).then(d => {
            setBids(d.bids.reverse());
            setAsks(d.asks);
        });

        getTicker(market).then(t => setPrice(t.lastPrice));
        getTrades(market).then(t => {
            setPrice(t[0]?.price)
            setTrades(t)
        });

        SignalingManager.getInstance().registerCallback("trade", (data: any) => {
            setTrades((prevData: any) => [data, ...prevData]);
        }, `TRADE.${market}`)

        SignalingManager.getInstance().sendMessage({ "method": "SUBSCRIBE", "params": [`trade.${market}`] })

        return () => {
            SignalingManager.getInstance().deRegisterCallback("depth", `DEPTH.${market}`);
            SignalingManager.getInstance().sendMessage({ "method": "UNSUBSCRIBE", "params": [`depth.200ms.${market}`] });

            SignalingManager.getInstance().deRegisterCallback("trade", `TRADE.${market}`);
            SignalingManager.getInstance().sendMessage({ "method": "UNSUBSCRIBE", "params": [`trade.${market}`] });
        }

    }, [])


    const [activeTab, setActiveTab] = useState(0);

    const tabs = ['Book', 'Trades'];
    const tabContent = [
        <BookContent key={Math.random()} asks={asks} price={price} bids={bids} _price={_price} />,
        <TradeContent key={Math.random()} trades={trades} />,
    ];


    return <div>
        <div className="w-full max-w-md mx-auto text-sm">
            <div className="flex">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`py-2 px-4 focus:outline-none ${activeTab === index
                            ? 'border-b-2 border-blue-500 text-blue-500'
                            : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="p-4">
                {tabContent.map((content, index) => (
                    <div
                        key={index}
                        className={`${activeTab === index ? 'block' : 'hidden'
                            }`}
                    >
                        {content}
                    </div>
                ))}
            </div>
        </div>

    </div>
}

function TableHeader() {
    return <div className="flex justify-between text-xs">
        <div className="text-white">Price</div>
        <div className="text-slate-500">Size</div>
        <div className="text-slate-500">Total</div>
    </div>
}

function TableHeader2() {
    return <div className="flex justify-between text-xs">
        <div className="text-white">Price</div>
        <div className="text-slate-500">Qty</div>
        <div className="text-slate-500">Time</div>
    </div>
}

function BookContent({ asks, price, bids, _price }: any) {
    return (
        <>
            <TableHeader />
            {asks && <AskTable asks={asks} />}
            {price && <div className="font-medium tabular-nums text-greenText text-md text-green-500">{_price}</div>}
            {bids && <BidTable bids={bids} />}
        </>
    );
}

function TradeContent(trades: any) {
    return <>
        <TableHeader2 />
        {trades && <TradeTable trades={trades} />}
    </>
}
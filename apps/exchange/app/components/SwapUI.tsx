"use client";
import { useEffect, useState } from "react";

export function SwapUI({ market, price }: { market: string, price: number }) {
    const [amount, setAmount] = useState<any>(0);
    const [activeTab, setActiveTab] = useState('buy');

    useEffect(() => {
        setAmount(price);
    }, [price])

    const [activeTab1, setActiveTab1] = useState(0);

    const tabs = ['Limit', 'Market'];
    const amount1 = 0
    const tabContent = [
        <LimitContent key={Math.random()} amount={amount} />,
        <MarketContent key={Math.random()} amount={amount1} />
    ];

    return <div>
        <div className="flex flex-col">
            <div className="flex flex-row h-[60px]">
                <BuyButton activeTab={activeTab} setActiveTab={setActiveTab} />
                <SellButton activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="flex flex-col gap-1">
                <div className="w-full max-w-md mx-auto text-sm">
                    <div className="flex">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`py-2 px-4 focus:outline-none ${activeTab1 === index
                                    ? 'border-b-2 border-blue-500 text-blue-500'
                                    : 'text-gray-500'
                                    }`}
                                onClick={() => setActiveTab1(index)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="py-4">
                        {tabContent.map((content, index) => (
                            <div
                                key={index}
                                className={`${activeTab1 === index ? 'block' : 'hidden'
                                    }`}
                            >
                                {content}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </div>
}



function BuyButton({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: any }) {
    return <div className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${activeTab === 'buy' ? 'border-b-[#00c278] bg-[#0d1d1b]' : 'border-b-baseBorderMed hover:border-b-baseBorderFocus'}`} onClick={() => setActiveTab('buy')}>
        <p className="text-center text-sm font-semibold text-[#00c278]">
            Buy
        </p>
    </div>
}

function SellButton({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: any }) {
    return <div className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${activeTab === 'sell' ? 'border-b-redBorder bg-[#281419]' : 'border-b-[#fd4b4e] hover:border-b-[#fd4b4e]'}`} onClick={() => setActiveTab('sell')}>
        <p className="text-center text-sm font-semibold text-[#fd4b4e]">
            Sell
        </p>
    </div>
}


const LimitContent = ({ amount }: any) => {

    return (
        <div className="flex flex-col ">

            <PriceInput amount={amount} />

            <div className="flex flex-col gap-2">
                <p className="text-xs font-normal text-baseTextMedEmphasis mt-2">
                    Quantity
                </p>
                <div className="flex flex-col relative">
                    <input step="0.01" placeholder="0" className="h-12 rounded-lg border-2 border-solid border-[#202127] bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0" type="text" value="1" />
                    <div className="flex flex-row absolute right-1 top-1 p-2">
                        <div className="relative">
                            <img src="/sol.webp" className="w-6 h-6" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end flex-row">
                    <p className="font-medium pr-2 text-xs text-baseTextMedEmphasis">≈ 0.00 USDC</p>
                </div>
                <Percentage />
            </div>
            <button type="button" className="font-semibold  focus:ring-blue-200 focus:none focus:outline-none text-center h-12 rounded-xl text-base  py-2 my-4 bg-white text-black active:scale-98" data-rac="">Buy</button>
            <div className="flex justify-between flex-row mt-1">
                <div className="flex flex-row gap-2">
                    <div className="flex items-center">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ml-2 text-xs">Post Only</label>
                    </div>
                    <div className="flex items-center">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ml-2 text-xs">IOC</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

const MarketContent = (amount: any) => {
    return (
        <div className="flex flex-col ">

            <div className="flex flex-col flex-1 gap-3 text-baseTextHighEmphasis">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between flex-row">
                        <p className="text-xs font-normal text-baseTextMedEmphasis">Available Balance</p>
                        <p className="font-medium text-xs text-baseTextHighEmphasis">36.94 USDC</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-xs font-normal text-baseTextMedEmphasis">
                        Price
                    </p>
                    <div className="flex flex-col relative">
                        <input step="0.01" placeholder="0" className="h-12 rounded-lg border-2 border-solid border-[#202127] bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0" type="text" value={0} />
                        <div className="flex flex-row absolute right-1 top-1 p-2">
                            <div className="relative">
                                <img src="/usdc.webp" className="w-6 h-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <button type="button" className="font-semibold  focus:ring-blue-200 focus:none focus:outline-none text-center h-12 rounded-xl text-base  py-2 my-4 bg-white text-black active:scale-98" data-rac="">Buy</button>
            <div className="flex justify-between flex-row mt-1">
                <div className="flex flex-row gap-2">
                    <div className="flex items-center">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ml-2 text-xs">Post Only</label>
                    </div>
                    <div className="flex items-center">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ml-2 text-xs">IOC</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Percentage = () => {
    return (
        <div className="flex justify-center flex-row mt-2 gap-2">
            <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-[#202127] hover:bg-[#202127]">
                25%
            </div>
            <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-[#202127] hover:bg-[#202127]">
                50%
            </div>
            <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-[#202127] hover:bg-[#202127]">
                75%
            </div>
            <div className="flex items-center justify-center flex-row rounded-full px-[16px] py-[6px] text-xs cursor-pointer bg-[#202127] hover:bg-[#202127]">
                Max
            </div>
        </div>
    )
}

const PriceInput = ({ amount }: any) => {

    return (
        <div className="flex flex-col flex-1 gap-3 text-baseTextHighEmphasis">
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between flex-row">
                    <p className="text-xs font-normal text-baseTextMedEmphasis">Available Balance</p>
                    <p className="font-medium text-xs text-baseTextHighEmphasis">36.94 USDC</p>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-xs font-normal text-baseTextMedEmphasis">
                    Price
                </p>
                <div className="flex flex-col relative">
                    <input step="0.01" placeholder="0" className="h-12 rounded-lg border-2 border-solid border-[#202127] bg-[var(--background)] pr-12 text-right text-2xl leading-9 text-[$text] placeholder-baseTextMedEmphasis ring-0 transition focus:border-accentBlue focus:ring-0" type="text" value={amount ?? amount} />
                    <div className="flex flex-row absolute right-1 top-1 p-2">
                        <div className="relative">
                            <img src="/usdc.webp" className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
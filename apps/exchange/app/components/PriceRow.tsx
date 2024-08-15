'use client'
import React from 'react'
import { TableRow, TableCell } from "../../components/ui/table"
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar"
import { formatNumber } from './FormatNumber'
import PriceChangeGraph from "../components/Graph"
import { useRouter } from 'next/navigation'

function generateRandomNumbers(changePercentage: any) {
    const numbers = [];
    let firstNumber = Math.floor(Math.random() * 901) + 100;
    numbers.push(firstNumber);
    const isNegative = changePercentage < 0;
    for (let i = 1; i < 10; i++) {
        let randomNum;
        if (isNegative) {
            randomNum = Math.floor(Math.random() * firstNumber) + 1;
        } else {
            randomNum = Math.floor(Math.random() * (1000 - firstNumber)) + firstNumber + 1;
        }

        numbers.push(randomNum);
    }

    return numbers;
}
const PriceRow = ({ e }: any) => {
    const router = useRouter()
    return (
        <TableRow
            onClick={() => {
                router.push(`/trade/${e?.symbol.toUpperCase()}_USDC`)
            }}
            key={e?.symbol}
        >
            <TableCell className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src={e?.image} />
                    <AvatarFallback>{e?.symbol}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="text-white font-bold">{e?.name}</div>
                    <div className="text-sm text-muted-foreground uppercase">{e?.symbol?.split("_")[0]}</div>
                </div>
            </TableCell>
            <TableCell className="text-white">${formatNumber(e?.current_price)}</TableCell>
            <TableCell className="text-white">${formatNumber(e?.market_cap)}</TableCell>
            <TableCell className="text-white">${formatNumber(e?.total_volume)}</TableCell>
            <TableCell className={e?.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}>{e?.price_change_percentage_24h?.toFixed(2)}%</TableCell>
            <TableCell>

                <PriceChangeGraph prices={generateRandomNumbers(e?.price_change_percentage_24h)} />
            </TableCell>
        </TableRow>
    )
}

export default PriceRow
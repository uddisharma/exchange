// 'use client'
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, } from "../../components/ui/table"
import { priceWorkers } from "../../app/utils/httpClient"
import PriceRow from "../../app/components/PriceRow"

export async function Markets() {
  const data = await priceWorkers()

  return (
    <div className="min-h-screen bg-[#0e0f14] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Markets</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-[#14151b] p-4">
          <CardHeader>
            <CardTitle className="text-white">New</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white">ZRO/USDC</span>
                <span className="text-white">$2.5673</span>
                <span className="text-red-500">-2.80%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">UNA/USDC</span>
                <span className="text-white">$0.0447</span>
                <span className="text-red-500">-7.64%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">IO/USDC</span>
                <span className="text-white">$3.4459</span>
                <span className="text-red-500">-0.90%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#14151b] p-4">
          <CardHeader>
            <CardTitle className="text-white">Top Gainers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white">MOBILE/USDC</span>
                <span className="text-white">$0.001194</span>
                <span className="text-green-500">+6.61%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">WIF/USDC</span>
                <span className="text-white">$2.0457</span>
                <span className="text-green-500">+1.93%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">SHFL/USDC</span>
                <span className="text-white">$0.2311</span>
                <span className="text-green-500">+1.63%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#14151b] p-4">
          <CardHeader>
            <CardTitle className="text-white">Experimental</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white">HABIBI/USDC</span>
                <span className="text-white">$0.014624</span>
                <span className="text-red-500">-21.80%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">BODEN/USDC</span>
                <span className="text-white">$0.125</span>
                <span className="text-red-500">-17.16%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">BOME/USDC</span>
                <span className="text-white">$0.0091</span>
                <span className="text-red-500">-0.97%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mb-4">
        <div className="flex space-x-4">
          <Button variant="ghost" className="bg-white  text-black">
            All
          </Button>
          <Button variant="ghost" className="text-white">
            Spot
          </Button>
          <Button variant="ghost" className="text-white">
            Experimental
          </Button>
          <Button variant="ghost" className="text-white">
            Favorites
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-[#14151b] text-white">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px] text-white">Name</TableHead>
              <TableHead className="text-white">Price</TableHead>
              <TableHead className="text-white">Market Cap</TableHead>
              <TableHead className="text-white">24h Volume</TableHead>
              <TableHead className="text-white">24h Change</TableHead>
              <TableHead className="text-white">24h Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data?.map((e: any) => (
              <PriceRow key={e?.symbol} e={e} />
              // <TableRow
              //   key={e?.symbol}
              // >
              //   <TableCell className="flex items-center space-x-2">
              //     <Avatar>
              //       <AvatarImage src={e?.image} />
              //       <AvatarFallback>{e?.symbol}</AvatarFallback>
              //     </Avatar>
              //     <div>
              //       <div className="text-white font-bold">{e?.name}</div>
              //       <div className="text-sm text-muted-foreground uppercase">{e?.symbol?.split("_")[0]}</div>
              //     </div>
              //   </TableCell>
              //   <TableCell className="text-white">${formatNumber(e?.current_price)}</TableCell>
              //   <TableCell className="text-white">${formatNumber(e?.market_cap)}</TableCell>
              //   <TableCell className="text-white">${formatNumber(e?.total_volume)}</TableCell>
              //   <TableCell className={e?.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}>{e?.price_change_percentage_24h.toFixed(2)}%</TableCell>
              //   <TableCell>

              //     <PriceChangeGraph prices={generateRandomNumbers(e?.price_change_percentage_24h)} />


              //   </TableCell>
              // </TableRow>

            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


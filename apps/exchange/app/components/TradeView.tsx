import { useEffect, useRef } from "react";
import { ChartManager } from "../utils/ChartManager";
import { getKlines } from "../utils/httpClient";
import { KLine } from "../utils/types";

export function TradeView({
  market,
  price
}: {
  market: string;
  price: number
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager>(null);


  const updateLastCloseValue = (klineData: any, newCloseValue: any) => {

    const parsedData = klineData.map((x: any) => ({
      close: parseFloat(x.close),
      high: parseFloat(x.high),
      low: parseFloat(x.low),
      open: parseFloat(x.open),
      timestamp: new Date(x.end),
    }));


    const sortedData = parsedData.sort((x: any, y: any) => (x.timestamp < y.timestamp ? -1 : 1));


    const updatedData = sortedData.map((item: any, index: any) =>
      index === sortedData.length - 1 ? { ...item, close: newCloseValue } : item
    );

    return updatedData;
  };



  useEffect(() => {
    const init = async () => {
      let klineData: KLine[] = [];
      try {
        klineData = await getKlines(market, "1h", Math.floor((new Date().getTime() - 1000 * 60 * 60 * 24 * 7) / 1000), Math.floor(new Date().getTime() / 1000));

      } catch (e) { }

      if (chartRef) {
        if (chartManagerRef.current) {
          chartManagerRef.current.destroy();
        }
        const kLinedataUpdated = updateLastCloseValue(klineData, price)

        const chartManager = new ChartManager(
          chartRef.current,
          [
            ...klineData?.map((x) => ({
              close: parseFloat(x.close),
              high: parseFloat(x.high),
              low: parseFloat(x.low),
              open: parseFloat(x.open),
              timestamp: new Date(x.end),
            })),
          ].sort((x, y) => (x.timestamp < y.timestamp ? -1 : 1)) || [],
          {
            background: "#0e0f14",
            color: "white",
          }
        );



        //@ts-ignore
        chartManagerRef.current = chartManager;
      }
    };
    init();


  }, [market, chartRef, price]);



  return (
    <>
      <div ref={chartRef} style={{ height: "520px", width: "100%", marginTop: 4 }}></div>
    </>
  );
}

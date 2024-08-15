
export const BidTable = ({ bids }: { bids: [string, string][] }) => {
    let currentTotal = 0;
    let relevantBids: [string, string][] = [];
    let index = 0;

    // Ensure we have at least 15 relevant bids
    while (relevantBids.length < 15 && index < bids.length) {
        const chunk = bids.slice(index, index + 15).filter(([price, quantity]) => Number(quantity) !== 0.00);
        relevantBids = relevantBids.concat(chunk);
        index += 15;
    }

    // Ensure exactly 15 relevant bids
    relevantBids = relevantBids.slice(0, 15);

    const bidsWithTotal: [string, string, number][] = relevantBids.map(([price, quantity]) => [price, quantity, currentTotal += Number(quantity)]);
    const maxTotal = relevantBids.reduce((acc, [_, quantity]) => acc + Number(quantity), 0);

    return (
        <div>
            {bidsWithTotal.map(([price, quantity, total]) => (
                <Bid maxTotal={maxTotal} total={total} key={price} price={price} quantity={quantity} />
            ))}
        </div>
    );

}

function Bid({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) {
    return (
        <div
            style={{
                display: "flex",
                position: "relative",
                width: "100%",
                backgroundColor: "transparent",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${(100 * total) / maxTotal}%`,
                    height: "100%",
                    background: "rgba(1, 167, 129, 0.325)",
                    transition: "width 0.3s ease-in-out",
                }}
            ></div>
            <div className={`flex justify-between text-xs w-full`}>
                <div>
                    {price}
                </div>
                <div>
                    {quantity}
                </div>
                <div>
                    {total.toFixed(2)}
                </div>
            </div>
        </div>
    );
}

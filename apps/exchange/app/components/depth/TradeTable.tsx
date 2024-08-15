
export const TradeTable = ({ trades }: { trades: any }) => {

    // console.log(trades)

    return (
        <div>
            {trades && trades?.trades && trades?.trades?.map((t: any) => <Trades key={Math.random()} price={t.price} quantity={t.quantity} isBuyerMaker={t.isBuyerMaker} timestamp={t.timestamp} />)}
            <Trades price={"100"} quantity={"100"} isBuyerMaker={true} timestamp={100} />
        </div>
    );

}

function Trades({ price, quantity, isBuyerMaker, timestamp }: { price: string, quantity: string, isBuyerMaker: boolean, timestamp: number }) {
    function formatTimestampToIST(timestamp: any) {
        const date = new Date(timestamp);
        const istOffset = 5.5 * 60 * 60 * 1000;
        const istDate = new Date(date.getTime() + istOffset);

        const hours = istDate.getUTCHours();
        const minutes = istDate.getUTCMinutes();
        const seconds = istDate.getUTCSeconds();

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

        return formattedTime;
    }


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
                    height: "100%",
                    background: "rgba(1, 167, 129, 0.325)",
                    transition: "width 0.3s ease-in-out",
                }}
            ></div>
            <div className={`flex justify-between text-xs w-full`}>
                <div style={{ color: isBuyerMaker ? "red" : "green" }} className='text-sm '>
                    {price}
                </div>
                <div>
                    {quantity}
                </div>
                <div>
                    {formatTimestampToIST(timestamp)}
                </div>
            </div>
        </div>
    );
}

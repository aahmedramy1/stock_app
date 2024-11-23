import TickerCard from "./TickerCard";


const TickersList = ({ tickers }: { tickers: { name: string; ticker: string }[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tickers.map((ticker, index) => (
            <TickerCard key={`${ticker.ticker}-${index}`} {...ticker} />
        ))}
    </div>
);

export default TickersList;

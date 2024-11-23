const TickerCard = ({ name, ticker }: { name: string; ticker: string }) => (
    <div className="bg-gray-800 p-4 rounded-md">
        <h1 className="text-white text-lg font-bold">{name}</h1>
        <p className="text-gray-400">{ticker}</p>
    </div>
);

export default TickerCard;
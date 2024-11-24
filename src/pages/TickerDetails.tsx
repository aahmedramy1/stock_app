import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTickerDetails } from "../features/tickers/tickersSlice";
import { AppDispatch, RootState } from "../app/store";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Confetti from "react-confetti";

const generateFakeStockData = () => {
    const data = [];
    let price = 100; // Start price
    for (let i = 0; i < 30; i++) {
        // Simulate stock price change
        price += (Math.random() - 0.5) * 5; // Random change between -2.5 and 2.5
        data.push([Date.now() + i * 86400000, parseFloat(price.toFixed(2))]); // Date + price
    }
    return data;
};

const TickerDetails = () => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [showOverlay, setShowOverlay] = useState(true);
    const fakeData = generateFakeStockData();

    const { ticker } = useParams();


    const dispatch: AppDispatch = useDispatch();
    const { tickerDetails, tickerDetailsStatus, tickerDetailsError } = useSelector(
        (state: RootState) => state.tickers
    );

    const handleHireClick = () => {
        setShowConfetti(true);
        setShowOverlay(false);
        setTimeout(() => {
            setShowConfetti(false);
        }, 5000);
    };

    useEffect(() => {
        if (ticker) {
            dispatch(fetchTickerDetails(ticker));
        }
    }, [ticker, dispatch]);

    if (tickerDetailsStatus === "loading") {
        return <div className="p-6">Loading...</div>;
    }

    if (tickerDetailsError) {
        return <div>Error: {tickerDetailsError}</div>;
    }

    if (!tickerDetails) {
        return <div>No details found.</div>;
    }

    const options = {
        title: {
            text: `${tickerDetails.name} Stock Price Data`,
        },
        xAxis: {
            type: "datetime",
            title: {
                text: "Date",
            },
        },
        yAxis: {
            title: {
                text: "Price (USD)",
            },
        },
        series: [
            {
                name: "Stock Price",
                data: fakeData,
                type: "line",
                color: "#2f7ed8",
            },
        ],
        tooltip: {
            xDateFormat: "%Y-%m-%d",
            // eslint-disable-next-line no-template-curly-in-string
            pointFormat: "Price: <b>${point.y}</b>",
        },
    };

    return (
        <div className="p-6 flex justify-between relative">
            <div className="relative w-[60%]">
                <HighchartsReact highcharts={Highcharts} options={options} />

                {showOverlay && (
                    <div
                        className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-xl z-10"
                    >
                        <div className="bg-white p-6 rounded-md shadow-lg text-center">
                            <h2 className="text-xl font-bold mb-4">To unlock chart: Hire Ahmed Ramy</h2>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                onClick={handleHireClick}
                            >
                                Hire
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-col border border-solid border-gray-300 rounded-xl p-4 gap-2">
                <div>
                    <span className="font-bold">Name:</span> {tickerDetails.name}
                </div>
                <div>
                    <span className="font-bold">Ticker:</span> {tickerDetails.ticker}
                </div>
                <div>
                    <span className="font-bold">Address: </span>
                    {tickerDetails.address?.address1} - {tickerDetails.address?.city} - {tickerDetails.address?.state}
                </div>
                <div>
                    <span className="font-bold">Market cap: </span>
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(tickerDetails.market_cap)}
                </div>
                <div>
                    <span className="font-bold">Employees: </span>
                    {tickerDetails.total_employees?.toLocaleString()}
                </div>
            </div>

            {showConfetti && (
                <div className="absolute inset-0 z-20">
                    <Confetti />
                </div>
            )}
        </div>
    );
};

export default TickerDetails;

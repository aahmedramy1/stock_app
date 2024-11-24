import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {fetchTickerDetails} from "../features/tickers/tickersSlice";
import {AppDispatch, RootState} from "../app/store";

const TickerDetails = () => {
    const { ticker } = useParams();
    const dispatch: AppDispatch = useDispatch();
    const { tickerDetails, tickerDetailsStatus, tickerDetailsError } = useSelector(
        (state: RootState) => state.tickers
    );

    useEffect(() => {
        if (ticker) {
            dispatch(fetchTickerDetails(ticker));
        }
    }, [ticker, dispatch]);

    if (tickerDetailsStatus === "loading") {
        return <div className='p-6'>Loading...</div>;
    }

    if (tickerDetailsError) {
        return <div>Error: {tickerDetailsError}</div>;
    }

    if (!tickerDetails) {
        return <div>No details found.</div>;
    }

    return (
        <div className="p-6">
            <div className="text-xl">
                {tickerDetails.ticker} - {tickerDetails.name}
            </div>
        </div>
    );
};

export default TickerDetails;

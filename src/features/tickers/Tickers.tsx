import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../app/store";
import {useEffect} from "react";
import {fetchTickers} from "./tickersSlice";
import {BeatLoader} from "react-spinners";

const Tickers = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {  tickers, status } = useSelector((state: RootState) => state.tickers);
    // name, ticker
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTickers());
        }
    }, [dispatch, status]);

    return (
        <div className='p-6'>
            {status === "loading" ? (
                <div className='flex justify-center'>
                    <BeatLoader />
                </div>
            ) : status === "failed" ? (
                <div className="text-white">Failed to load data</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {tickers?.results?.map((ticker) => (
                        <div key={ticker.ticker} className="bg-gray-800 p-4 rounded-md">
                            <h1 className="text-white text-lg font-bold">{ticker.name}</h1>
                            <p className="text-gray-400">{ticker.ticker}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Tickers;
import TickersList from "../features/tickers/TickersList";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store";
import {useCallback, useEffect, useState} from "react";
import {fetchTickers} from "../features/tickers/tickersSlice";
import Loader from "../components/Loader";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { tickers, status, error } = useSelector((state: RootState) => state.tickers);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTickers());
        }
    }, [dispatch, status]);

    const fetchMoreTickers = useCallback(() => {
        if (tickers.next_url) {
            setIsFetching(true);
            dispatch(fetchTickers(tickers.next_url)).finally(() => setIsFetching(false));
        }
    }, [dispatch, tickers.next_url]);

    useInfiniteScroll(fetchMoreTickers, !isFetching && status === "succeeded" && !!tickers.next_url);

    return (
        <div className="p-6">
            {status === "loading" && !tickers?.results?.length && !isFetching ? (
                <Loader isCentered />
            ) : status === "failed" ? (
                <div className="text-white">Failed to load data: {error}</div>
            ) : (
                <div className="flex flex-col gap-2">
                    {tickers?.results?.length > 0 && <TickersList tickers={tickers.results} />}
                    {isFetching && <Loader isCentered />}
                </div>
            )}
        </div>
    );
}

export default Home;
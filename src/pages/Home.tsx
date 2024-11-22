import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchTickers} from "../features/tickers/tickersSlice";
import {AppDispatch, RootState} from "../app/store";

const Home = () => {
    const dispatch = useDispatch<AppDispatch>()

    const {  status } = useSelector((state: RootState) => state.tickers);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTickers());
        }
    }, [dispatch, status]);

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home page!</p>
        </div>
    );
}

export default Home;
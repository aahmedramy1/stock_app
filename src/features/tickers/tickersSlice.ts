import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from "../../api";

interface Ticker {
    active: boolean;
    cik: string;
    composite_figi: string;
    currency_name: string;
    last_updated_utc: string;
    locale: string;
    market: string;
    name: string;
    primary_exchange: string;
    share_class_figi: string;
    ticker: string;
    type: string;
}

interface TickerResponse {
    count: number;
    next_url: string | undefined;
    request_id: string;
    results: Ticker[];
    status: string;
}

interface TickersState {
    tickers: TickerResponse;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    searchText: string;
}

export const fetchTickers = createAsyncThunk<
    TickerResponse,
    string | undefined,
    {
        rejectValue: string;
    }
>(
    'tickers/fetchTickers',
    async (nextUrl: string | undefined, { rejectWithValue }) => {
        try {
            const url = nextUrl
                ? `${nextUrl}&market=stocks&exchange=XNAS`
                : '/reference/tickers?market=stocks&exchange=XNAS';

            const response = await api.get(url)

            return response.data
        } catch (error: any) {
            if(error.status === 429) {
                return rejectWithValue('Too many requests. Please try again later.');
            }
            return rejectWithValue(error.message);
        }
    }
);


const tickersSlice = createSlice({
    name: 'tickers',
    initialState: {
        tickers: { results: [], next_url: undefined, count: 0, request_id: '', status: '' },
        status: 'idle',
        error: null,
        searchText: '',
    } as TickersState,
    reducers: {
        setSearchText: (state: TickersState, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTickers.fulfilled, (state, action: PayloadAction<TickerResponse>) => {
                state.status = 'succeeded';

                state.tickers.results.push(...action.payload.results);
                state.tickers.next_url = action.payload.next_url; // Update the next_url for pagination
            })
            .addCase(fetchTickers.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'An error occurred';
            });
    },
});

export const { setSearchText } = tickersSlice.actions;
export default tickersSlice.reducer;

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
    next_url: string;
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
    undefined,
    {
        rejectValue: string;
    }
>(
    'tickers/fetchTickers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/reference/tickers?market=stocks&exchange=XNAS');
            if (response.status !== 200) {
                if (response.status === 429) {
                    new Error('Too many requests. Please try again later.');
                }
                new Error('Failed to fetch tickers.');
            }

            return await response.data
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const tickersSlice = createSlice({
    name: 'tickers',
    initialState: {
        tickers: {},
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
                state.tickers = action.payload;
            })
            .addCase(fetchTickers.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'An error occurred';
            });
    },
});

export const { setSearchText } = tickersSlice.actions;
export default tickersSlice.reducer;

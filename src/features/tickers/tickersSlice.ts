import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from "../../api";
import {TickerDetailsResponse, TickerResponse, TickersState} from "./types";


export const fetchTickers = createAsyncThunk<
    TickerResponse,
    { nextUrl?: string; searchQuery?: string },
    {
        rejectValue: string;
    }
>(
    'tickers/fetchTickers',
    async ({ nextUrl, searchQuery }: { nextUrl?: string; searchQuery?: string }, { rejectWithValue }) => {
        try {
            let url = nextUrl
                ? `${nextUrl}&market=stocks&exchange=XNAS`
                : '/reference/tickers?market=stocks&exchange=XNAS';

            if (searchQuery) {
                url = `${url}&search=${(searchQuery)}`;
            }

            const response = await api.get(url);

            return response.data;
        } catch (error: any) {
            if (error.status === 429) {
                return rejectWithValue('Too many requests. Please try again later.');
            }
            return rejectWithValue(error.message);
        }
    }
);

export const fetchTickerDetails = createAsyncThunk<
    TickerDetailsResponse,
    string,
    {
        rejectValue: string;
    }
>(
    'tickers/fetchTickerDetails',
    async (ticker: string, { rejectWithValue }) => {
        try {
            const url = `/reference/tickers/${ticker}`;
            const response = await api.get(url);

            return response.data;
        } catch (error: any) {
            if (error.status === 429) {
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
        tickerDetails: null,
        tickerDetailsStatus: 'idle',
        tickerDetailsError: null,
    } as TickersState,
    reducers: {
        setSearchText: (state: TickersState, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        },
        resetStore: (state: TickersState) => {
            state.tickers = { results: [], next_url: undefined, count: 0, request_id: '', status: '' };
            state.status = 'idle';
            state.error = null;
            state.tickerDetails = null;
            state.tickerDetailsStatus = 'idle';
            state.tickerDetailsError = null;
        },
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
                state.tickers.next_url = action.payload.next_url;
            })
            .addCase(fetchTickers.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'An error occurred';
            })
            .addCase(fetchTickerDetails.pending, (state) => {
                state.tickerDetailsStatus = 'loading';
                state.tickerDetailsError = null;
            })
            .addCase(fetchTickerDetails.fulfilled, (state, action: PayloadAction<TickerDetailsResponse>) => {
                state.tickerDetailsStatus = 'succeeded';
                state.tickerDetails = action.payload.results;
            })
            .addCase(fetchTickerDetails.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.tickerDetailsStatus = 'failed';
                state.tickerDetailsError = action.payload ?? 'An error occurred';
            });
    },
});

export const { setSearchText, resetStore } = tickersSlice.actions;
export default tickersSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from "../../api";

interface TickersState {
    tickers: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}


export const fetchTickers = createAsyncThunk<
    any[],
    undefined,
    {
        rejectValue: string;
    }
>(
    'tickers/fetchTickers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/reference/tickers');
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
        tickers: [],
        status: 'idle',
        error: null,
    } as TickersState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchTickers.fulfilled, (state, action: PayloadAction<any[]>) => {
                state.status = 'succeeded';
                state.tickers = action.payload;
            })
            .addCase(fetchTickers.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.status = 'failed';
                state.error = action.payload ?? 'An error occurred';
            });
    },
});

export default tickersSlice.reducer;

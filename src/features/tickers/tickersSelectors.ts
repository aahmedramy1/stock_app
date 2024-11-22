import { RootState } from '../../app/store';

export const selectTickers = (state: RootState) => state.tickers.tickers;

export const selectTickersError = (state: RootState) => state.tickers.error;

export const selectTickersStatus = (state: RootState) => state.tickers.status;

export interface Ticker {
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

export interface TickerResponse {
    count: number;
    next_url: string | undefined;
    request_id: string;
    results: Ticker[];
    status: string;
}

export interface TickersState {
    tickers: TickerResponse;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    searchText: string;
}

export interface Address {
    address1: string;
    city: string;
    postal_code: string;
    state: string;
}

export interface Branding {
    icon_url: string;
    logo_url: string;
}

export interface TickerDetails {
    active: boolean;
    address: Address;
    branding: Branding;
    cik: string;
    composite_figi: string;
    currency_name: string;
    description: string;
    homepage_url: string;
    list_date: string;
    locale: string;
    market: string;
    market_cap: number;
    name: string;
    phone_number: string;
    primary_exchange: string;
    round_lot: number;
    share_class_figi: string;
    share_class_shares_outstanding: number;
    sic_code: string;
    sic_description: string;
    ticker: string;
    ticker_root: string;
    total_employees: number;
    type: string;
    weighted_shares_outstanding: number;
}

export interface TickerDetailsResponse {
    request_id: string;
    results: TickerDetails;
    status: string;
}

export interface TickersState {
    tickers: TickerResponse;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    searchText: string;
    tickerDetails: TickerDetails | null;
    tickerDetailsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    tickerDetailsError: string | null;
}
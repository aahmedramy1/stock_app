import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { resetStore, setSearchText } from '../features/tickers/tickersSlice';
import { useNavigate, useLocation } from 'react-router-dom';
// @ts-ignore
import logo from '../assets/images/logo.png';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const searchText = useSelector((state: RootState) => state.tickers.searchText);
    const location = useLocation(); // Get current route

    const [inputValue, setInputValue] = useState(searchText);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            dispatch(resetStore());
            dispatch(setSearchText(value));
        }, 500);
    };

    const handleGoHome = () => {
        dispatch(resetStore());
        setInputValue('');
        navigate('/');
    };

    return (
        <header className="flex items-center p-4 text-white shadow-md justify-center relative min-h-[72px]">
            <div className="absolute left-6">
                <img
                    src={logo}
                    alt="Logo"
                    className="h-8 w-auto cursor-pointer"
                    onClick={handleGoHome}
                />
            </div>

            {/* Only show search bar if path is '/' */}
            {location.pathname === '/' && (
                <div className="w-1/3 mx-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
        </header>
    );
};

export default Header;
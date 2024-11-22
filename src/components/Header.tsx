// @ts-ignore
import logo from '../assets/images/logo.png'
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../app/store";
import {setSearchText} from "../features/tickers/tickersSlice";

const Header = () => {

    const dispatch = useDispatch<AppDispatch>();
    const searchText = useSelector((state: RootState) => state.tickers.searchText);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchText(e.target.value)); // Dispatch the action to update search text in the state
    };

    return (
        <header className="flex items-center p-4  text-white  shadow-md justify-center relative">
            <div className="absolute left-6">
                <img src={logo} alt="Logo" className="h-8 w-auto"/>
            </div>

            <div className="w-1/3 mx-4">
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchChange}
                    placeholder="Search..."
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
            </div>
        </header>
    )
}

export default Header;


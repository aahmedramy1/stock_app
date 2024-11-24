import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from "../components/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import TickerDetails from "../pages/TickerDetails";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:ticker" element={<TickerDetails />} />
            </Routes>
            <ToastContainer
                position="bottom-center"
            />
        </>
    );
}

export default App;
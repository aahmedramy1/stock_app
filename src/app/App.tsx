import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Header from "../components/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <ToastContainer
                position="bottom-center"
            />
        </>
    );
}

export default App;
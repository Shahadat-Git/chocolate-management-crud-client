import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { BsArrowLeft } from "react-icons/bs";

const Main = () => {
    return (
        <div className=' bg-base-200 h-screen p-10'>
            <div className='container mx-auto bg-base-100 rounded-lg p-20 '>
                <Header></Header>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;
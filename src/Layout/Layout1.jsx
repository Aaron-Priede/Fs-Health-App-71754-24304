import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import './Layout1.css';
import Carousel from "../Components/Carousel";

const Layout1 = () => {
    return (
        <div className="layout1">
            <Navbar className="navbar" />
           
            <div className="content">
                <Outlet />
            </div>
            
        </div>
    );
};

export default Layout1;
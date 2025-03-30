import React from "react";
import Hero from "./Hero";

const NotFound = () => {
    return (
        <>
        <Hero text="Oops! The page you are looking for is not found."/>
        {/* <div className="container text-center my-5" style={{color : 'revert'}}>
            <h1>404</h1>
            <h2>Oops! The page you are looking for is not found.</h2>
        </div> */}
        </>
    );
};

export default NotFound;
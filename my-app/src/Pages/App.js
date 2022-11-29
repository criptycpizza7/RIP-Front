import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import AppRouter from "../components/appRouter";
import NavBar from "../components/navbar";
import '../css/App.css'
import Cart from "./cart";

function App(){
    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter />
            <Route exact path='/cart' component={Cart}/>
        </BrowserRouter>
    );
};

export default App;

import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppRouter from "../components/appRouter";
import NavBar from "../components/navbar";
import '../css/App.css'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import AuthService from "../components/requests";
import {Spinner} from "react-bootstrap";

const App = observer (() => {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token !== '')
            AuthService.verify(localStorage.getItem('token')).then(data => {
                user.setIsAuth(true);
        }).catch(data => {
            user.setIsAuth(false);
            })
                .finally(() => setLoading(false))
    })

    if(loading){
        return (
            <Spinner animation={"grow"}/>
        )
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter />
        </BrowserRouter>
    );
})

export default App;

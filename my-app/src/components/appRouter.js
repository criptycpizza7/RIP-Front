import React from 'react';
import {Switch, Route} from "react-router-dom";
import {publicRoutes} from "../routes";
import {store} from "../Store/store";
import {createAuth} from "../Store/actionCreators";
import {useSelector} from "react-redux";

const AppRouter = () => {
    //store.dispatch(createAuth(true));
    const isAuth = useSelector(state => state.auth.status);
    return (
        <Switch>
            {publicRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} component={Component} exact/>
            )}
        </Switch>
    );
};

export default AppRouter;

import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import UserStore from '../Store/auth';
import {useHistory} from "react-router";
import {CART_ROUTE, MAIN_PAGE_ROUTE, MANAGER_ROUTE} from "../utils/routes";
import AuthService from "./requests";

const NavBar = observer (() => {

    const history = useHistory();

    const {user} = useContext(Context);

    const cart = [];

    const logOut = () => {
        UserStore.setToken('');
        UserStore.setIsAuth(false);
        localStorage.setItem('token', '');
        localStorage.setItem('user_id', '');
        localStorage.setItem('is_man', '');
        AuthService.logOut();
    }

    return (
        <Navbar bg="dark" variant="dark" style={{height: 54}}>
            <Container>
                <Navbar.Brand onClick={() => history.push(MAIN_PAGE_ROUTE)}>Главная</Navbar.Brand>
                {!user.isAuth ?
                <Nav className='ml-auto' style={{color: 'white'}}>
                    <Button className='ms-1' variant="primary" href='/auth'>Войти</Button>
                </Nav>
                    :
                <Nav>
                    {localStorage.getItem('is_man') === 'true' ?
                        <Button variant={"info"} onClick={() => history.push(MANAGER_ROUTE)}>Панель менеджера</Button>
                        :
                        <div></div>}
                        <Button variant='danger' onClick={() => history.push(CART_ROUTE)}>{"Аккаунт"}</Button>
                        <Button variant={"secondary"} onClick={logOut}>Выйти</Button>
                </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
import React, {useContext} from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import UserStore from '../Store/auth';
import {useHistory} from "react-router";
import {CART_ROUTE} from "../utils/routes";

const NavBar = observer (() => {

    const history = useHistory();

    const {user} = useContext(Context);

    const cart = [];

    const logOut = () => {
        UserStore.setToken('');
        UserStore.setIsAuth(false);
        localStorage.setItem('token', '');
    }

    return (
        <Navbar bg="dark" variant="dark" style={{height: 54}}>
            <Container>
                <Navbar.Brand href="/">Главная</Navbar.Brand>
                {!user.isAuth ?
                <Nav className='ml-auto' style={{color: 'white'}}>
                    <Button className='ms-1' variant="primary" href='/auth'>Войти</Button>
                </Nav>
                    :
                <Nav>
                    <Button variant='danger' onClick={() => history.push(CART_ROUTE)}>{"Корзина" + " (" + cart.length + ")"}</Button>
                    <Button variant={"secondary"} onClick={logOut}>Выйти</Button>
                </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;
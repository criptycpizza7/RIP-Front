import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {store} from "../Store/store";
import {createAuth} from "../Store/actionCreators";
import {useSelector} from "react-redux";


const NavBar = () => {

    const update = () => {

        if(store.getState().auth.status) {
            store.dispatch(createAuth(false));
        }
        else{
            store.dispatch(createAuth(true));
        }
    }

    const isAuth = useSelector(state => state.auth.status);

    const cart = useSelector(state => state.cart.arr);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Main</Navbar.Brand>
                {isAuth && <Button variant='danger' href='/cart'>{"Cart" + " (" + cart.length + ")"}</Button>}
                {!isAuth ?
                    <Nav className='ml-auto' style={{color: 'white'}}>
                        <Button variant="warning" onClick={update}>Неавторизованный</Button>
                    </Nav>
                    :
                    <Nav>
                        <Button variant="primary" onClick={update}>Авторизованный</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
};

export default NavBar;
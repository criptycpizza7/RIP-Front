import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";
import {MAIN_PAGE_ROUTE, REGISTRATION_ROUTE} from "../utils/routes";
import AuthService from "../components/requests";
import {observer} from "mobx-react-lite";
import UserStore from '../Store/auth';
import {useHistory} from "react-router";
import {Context} from "../index";
import jwtDecode from "jwt-decode";


const Auth = observer (() => {

    const {user} = useContext(Context);

    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    async function logIn(){
        try {
            const response = await AuthService.logIn(login, password);
            user.setIsAuth(true);
            history.push(MAIN_PAGE_ROUTE);
        }
        catch (e){
            console.log(e.response.data.message)
        }
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-top'
        >
            <Card style={{width: 400}} className='p-5'>
                <h2>{'Авторизация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите логин'
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        type='password'
                        className='mt-2'
                        placeholder='Введите пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row className='d-flex justify-content-between mt-3'>
                        <div>
                            <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                        </div>
                        <Button variant='outline-success' onClick={logIn}>
                            Войти
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
})

export default Auth;
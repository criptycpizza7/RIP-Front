import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Form, NavLink, Row} from "react-bootstrap";
import {AUTH_ROUTE, REGISTRATION_ROUTE} from "../utils/routes";
import AuthService from "../components/requests";
import {useHistory} from "react-router";

const Registration = () => {

    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [isMan, setIsMan] = useState(false);

    const history = useHistory();

    const emailRE = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;

    function Register(){

        if(!/\w/.test(login)){
            alert('Введён некорректный логин');
            return;
        }
        if(!emailRE.test(email)) {
            alert('Введён некорректный email');
            return;
        }
        if(!password){
            alert('Введите пароль');
            return;
        }
        if(!confPassword){
            alert('Подтвердите пароль');
            return;
        }
        if(password !== confPassword){
            alert('Введённые пароли не совпадают');
            return;
        }
        try{

        } catch (e){
            alert(e.response.data.message);
        }
        AuthService.registration(login, password, email, isMan);
        history.push(AUTH_ROUTE);
    }

    useEffect(() => {
        console.log(isMan);
    }, [isMan])

    return (
        <Container
            className='d-flex justify-content-center align-items-top'
        >
            <Card style={{width: 400}} className='p-5'>
                <h2>Регистрация</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите логин'
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        type='password'
                        className='mt-2'
                        placeholder='Введите пароль'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Form.Control
                        type='password'
                        className='mt-2'
                        placeholder='Подтвердите пароль'
                        value={confPassword}
                        onChange={e => setConfPassword(e.target.value)}
                    />
                    <Form.Check
                        className='mt-1'
                        type="switch"
                        id="custom-switch"
                        label="Мэнеджер"
                        onChange={() => setIsMan(!isMan)}
                    />
                    <Row className='d-flex justify-content-between mt-3'>
                        <div>
                            <NavLink to={REGISTRATION_ROUTE}>Войти</NavLink>
                        </div>
                        <Button variant='outline-success' onClick={Register}>
                            Зарегистрироваться
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Registration;
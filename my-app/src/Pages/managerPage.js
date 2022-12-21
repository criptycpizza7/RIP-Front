import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {addGame} from "../components/requests";
import {Context} from "../index";
import Calendar from "react-calendar";

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

const ManagerPage = () => {

    const {user} = useContext(Context);

    const [name, setName] = useState('');
    const [developer, setDeveloper] = useState('');
    const [publisher, setPublisher] = useState('');
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState('');

    const addGameButton = () => {
        if(isNumeric(price))
            //console.log(name, developer, publisher, price, genre, user.user);
            addGame(name, developer, publisher, releaseDate.getFullYear() + '-' + (releaseDate.getMonth()+1) + "-" + releaseDate.getDate(), price, genre, user.user);
        else
            alert('Цена должна быть числом');
    }
    return (
        <Container
            className='d-flex justify-content-start align-items-top'
        >
            <Card style={{width: 400}} className='p-5'>
                <h2>{'Добавление'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите название'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите разработчика'
                        value={developer}
                        onChange={e => setDeveloper(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите издателя'
                        value={publisher}
                        onChange={e => setPublisher(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите жанры'
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                    />
                    <Form.Control
                        className='mt-2'
                        placeholder='Введите цену'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <Form.Control
                        disabled={true}
                        className='mt-2'
                        placeholder='Дата'
                        value={releaseDate.getFullYear() + '-' + (releaseDate.getMonth()+1) + "-" + releaseDate.getDate()}
                    />
                    <Calendar value={releaseDate} onChange={setReleaseDate}></Calendar>
                    <Button className='mt-3' variant='outline-success' onClick={addGameButton}>
                        Добавить
                    </Button>
                </Form>
            </Card>
        </Container>
    );
};

export default ManagerPage;
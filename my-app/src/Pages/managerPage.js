import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {addGame, getGamesByMan} from "../components/requests";
import {Context} from "../index";
import Calendar from "react-calendar";
import {GameCard} from "../components/gameCard";
import {retry} from "@reduxjs/toolkit/query";
import {useHistory} from "react-router";
import {GAME_MAN_ROUTE} from "../utils/routes";

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

    const [games, setGames] = useState([]);

    const history = useHistory();

    const addGameButton = async () => {
        if(isNumeric(price))
            await addGame(name, developer, publisher, releaseDate.getFullYear() + '-' + (releaseDate.getMonth()+1) + "-" + releaseDate.getDate(), price, genre, user.user);
        else
            alert('Цена должна быть числом');
    }

    let res = [];

    const getGames = async () => {
        res = await getGamesByMan(user.user);
        console.log(res);
        setGames(res);
        //setGames(await getGamesByMan(user.user));
    }

    return (
        <Container
            className='d-flex justify-content-start align-items-top'
        >
            <Col>
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
            </Col>
            <Col>
                <div>
                    <Button onClick={getGames}>Показать</Button>
                    {games.map((game) => {
                        return(
                            <Card onClick={() => history.push(GAME_MAN_ROUTE + '/' + game.id)}>
                                <Card.Text>{game.name}</Card.Text>
                            </Card>
                        )
                    })}
                </div>
            </Col>
        </Container>
    );
};

export default ManagerPage;
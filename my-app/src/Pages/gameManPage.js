import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router";
import {Button, Card, Container, Form} from "react-bootstrap";
import Calendar from "react-calendar";
import {chgGame, getGameByID} from "../components/requests";
import {Context} from "../index";
import {MANAGER_ROUTE} from "../utils/routes";

const GameManPage = () => {

    const {id} = useParams();

    const {user} = useContext(Context);

    const history = useHistory();

    let game = {};

    const [name, setName] = useState('');
    const [developer, setDeveloper] = useState('');
    const [publisher, setPublisher] = useState('');
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [price, setPrice] = useState('');
    const [genre, setGenre] = useState('');

    const chgGameButton = async () => {
        //const game = getGameByID(id);
        game['id'] = id;
        game['name'] = name;
        game['genre'] = genre;
        game['releasedate'] = releaseDate.getFullYear() + '-' + (releaseDate.getMonth()+1) + "-" + releaseDate.getDate();
        game['developer'] = developer;
        game['publisher'] = publisher;
        game['price'] = price;
        game['managed_by'] = user.user;
        await chgGame(game.id, game.name, game.developer, game.publisher, game.releasedate, game.price, game.genre, user.user);
        //await chgGame(game);
        history.push(MANAGER_ROUTE);
    }

    useEffect(() => {
        let ignore = false;
        if(!ignore) {
            getGameByID(id).then((res) => {
                setName(res.name);
                setDeveloper(res.developer);
                setPublisher(res.publisher);
                const date = res.releasedate.split('-');
                setReleaseDate(new Date(date[0], date[1], date[2]))
                setPrice(res.price);
                setGenre(res.genre);
            });
        }
        return(() => ignore = true);
    }, [])

    return (
        <Container
            className='d-flex justify-content-start align-items-top'
        >
                <Card style={{width: 400}} className='p-5'>
                    <h2>Изменение</h2>
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
                        <Button className='mt-3' variant='outline-success' onClick={chgGameButton}>
                            Изменить
                        </Button>
                    </Form>
                </Card>
        </Container>
    );
};

export default GameManPage;
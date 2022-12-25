import React, {useContext, useEffect, useState} from "react";
import AuthService, {getCart, getGameByName, getGenres, getLib} from "../components/requests";
import {Col, Container, Row} from "react-bootstrap";
import InputField from "../components/inputField";
import {GameCard} from "../components/gameCard";
import gameStore from "../Store/gameStore";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const MainPage = observer (() => {

    const {user} = useContext(Context);
    const {cart} = useContext(Context);
    const {lib} = useContext(Context);

    const [searchGame, setSearchGame] = useState('Borderlands 2');

    const [gamesGens, setGamesGens] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleSearchGame = async () =>{
        cart.make(await getCart(user.user));
        lib.make(await getLib(user.user));

        //console.log(user.user);
        setLoading(true);
        const results = await getGameByName(searchGame);
        setGamesGens(results);
        // Убираем загрузку
        gameStore.setGames(gamesGens);
        setLoading(false);
    }

    useEffect(() =>{
        user.setUser(parseInt(localStorage.getItem('user_id')));
        user.setManager(localStorage.getItem('is_man'));
    }, [])

    return (
        <div>
            <InputField value={searchGame} placeholder='Поиск' setValue={setSearchGame} loading={loading} onSubmit={handleSearchGame} buttonTitle={'Искать'}/>
            {!gamesGens.length ? <h1 key = 'outh1'>К сожалению, пока ничего не найдено :(</h1>:
                <Row>
                    {gamesGens.map((game) => {
                        return (
                            <GameCard game = {game.name} genre = {game.genre} price = {game.price} object={game}/>
                        );
                    })}
                </Row>
            }
        </div>
    );
})

export default MainPage;
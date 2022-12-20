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
        const games = results;
        const genres = await getGenres();
        let genre = [];
        for(let i = 0; i < games.length; i++){
            const gens = games[i].genre;
            let gen_names = [];
            for(let j = 0; j < gens.length; j++){
                for(let k = 0; k < genres.length; k++){
                    if(genres[k].id === gens[j]){
                        gen_names.push(genres[k].name);
                    }
                }
            }
            genre.push({'id': games[i].id, 'name': games[i].name, 'genre': gen_names, 'releasedate': games[i].releasedate,
                'publisher': games[i].publisher, 'developer': games[i].developer, 'price': games[i].price});
        }
        setGamesGens(genre);
        // Убираем загрузку
        gameStore.setGames(gamesGens);
        setLoading(false);
    }

    useEffect(() =>{
        user.setUser(parseInt(localStorage.getItem('user_id')));
    }, [])

    return (
        <div>
            <InputField value={searchGame} placeholder='Поиск' setValue={setSearchGame} loading={loading} onSubmit={handleSearchGame} buttonTitle={'Искать'}/>
            {!gamesGens.length ? <h1 key = 'outh1'>К сожалению, пока ничего не найдено :(</h1>:
                <Row>
                    {gamesGens.map((game) => {
                        return (
                            <GameCard game = {game.name} genre = {game.genre} date = {game.releasedate} object={game}/>
                        );
                    })}
                </Row>
            }
        </div>
    );
})

export default MainPage;
import React, {useState} from "react";
import {store} from "../Store/store";
import {createGame, createLoading} from "../Store/actionCreators";
import {getGameByName, getGenres} from "../components/requests";
import {Button, Col, Row} from "react-bootstrap";
import InputField from "../components/inputField";
import {GameCard} from "../components/gameCard";
import {useDispatch, useSelector} from "react-redux";

function MainPage() {

    //const [loading, setLoading] = useState(false);

    const [searchGame, setSearchGame] = useState('Borderlands 2');

    const [gamesGens, setGamesGens] = useState([]);

    const loadingHook = useSelector(state => state.load.status);

    const dispatch = useDispatch();

    const handleSearchGame = async () =>{
        dispatch(createLoading(true));
        const results = await getGameByName(searchGame);
        store.dispatch(createGame(results));
        const games = store.getState().game.arr;
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
        dispatch(createLoading(false));
    }


    return (
        <div>
            <InputField value={searchGame} placeholder='Поиск' setValue={setSearchGame} loading={store.getState().load.status} onSubmit={handleSearchGame} buttonTitle={'Искать'}/>
            {!gamesGens.length ? <h1 key = 'outh1'>К сожалению, пока ничего не найдено :(</h1>:
                <Col>
                    {gamesGens.map((game) => {
                        return (
                            <GameCard game = {game.name} genre = {game.genre} date = {game.releasedate} object={game}/>
                        );
                    })}
                </Col>}
            {gamesGens.length > 0 &&
                <Col>
                    <input type="checkbox"/>
                </Col>
            }
        </div>
    );
}

export default MainPage;
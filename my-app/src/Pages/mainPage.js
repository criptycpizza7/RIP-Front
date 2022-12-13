import React, {useState} from "react";
import AuthService, {getGameByName, getGenres} from "../components/requests";
import {Col} from "react-bootstrap";
import InputField from "../components/inputField";
import {GameCard} from "../components/gameCard";
import gameStore from "../Store/gameStore";
import {observer} from "mobx-react-lite";

const MainPage = observer (() => {

    //AuthService.verify()

    const [searchGame, setSearchGame] = useState('Borderlands 2');

    const [gamesGens, setGamesGens] = useState([]);

    const [loading, setLoading] = useState(false);

    const handleSearchGame = async () =>{
        setLoading(true);
        const results = await getGameByName(searchGame);
        results.forEach(element => gameStore.add(element));
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
        setLoading(false);
        gameStore.mas = results;
    }

    return (
        <div>
            <InputField value={searchGame} placeholder='Поиск' setValue={setSearchGame} loading={loading} onSubmit={handleSearchGame} buttonTitle={'Искать'}/>
            {!gamesGens.length ? <h1 key = 'outh1'>К сожалению, пока ничего не найдено :(</h1>:
                <Col>
                    {gamesGens.map((game) => {
                        return (
                            <div key = {game.id}>
                                <GameCard game = {game.name} genre = {game.genre} date = {game.releasedate} object={game}/>
                            </div>
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
})

export default MainPage;
import axios from "axios";

const DEFAULT_SEARCH_GAME = 'Borderlands 2';

const getGameByName = async (name = DEFAULT_SEARCH_GAME) =>{
    const res = axios.get(`http://127.0.0.1:8000/find_game/?format=json&search=${name}`)
        .then((response) => {
            return response.data;
        }).catch(()=>{
            return {resultCount:0, results:[]}
        })
    return res;
}

const getGenres = async () => {
    const res = axios.get(`http://127.0.0.1:8000/Genres/?format=json`)
        .then((response) => {
            return response.data;
        }).catch(() => {
            return {resultCount:0, results:[]}
        })
    return res;
}

export {getGameByName, getGenres};
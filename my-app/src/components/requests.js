import axios from "axios";
import UserStore from '../Store/auth'
import jwtDecode from "jwt-decode";

const API_URL = 'http://127.0.0.1:8000/api'

export const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use(config => {
    config.headers.Authorization = 'Token' + localStorage.getItem('token');
    return config;
})

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

const getGameByID = async (id = 0) =>{
    const res = axios.get(`http://127.0.0.1:8000/Games/${id}`)
        .then((response) => {
            return response.data;
        }).catch(()=>{
            return {resultCount:0, results:[]}
        })
    return res;
}

const addGame = async (name = '', developer = '', publisher = '', releaseDate = '', price = 0, genres = '', managed_by = 0) => {
    return (await axios.post('http://127.0.0.1:8000/Games/', {
        "name": name,
        "genre": genres,
        "releasedate": releaseDate,
        "developer": developer,
        "publisher": publisher,
        "price": price,
        "managed_by": managed_by
    })).data
}

const chgGame = async (id = 0, name = '', developer = '', publisher = '', releaseDate = '', price = 0, genres = '', managed_by = 0) => {
    return (await axios.put(`http://127.0.0.1:8000/Games/${id}/`, {
        "id": id,
        "name": name,
        "genre": genres,
        "releasedate": releaseDate,
        "developer": developer,
        "publisher": publisher,
        "price": price,
        "managed_by": managed_by
    })).data
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

const getCart = async (id = 0) => {
    const res = axios.get(`http://127.0.0.1:8000/Cart/?search=${id}`)
        .then((response) => {
            return response.data;
        }).catch(() => {
            return {resultCount:0, results:[]}
        })
    return res;
}

const getLib = async (id = 0) => {
    const res = axios.get(`http://127.0.0.1:8000/Library/?search=${id}`)
        .then((response) => {
            return response.data;
        }).catch(() => {
            return {resultCount:0, results:[]}
        })
    return res;
}

const getGamesByMan = async (man_by) => {
    const res = axios.get(`http://127.0.0.1:8000/getGameByMan/?search=${man_by}`)
        .then((response) => {
            return response.data;
        }).catch(() => {
            return {resultCount:0, results:[]}
        })
    return res;
}

class CartService{
    static async addToCart(userID = 0, gameID = 0){
        return (await api.post('/addToCart', {
            "user_id": userID,
            "game_id": gameID
        })).data
    }

    static async delFromCart(pk = 0){
        return (await axios.post(`http://127.0.0.1:8000/Cart/${pk}/delete/`))
    }
}

class LibService{
    static async addToLib(userID = 0, gameID = 0){
        return (await axios.post(`http://127.0.0.1:8000/Library/`, {
            "user_id": userID,
            "game_id": gameID
        })).data
    }
}


export default class AuthService{
    static async logIn(login = '', password = ''){
        const {data} = await axios.post('http://127.0.0.1:8000/api/login/', {login, password});
        localStorage.setItem('token', data.access);
        const user = jwtDecode(data.access);
        localStorage.setItem('user', user.user_id);
        UserStore.setUser(user.user_id);
        return jwtDecode(data.access);
    }

    static async registration(login = '', password = '', email = '', isMan = false){
        return axios.post('http://127.0.0.1:8000/api/register', {
            "login": login,
            "password": password,
            "email": email,
            "is_manager": isMan
        });
    }

    static async logOut(){
        return api.post('/logout');
    }

    static async fetchUsers(){
        return api.post('/user');
    }

    static async verify(token){
        const {data} = await api.post('/token/verify/', {'token': token});
    }
}

export {getGameByName, getGenres, CartService, getCart, getGameByID, getLib, LibService, addGame, getGamesByMan, chgGame};
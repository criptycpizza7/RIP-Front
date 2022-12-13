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
    const res = axios.get(`http://127.0.0.1:8000/api/cart?search=${id}`)
        .then((response) => {
            return response.data;
        }).catch(() => {
            return {resultCount:0, results:[]}
        })
    return res;
}

class CartService{
    static async addToCart(userID = 0, gameID = 0){
        return (await api.post('/addToCart', {userID, gameID})).data
    }
}

export default class AuthService{
    static async logIn(login = '', password = ''){
        const {data} = await axios.post('http://127.0.0.1:8000/api/login/', {login, password});
        localStorage.setItem('token', data.access);
        return jwtDecode(data.access);
    }

    static async registration(login = '', password = '', email = ''){
        return axios.post('http://127.0.0.1:8000/api/register', {"login": login, "password": password, "email": email});
    }

    static async logOut(){
        return api.post('/logout');
    }

    static async fetchUsers(){
        return api.post('/user');
    }

    static async verify(token){
        const {data} = api.post('/token/verify', token);
        localStorage.setItem('token', data.access);
    }
}

export {getGameByName, getGenres, CartService, getCart};
import {
    createLoading,
    createGame,
    createAuth,
    createCartAdd,
    createCartDel,
    createCart
} from './actionCreators';
import {auth, cartAdd, cartDel, loading, actGame, cart} from './actions';


const initialStateLoad = createLoading(false);

function loadReducer(state = initialStateLoad, action){
    switch(action.type){
        case loading:
            return createLoading(action.status);

        default:
            return state;
    }
}

const initialStateGame = createGame([]);

function gameReducer(state = initialStateGame, action){
    if(action.type === actGame)
        return createGame(action.arr);
    return state;
}

const initialStateAuth = createAuth(false);

function authReducer(state = initialStateAuth, action){
    switch (action.type){
        case auth:
            return createAuth(action.status);

        default:
            return state;
    }
}

const initialStateCart = createCart([]);

function cartReducer(state = initialStateCart, action){
    if(action.type === cart)
        return createCart(action.arr);
    return state;
}

export {loadReducer, gameReducer, authReducer, cartReducer};

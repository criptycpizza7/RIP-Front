import {loading, actGame, actSearchGame, auth, cart, cartAdd, cartDel} from './actions';


function createLoading(bool){
    return {
        type: loading,
        status: bool
    }
}

function createGame(arr){
    return{
        type: actGame,
        arr: arr
    }
}

function createSearchGame(str){
    return{
        type: actSearchGame,
        str: str
    }
}

function createAuth(bool){
    return{
        type: auth,
        status: bool
    }
}

function createCartAdd(game){
    return{
        type: cartAdd,
        game: game
    }
}

function createCartDel(game){
    return{
        type: cartDel,
        game: game
    }
}

function createCart(arr){
    return{
        type: cart,
        arr: arr
    }
}

export {createLoading, createGame, createAuth, createCartAdd, createCartDel, createCart};

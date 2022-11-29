import {combineReducers} from "redux";
import {loadReducer, gameReducer, authReducer, cartReducer} from "./reducers";


const rootReducer = combineReducers({
    load: loadReducer,
    game: gameReducer,
    auth: authReducer,
    cart: cartReducer,
    }
)

export {rootReducer};
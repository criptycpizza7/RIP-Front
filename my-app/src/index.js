import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './Pages/App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import UserStore from './Store/auth'
import GameStore from "./Store/gameStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: UserStore,
        games: GameStore,
    }}>
        <App />
    </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

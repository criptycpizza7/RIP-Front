import React, {useContext, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {getCart, getGameByIDManager, getLib} from "../components/requests";
import {observer} from "mobx-react-lite";
import CartCard from "./CartCard";
import {Context} from "../index";
import LibCard from "./LibCard";

const Cart = observer(() => {

    const {cart} = useContext(Context);
    const {lib} = useContext(Context);

    const [cartS, setCart] = useState([]);
    const [libS, setLib] = useState([]);
    const [games, setGames] = useState([]);
    const [gamesLib, setGamesLib] = useState([]);

    const [loading, setLoading] = useState(false);

    const [cartOrLib, setCartOrLib] = useState(false);

    const userID = localStorage.getItem('user');

    let Games = [];

    const makeCart = async () => {
        await setLoading(true);
        setGamesLib([]);
        setCartOrLib(false);
        const results = await getCart(userID);
        setCart(results);
        cart.make(results);
        await setLoading(false);
    }

    const makeLib = async () => {
        await setLoading(true);
        setGames([]);
        setCartOrLib(true);
        const results = await getLib(userID);
        setLib(results);
        lib.make(results);
        for(let i = 0; i < lib.mas.length; ++i){
            let elem = await getGameByIDManager(lib.mas[i].game_id);
            elem.lib_id = lib.mas[i].id;
            Games.push(elem);
        }
        setGamesLib(Games);
        await setLoading(false);
    }

    useEffect( () => {
        const get = async () =>{
            let Games = [];
            for(let i = 0; i < cartS.length; ++i){
                let elem = await getGameByIDManager(cartS[i].game_id);
                elem.cart_id = cartS[i].pk;
                Games.push(elem);
            }
            setGames(Games);
        }
        get();
    }, [cartS])

    useEffect( () => {
        console.log('games', games);
    }, [games])

    return (
        <div>
            <Button onClick={makeCart} disabled={loading}>Корзина</Button>
            <Button onClick={makeLib} disabled={loading}>Библиотека</Button>
            {!cartOrLib ? (!games.length ? <div></div>:
                <div>
                    {games.map((game) => {
                        return(
                            <div key ={game.id}>
                                <CartCard name = {game.name} cart_id = {game.cart_id} game_id = {game.id} price={game.price}/>
                            </div>
                        )
                    })
                    }
                </div>) :
                (!gamesLib.length ? <div></div>:
                <div>
                    {gamesLib.map((game) => {
                        return(
                            <div key ={game.id}>
                                <LibCard name = {game.name} lib_id = {game.lib_id} object={game} library={lib.mas}/>
                            </div>
                        )
                    })
                    }
                </div>)
            }
        </div>
    );
})

export default Cart;
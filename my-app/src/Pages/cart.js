import React, {useContext, useEffect, useState} from 'react';
import {Button} from "react-bootstrap";
import {getCart, getGameByID, getLib} from "../components/requests";
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

    const [loading, setLoading] = useState(false);

    const [cartOrLib, setCartOrLib] = useState(false);

    const userID = localStorage.getItem('user');

    const makeCart = async () => {
        await setLoading(true);
        setCartOrLib(false);
        const results = await getCart(userID);
        setCart(results);
        cart.make(results);
        await setLoading(false);
    }

    const makeLib = async () => {
        await setLoading(true);
        setCartOrLib(true);
        const results = await getLib(userID);
        setLib(results);
        lib.make(results);
        await setLoading(false);
    }

    useEffect( () => {
        const get = async () =>{
            let Games = [];
            for(let i = 0; i < cartS.length; ++i){
                let elem = await getGameByID(cartS[i].game_id);
                elem.cart_id = cartS[i].pk;
                Games.push(elem);
            }
            setGames(Games);
        }
        get();
    }, [cartS])

    useEffect( () => {
        const get = async () =>{
            let Games = [];
            for(let i = 0; i < libS.length; ++i){
                let elem = await getGameByID(libS[i].game_id);
                elem.cart_id = libS[i].pk;
                Games.push(elem);
            }
            setGames(Games);
        }
        get();
    }, [libS])

    return (
        <div>
            <Button onClick={makeCart} disabled={loading}>Корзина</Button>
            <Button onClick={makeLib} disabled={loading}>Библиотека</Button>
            {!cartOrLib ? (!games.length ? <div></div>:
                <div>
                    {games.map((game) => {
                        return(
                            <div key ={game.id}>
                                <CartCard name = {game.name} cart_id = {game.cart_id} game_id = {game.id}/>
                            </div>
                        )
                    })
                    }
                </div>) :
                (!games.length ? <div></div>:
                <div>
                    {games.map((game) => {
                        return(
                            <div key ={game.id}>
                                <LibCard name = {game.name} lib_id = {game.lib_id}/>
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
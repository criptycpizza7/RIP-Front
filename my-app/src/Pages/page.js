import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Container} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useParams} from "react-router";
import {CartService, getCart, getGameByID} from "../components/requests";
import {Context} from "../index";

const gamePage = observer(() => {

    const params = useParams();

    const [game, setGame] = useState({});

    const [isInCart, setIsInCart] = useState(false);
    const [isInLib, setIsInLib] = useState(false);

    const [loading, setLoading] = useState(false);

    const {user} = useContext(Context);
    const {cart} = useContext(Context);
    const {lib} = useContext(Context);

    const isAuth = user.isAuth;
    const userID = user.user;

    const gameID = params.id;

    const getGame = async () => {
        return await getGameByID(gameID);
    }

    getGame();

    let ind = [];
    cart.arr.map(elem => ind.push(elem.game_id));

    let indLib = [];
    lib.arr.map(elem => indLib.push(elem.game_id));

    let pk = 0;

    const addToCart = async () =>{
        setLoading(true);
        await CartService.addToCart(userID, gameID);
        cart.add(game);
        setIsInCart(true);
        setLoading(false);
    }

    const delFromCart = async () =>{
        setLoading(true);

        for(let i = 0; i < cart.arr.length; ++i)
            if(game.id === cart.arr[i].game_id)
                pk = cart.arr[i].pk;

        await CartService.delFromCart(pk);
        cart.del(pk);
        setIsInCart(false);
        setLoading(false);
    }

    useEffect(() =>{
        getGame().then(data => setGame(data));
    }, [])

    useEffect(() => {

        getCart(userID).then(data => cart.make(data));

        for(let i = 0; i < cart.arr.length; ++i)
            if(game.id === cart.arr[i].game_id)
                pk = cart.arr[i].pk;

        let pkLib = 0;
        for(let i = 0; i < lib.arr.length; ++i)
            if(game.id === lib.arr[i].game_id)
                pkLib = lib.arr[i].pk;

        setIsInCart(ind.indexOf(game.id) !== -1);
        setIsInLib(indLib.indexOf(game.id) !== -1);
    }, [game])

    return (
        <Container
            className='d-flex justify-content-center align-self-center'
        >
            <Card style={{width: 400}} className='p-5' key={game.id}>
                <Card.Header>{game.name}</Card.Header>
                <Card.Body>
                    <div>{game.developer} </div>
                    <div>{game.publisher} </div>
                    <div>{game.releasedate} </div>
                </Card.Body>
                <Card.Footer>
                    {isAuth ?
                        (isInLib ?
                                (<Button variant='success' disabled={loading}> В библиотеке </Button>)
                                :
                                !isInCart ? (<Button onClick={addToCart} disabled={loading}> Добавить в корзину </Button>)
                                    :
                                    (<Button variant='warning' onClick={delFromCart} disabled={loading}> Удалить из корзины </Button>)
                        )
                        : <div></div>
                    }
                </Card.Footer>
            </Card>
        </Container>
    );
});

export default gamePage;
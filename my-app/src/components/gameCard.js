import {Button, Card, Col, Row} from "react-bootstrap";
import React, {useContext, useState} from "react";
import AuthService, {CartService} from "./requests";
import {observer} from "mobx-react-lite";
import UserStore from "../Store/auth";
import {Context} from "../index";
import {useHistory} from "react-router";

const GameCard = observer (({game, genre, price, object}) => {

    const {user} = useContext(Context);
    const {cart} = useContext(Context);
    const {lib} = useContext(Context);

    const history = useHistory();

    const isAuth = UserStore.isAuth;
    let ind = [];
    cart.arr.map(elem => ind.push(elem.game_id));

    let indLib = [];
    lib.arr.map(elem => indLib.push(elem.game_id));

    let pk = 0;
    for(let i = 0; i < cart.arr.length; ++i)
        if(object.id === cart.arr[i].game_id)
            pk = cart.arr[i].pk;

    let pkLib = 0;
    for(let i = 0; i < lib.arr.length; ++i)
        if(object.id === lib.arr[i].game_id)
            pkLib = lib.arr[i].pk;

    const [isInCart, setIsInCart] = useState(ind.indexOf(object.id) !== -1);
    const [isInLib, setIsInLib] = useState(indLib.indexOf(object.id) !== -1);

    async function update() {
        if(!isInCart) {
            await CartService.addToCart(user.user, object.id);
            setIsInCart(!isInCart);
        }
        else{
            await CartService.delFromCart(pk);
            setIsInCart(!isInCart);
        }
    }

    return(
        <Col md={3} className='mt-2'>
            <Card>
                <Card.Body onClick={() => history.push('/games' + `/${object.id}`)}>
                    <div className="textStyle">
                        <Card.Title>{game}</Card.Title>
                    </div>
                    <div  className="textStyle">
                        <Card.Text>
                            <div>{genre}</div>
                            <div>{price + '$'}</div>
                        </Card.Text>
                    </div>
                </Card.Body>
                <Card.Footer>
                    {isAuth ?
                        (isInLib ?
                                (<Button variant='success'> В библиотеке </Button>)
                                :
                                !isInCart ? (<Button onClick={update}> Добавить в корзину </Button>)
                                    :
                                    (<Button variant='warning' onClick={update}> Удалить из корзины </Button>)
                        )
                        : <div></div>
                    }
                </Card.Footer>
            </Card>
        </Col>
    )
})

export {GameCard};

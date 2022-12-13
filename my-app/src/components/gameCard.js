import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import AuthService, {CartService} from "./requests";
import isAuth from '../Store/auth';
import Cart from '../Store/cartStore';
import {observer} from "mobx-react-lite";

const GameCard = observer (({game, genre, date, object}) => {

    const cart = Cart.mas;
    let ind = [];
    cart.forEach(elem => ind.push(elem.id));

    const auth = isAuth.status;
    const [isInCart, setIsInCart] = useState(ind.indexOf(object.id) !== -1);

    async function update() {
        await CartService.addToCart(6, object.id);
        setIsInCart(!isInCart);
    }

    for(let i = 0; i < cart.length; ++i){

    }

    return( <Card>
        <Card.Body>
            <div className="textStyle">
                <Card.Title>{game}</Card.Title>
            </div>
            <div  className="textStyle">
                <Card.Text>
                    {genre + ''}
                </Card.Text>
                <Card.Footer>
                    {date}
                </Card.Footer>
                {!isInCart ? <Button onClick={update}> Add to cart </Button>: <Button variant='warning' onClick={update}> Del from cart </Button>}
            </div>
        </Card.Body>
    </Card>
    )
})

export {GameCard};

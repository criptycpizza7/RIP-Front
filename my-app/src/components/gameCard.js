import {Button, Card} from "react-bootstrap";
import React, {useState} from "react";
import {store} from "../Store/store";
import {useSelector} from "react-redux";
import {createCart} from "../Store/actionCreators";

let isInCart = false;

const GameCard = ({game, genre, date, object}) => {

    const isAuth = useSelector(state => state.auth.status);
    //const cart = useSelector(state => state.cart.arr);
    const [upd, setUpd] = useState(false);

    function update() {
        console.log(isInCart);
        if(isInCart){
            console.log(1);
            let cart = store.getState().cart.arr;
            for(let i = 0; i < cart.length; ++i){
                if(cart[i].id === object.id)
                    cart.slice(i, 1);
            }
            isInCart = false;
            setUpd(false);
            store.dispatch(createCart(cart));
            console.log(11);
        }
        else{
            console.log(0);
            let cart = store.getState().cart.arr;
            console.log(10);
            cart.push(object);
            console.log(20);
            isInCart = true;
            setUpd(true);
            console.log(isInCart);
            store.dispatch(createCart(cart));
        }
    }

    const cart = useSelector(state => state.cart.arr);

    for(let i; i < cart.length; ++i){
        if(object.id === cart[i].id) {
            isInCart = true;
            setUpd(true);
        }
        setUpd(upd);
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
}

export {GameCard};

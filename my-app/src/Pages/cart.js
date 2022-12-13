import React from 'react';
import {Col} from "react-bootstrap";
import {useSelector} from "react-redux";
import {getCart} from "../components/requests";

function Cart(){

    const cart = getCart(6);

    async function makeCart(){

    }

    console.log(cart);

    return (
        <div>
            {!cart.length ? <h1 key = 'outh1'>Корзина пуста</h1>:
                <Col>
                {cart.map((elem) => {
                    return (
                        <h1>{elem}</h1>
                    )
                })}
                </Col>}
        </div>
    );
}

export default Cart;
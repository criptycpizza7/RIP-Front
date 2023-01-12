import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col} from "react-bootstrap";
import {CartService, LibService} from "../components/requests";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const CartCard = observer( ({name, cart_id, game_id, price}) => {

    const [loading, setLoading] = useState(false);
    const [cartS, setCart] = useState([]);

    const {cart} = useContext(Context);
    const {user} = useContext(Context);
    const {lib} = useContext(Context);

    async function deleteGame(){
        setLoading(true);
        await CartService.delFromCart(cart_id);
        cart.del(cart_id);
        setLoading(false);
    }

    async function addToLibrary(){
        setLoading(true);
        const today = new Date();
        const todayStr = today.getFullYear() + '-' + (today.getMonth()+1) + "-" + today.getDate();
        let obj = await LibService.addToLib(user.user, game_id);
        let mas = lib.mas;
        mas.push(obj);
        lib.make(mas);
        await deleteGame();
        setLoading(false);
    }

    return (
        <div>
            <Col>
                <div key={cart_id}>
                    <Card>
                        <Card.Body>
                            <div className="textStyle">
                                <Card.Title>{name}</Card.Title>
                            </div>
                            <div>
                                <Card.Text>{price}</Card.Text>
                            </div>
                            <div  className="textStyle">
                                <Button className='mt-1' onClick={deleteGame} disabled={loading}>Удалить</Button>
                                <Button className='mt-1' onClick={addToLibrary} disabled={loading}>Оплатить</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </div>
    );
})

export default CartCard;
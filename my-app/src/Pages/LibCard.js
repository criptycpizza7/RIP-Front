import React, {useContext, useState} from 'react';
import {Card, Col} from "react-bootstrap";

const LibCard = ({name, lib_id}) => {

    return (
        <div>
            <Col>
                <div key={lib_id}>
                    <Card>
                        <Card.Body>
                            <div className="textStyle">
                                <Card.Title>{name}</Card.Title>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </div>
    );
};

export default LibCard;
import {Button} from "react-bootstrap";
import React from "react";


const inputField = ({ value, setValue, onSubmit, loading, placeholder, buttonTitle = 'Поиск'}) => {
    return <div className="inputField">
        <input value={value} placeholder={placeholder} onChange={(event => setValue(event.target.value))}/>
        <Button disabled={loading} onClick={onSubmit}>{buttonTitle}</Button>
        <Button>Жанры</Button>
    </div>
 }

 export default inputField;

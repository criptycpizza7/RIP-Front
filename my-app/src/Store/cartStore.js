import {makeAutoObservable} from "mobx";

class Cart{
    mas = [];
    constructor() {
        makeAutoObservable(this)
    }

    add(game){
        this.mas.push(game);
    }

    del(id){
        this.mas = this.mas.filter(game => game.id !== id);
    }
}

export default new Cart();
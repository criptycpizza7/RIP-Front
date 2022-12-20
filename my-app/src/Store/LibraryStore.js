import {makeAutoObservable} from "mobx";

class LibraryStore{

    constructor() {
        this.mas = [];
        makeAutoObservable(this);
    }

    make(lib){
        this.mas = lib;
    }

    add(game){
        this.mas.push(game);
    }

    del(id){
        this.mas = this.mas.filter(lib => lib.pk !== id);
    }

    get arr(){
        return this.mas;
    }
}

export default new LibraryStore();
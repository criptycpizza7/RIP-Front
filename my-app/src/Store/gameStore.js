import {makeAutoObservable} from "mobx";

class gameStore{

    constructor(){
        this._genres = [];
        this._developers = [];
        this._publishers = [];
        this._games = [];
        makeAutoObservable(this);
    }

    setGenres(genres){
        this._genres = genres;
    }

    setDevelopers(developers){
        this._genres = developers;
    }

    setPublishers(publishers){
        this._genres = publishers;
    }

    setGames(games){
        this._genres = games;
    }

    get genres(){
        return this._genres;
    }

    get developers(){
        return this._developers;
    }

    get publishers(){
        return this._publishers;
    }

    get games(){
        return this._games;
    }
}

export default new gameStore();
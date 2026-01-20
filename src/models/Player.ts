import { IPlayer } from "../interfaces/IPlayer";
import { IPokemon } from "../interfaces/IPokemon";
import { Pokemon } from "./Pokemon";


export class Player implements IPlayer {
    name: string;
    pokemons: Pokemon[];

    constructor(name: string, pokemons: Pokemon[]) {
        this.name = name;
        this.pokemons = pokemons;
    }
}
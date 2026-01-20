import { PokemonType } from "../enums/PokemonType";
import { IAttributes } from "./IAttributes";

export interface IPokemon {
    name: string;
    type: PokemonType;
    baseAtributtes: IAttributes;
    currentAtributtes: IAttributes;

}
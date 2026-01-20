// Vai ter energia força e defesa
import { PokemonType } from "../enums/PokemonType";
import { IAttributes } from "../interfaces/IAttributes";
import { IPokemon } from "../interfaces/IPokemon";




export class Pokemon implements IPokemon {
    constructor(
        public name: string,
        public type: PokemonType,
        public baseAtributtes: IAttributes,
        public currentAtributtes: IAttributes
    ) {
        this.name = name;
        this.type = type;
        this.baseAtributtes = baseAtributtes;
        // se current não for passado, copia base
        this.currentAtributtes = currentAtributtes ?? { ...baseAtributtes };
    }

    static fromJSON(obj: any): Pokemon {
        return new Pokemon(
            obj.name,
            obj.type,
            obj.baseAtributtes,
            obj.currentAtributtes
        );
    }
}
import { PokemonType } from "../enums/PokemonType";
import { IAttributes } from "../interfaces/IAttributes";
import { IPokemon } from "../interfaces/IPokemon";
export declare class Pokemon implements IPokemon {
    name: string;
    type: PokemonType;
    baseAtributtes: IAttributes;
    currentAtributtes: IAttributes;
    constructor(name: string, type: PokemonType, baseAtributtes: IAttributes, currentAtributtes: IAttributes);
    static fromJSON(obj: any): Pokemon;
}
//# sourceMappingURL=Pokemon.d.ts.map
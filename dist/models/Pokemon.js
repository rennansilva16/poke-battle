"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pokemon = void 0;
class Pokemon {
    name;
    type;
    baseAtributtes;
    currentAtributtes;
    constructor(name, type, baseAtributtes, currentAtributtes) {
        this.name = name;
        this.type = type;
        this.baseAtributtes = baseAtributtes;
        this.currentAtributtes = currentAtributtes;
        this.name = name;
        this.type = type;
        this.baseAtributtes = baseAtributtes;
        // se current não for passado, copia base
        this.currentAtributtes = currentAtributtes ?? { ...baseAtributtes };
    }
    static fromJSON(obj) {
        return new Pokemon(obj.name, obj.type, obj.baseAtributtes, obj.currentAtributtes);
    }
}
exports.Pokemon = Pokemon;
//# sourceMappingURL=Pokemon.js.map
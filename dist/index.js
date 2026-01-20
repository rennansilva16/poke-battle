"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainMenu_1 = require("./main.ts/MainMenu");
const Pokemon_1 = require("./models/Pokemon");
const PokemonType_1 = require("./enums/PokemonType");
const StorageService_1 = require("./Services/StorageService");
const mainMenu = new MainMenu_1.MainMenu();
// Inicializa Pokémons base apenas se ainda não existirem
function inicializarPokemons() {
    const pokemonsPadrao = [
        new Pokemon_1.Pokemon("Bulbasaur", PokemonType_1.PokemonType.Planta, { strength: 5, defense: 4, energy: 6 }, { strength: 0, defense: 0, energy: 0 }),
        new Pokemon_1.Pokemon("Charmander", PokemonType_1.PokemonType.Fogo, { strength: 6, defense: 3, energy: 5 }, { strength: 0, defense: 0, energy: 0 }),
        new Pokemon_1.Pokemon("Squirtle", PokemonType_1.PokemonType.Agua, { strength: 4, defense: 5, energy: 6 }, { strength: 0, defense: 0, energy: 0 }),
    ];
    for (const pkm of pokemonsPadrao) {
        const existente = StorageService_1.StorageService.loadItem(pkm.name.toLowerCase(), Pokemon_1.Pokemon);
        if (!existente) {
            StorageService_1.StorageService.save(pkm.name.toLowerCase(), pkm, Pokemon_1.Pokemon);
        }
    }
}
inicializarPokemons();
mainMenu.show();
//# sourceMappingURL=index.js.map
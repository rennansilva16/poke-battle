import { MainMenu } from "./main.ts/MainMenu";
import { Pokemon } from "./models/Pokemon";
import { PokemonType } from "./enums/PokemonType";
import { StorageService } from "./Services/StorageService";
const mainMenu = new MainMenu();

// Inicializa Pokémons base apenas se ainda não existirem
function inicializarPokemons() {
  const pokemonsPadrao = [
    new Pokemon("Bulbasaur", PokemonType.Planta, { strength: 5, defense: 4, energy: 6 }, { strength: 0, defense: 0, energy: 0 }),
    new Pokemon("Charmander", PokemonType.Fogo, { strength: 6, defense: 3, energy: 5 }, { strength: 0, defense: 0, energy: 0 }),
    new Pokemon("Squirtle", PokemonType.Agua, { strength: 4, defense: 5, energy: 6 }, { strength: 0, defense: 0, energy: 0 }),
  ];

  for (const pkm of pokemonsPadrao) {
    const existente = StorageService.loadItem<Pokemon>(pkm.name.toLowerCase(), Pokemon);
    if (!existente) {
      StorageService.save<Pokemon>(pkm.name.toLowerCase(), pkm, Pokemon);
    }
  }
}

inicializarPokemons();


mainMenu.show();
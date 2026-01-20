"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuPokemon = void 0;
const readline = require("readline");
const Pokemon_1 = require("../models/Pokemon");
const StorageService_1 = require("../Services/StorageService");
const MainMenu_1 = require("../main.ts/MainMenu");
// Função auxiliar para ler entrada do usuário como Promise
function askQuestion(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.trim());
        });
    });
}
class MenuPokemon {
    static async escolherPokemonInicial(jogador) {
        console.clear();
        console.log("=== Escolha seu Pokémon Inicial ===");
        // Carrega os Pokémons disponíveis do storage
        const pokemonsDisponiveis = StorageService_1.StorageService.loadAll(Pokemon_1.Pokemon);
        if (pokemonsDisponiveis.length === 0) {
            console.log("⚠️ Nenhum Pokémon disponível para escolha.");
            return;
        }
        // Exibe a lista dos Pokémons disponíveis
        pokemonsDisponiveis.forEach((pokemon, index) => {
            console.log(`${index + 1}. ${pokemon.name} (${pokemon.type})`);
        });
        console.log("==============================");
        const escolha = await askQuestion("Escolha um Pokémon (número): ");
        const indice = parseInt(escolha.trim()) - 1;
        if (isNaN(indice) || indice < 0 || indice >= pokemonsDisponiveis.length) {
            console.log("❌ Opção inválida. Tente novamente.");
            return this.escolherPokemonInicial(jogador);
        }
        const pokemonEscolhido = pokemonsDisponiveis[indice];
        if (!pokemonEscolhido) {
            console.log("❌ Erro: Pokémon não encontrado.");
            return;
        }
        StorageService_1.StorageService.AdicionarPokemonAoJogador(jogador, pokemonEscolhido);
        console.log(`🎉 Parabéns! Você escolheu ${pokemonEscolhido.name} como seu Pokémon inicial!`);
        MainMenu_1.MainMenu.voltarAoMenuPrincipal();
    }
}
exports.MenuPokemon = MenuPokemon;
//# sourceMappingURL=MenuPokemon.js.map
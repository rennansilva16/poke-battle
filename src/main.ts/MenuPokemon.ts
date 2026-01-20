import * as readline from 'readline';
import { Player } from "../models/Player";
import { Pokemon } from "../models/Pokemon";
import { StorageService } from "../Services/StorageService";
import { MainMenu } from "../main.ts/MainMenu";

// Função auxiliar para ler entrada do usuário como Promise
function askQuestion(question: string): Promise<string> {
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

export class MenuPokemon {
  static async escolherPokemonInicial(jogador: Player): Promise<void> {
    console.clear();
    console.log("=== Escolha seu Pokémon Inicial ===");

    // Carrega os Pokémons disponíveis do storage
    const pokemonsDisponiveis = StorageService.loadAll<Pokemon>(Pokemon);

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

    StorageService.AdicionarPokemonAoJogador(jogador, pokemonEscolhido);

    console.log(`🎉 Parabéns! Você escolheu ${pokemonEscolhido.name} como seu Pokémon inicial!`);

    MainMenu.voltarAoMenuPrincipal();
  }
}

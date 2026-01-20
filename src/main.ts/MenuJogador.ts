import * as readline from 'readline';
import { StorageService } from '../Services/StorageService';
import { Player } from '../models/Player';
import { MenuPokemon } from './MenuPokemon';
import { MainMenu } from '../main.ts/MainMenu';

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

export class MenuJogador {

  // 1️⃣ Criar um novo jogador
  static async criarJogador(): Promise<void> {
    console.clear();
    console.log("=== Criar um novo jogador ===");

    const nome = await askQuestion("Digite o nome do jogador: ");

    // Verifica se o jogador já existe
    const existente = StorageService.loadItem<Player>(nome, Player);
    if (existente) {
      console.log(`⚠️ O jogador '${nome}' já existe!`);
      return;
    }

    // Por enquanto ele começa sem pokémons (vamos adicionar depois)
    const novoJogador = new Player(nome, []); 

    StorageService.save<Player>(nome, novoJogador, Player);
    console.log(`✅ Jogador '${nome}' criado e salvo com sucesso!`);

    // Chama o menu de escolha do Pokémon inicial
    console.log("\nAgora escolha o seu Pokémon inicial!");
    await MenuPokemon.escolherPokemonInicial(novoJogador);
  }

  // 2️⃣ Exibir um jogador salvo
  static async exibirJogador(): Promise<void> {
    console.clear();
    console.log("=== Exibir jogador salvo ===");

    const nome = await askQuestion("Digite o nome do jogador: ");
    const jogador = StorageService.loadItem<Player>(nome, Player);

    if (!jogador) {
      console.log(`❌ Jogador '${nome}' não encontrado.`);
      return;
    }

    console.log(`\nJogador: ${jogador.name}`);
    console.log(`Pokémons: ${jogador.pokemons.length > 0 ? jogador.pokemons.map(p => p.name).join(', ') : 'Nenhum'}`);

    MainMenu.voltarAoMenuPrincipal();
  }

  // 3️⃣ Exibir todos os jogadores salvos
  static listarJogadores(): void {
    console.clear();
    console.log("=== Lista de jogadores salvos ===");

    const jogadores = StorageService.loadAll<Player>(Player);

    if (jogadores.length === 0) {
      console.log("Nenhum jogador encontrado.");
      return;
    }

    jogadores.forEach((j, index) => {
      console.log(`${index + 1}. ${j.name} (${j.pokemons.length} pokémons)`);
    });

    MainMenu.voltarAoMenuPrincipal();
  }

}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuJogador = void 0;
const readline = require("readline");
const StorageService_1 = require("../Services/StorageService");
const Player_1 = require("../models/Player");
const MenuPokemon_1 = require("./MenuPokemon");
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
class MenuJogador {
    // 1️⃣ Criar um novo jogador
    static async criarJogador() {
        console.clear();
        console.log("=== Criar um novo jogador ===");
        const nome = await askQuestion("Digite o nome do jogador: ");
        // Verifica se o jogador já existe
        const existente = StorageService_1.StorageService.loadItem(nome, Player_1.Player);
        if (existente) {
            console.log(`⚠️ O jogador '${nome}' já existe!`);
            return;
        }
        // Por enquanto ele começa sem pokémons (vamos adicionar depois)
        const novoJogador = new Player_1.Player(nome, []);
        StorageService_1.StorageService.save(nome, novoJogador, Player_1.Player);
        console.log(`✅ Jogador '${nome}' criado e salvo com sucesso!`);
        // Chama o menu de escolha do Pokémon inicial
        console.log("\nAgora escolha o seu Pokémon inicial!");
        await MenuPokemon_1.MenuPokemon.escolherPokemonInicial(novoJogador);
    }
    // 2️⃣ Exibir um jogador salvo
    static async exibirJogador() {
        console.clear();
        console.log("=== Exibir jogador salvo ===");
        const nome = await askQuestion("Digite o nome do jogador: ");
        const jogador = StorageService_1.StorageService.loadItem(nome, Player_1.Player);
        if (!jogador) {
            console.log(`❌ Jogador '${nome}' não encontrado.`);
            return;
        }
        console.log(`\nJogador: ${jogador.name}`);
        console.log(`Pokémons: ${jogador.pokemons.length > 0 ? jogador.pokemons.map(p => p.name).join(', ') : 'Nenhum'}`);
        MainMenu_1.MainMenu.voltarAoMenuPrincipal();
    }
    // 3️⃣ Exibir todos os jogadores salvos
    static listarJogadores() {
        console.clear();
        console.log("=== Lista de jogadores salvos ===");
        const jogadores = StorageService_1.StorageService.loadAll(Player_1.Player);
        if (jogadores.length === 0) {
            console.log("Nenhum jogador encontrado.");
            return;
        }
        jogadores.forEach((j, index) => {
            console.log(`${index + 1}. ${j.name} (${j.pokemons.length} pokémons)`);
        });
        MainMenu_1.MainMenu.voltarAoMenuPrincipal();
    }
}
exports.MenuJogador = MenuJogador;
//# sourceMappingURL=MenuJogador.js.map
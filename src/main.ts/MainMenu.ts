import * as readline from 'readline';
import { MenuJogador } from './MenuJogador';

export class MainMenu {

    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    show(): void {
        console.clear();
        console.log("==============================");
        console.log(" Welcome to the Pokémon Game!");
        console.log("==============================");
        console.log("1. Batalhar");
        console.log("2. Criar um novo jogador");
        console.log("3. Exibir um jogador salvo");
        console.log("4. Exibir todos os jogadores salvos");
        console.log("5. Sair");
        console.log("==============================");

        this.rl.question("Selecione uma opção:", (answer) => {
            this.handleOption(parseInt(answer));
        })
    }

    private handleOption(answer: number): void {
        switch (answer) {
            case 1:
                console.log("Carregando batalha...");
                break;
            case 2:
                MenuJogador.criarJogador();
                break;
            case 3:
                MenuJogador.exibirJogador();
                break;
            case 4:
                MenuJogador.listarJogadores();
                break;
            case 5:
                console.log("Saindo do jogo. Até logo!");
                this.rl.close();
                process.exit(0);
            default:
                console.log("Opção inválida. Tente novamente.");
                this.show();
                break;
        }
    }

    static voltarAoMenuPrincipal(): void {
        console.log("\nPressione qualquer tecla para voltar ao menu principal...");

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("", () => {
            rl.close();
            const menu = new MainMenu();
            menu.show();
        });
    }
}
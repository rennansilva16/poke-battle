import { Player } from '../models/Player';
import { Pokemon } from '../models/Pokemon';
export declare class StorageService<T> {
    private static basePath;
    static save<T>(key: string, data: T, type: {
        new (...args: any[]): T;
    }): void;
    static loadItem<T>(fileName: string, type: {
        new (...args: any[]): T;
    }): T | null;
    static loadAll<T>(type: {
        new (...args: any[]): T;
    }): T[];
    static AdicionarPokemonAoJogador(jogador: Player, pokemon: Pokemon): void;
    private static getFolder;
}
//# sourceMappingURL=StorageService.d.ts.map
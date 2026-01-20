"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const fs = require("fs");
const path = require("path");
const Player_1 = require("../models/Player");
class StorageService {
    static basePath = path.join(__dirname, '../../data');
    static save(key, data, type) {
        const folder = this.getFolder(type);
        const filePath = path.join(folder, `${key}.json`);
        // Cria a subpasta se ela não existir
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
            console.log(`A pasta ${folder} foi criada.`);
        }
        // Evita sobrescrever arquivos existentes
        if (fs.existsSync(filePath)) {
            console.log(`Aviso: O arquivo ${filePath} já existe.`);
            return;
        }
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`O arquivo ${filePath} foi salvo com sucesso!`);
    }
    static loadItem(fileName, type) {
        const folder = this.getFolder(type);
        const filePath = path.join(folder, `${fileName}.json`);
        if (!fs.existsSync(filePath)) {
            console.log(`Aviso: O arquivo ${fileName} não foi encontrado em ${folder}.`);
            return null;
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);
        // Restaura o objeto com base na estrutura da classe
        const item = Object.assign(Object.create(type.prototype), data);
        console.log(`O item ${fileName} foi carregado com sucesso!`);
        return item;
    }
    static loadAll(type) {
        const folder = this.getFolder(type);
        // Se a pasta do tipo não existir, retorna lista vazia
        if (!fs.existsSync(folder)) {
            console.log(`Nenhum dado encontrado para ${type.name}.`);
            return [];
        }
        const files = fs.readdirSync(folder);
        const datas = [];
        files.forEach(file => {
            if (file.endsWith(".json")) {
                const content = fs.readFileSync(path.join(folder, file), 'utf-8');
                const data = JSON.parse(content);
                const item = Object.assign(Object.create(type.prototype), data);
                datas.push(item);
            }
        });
        console.log(`${datas.length} arquivos do tipo ${type.name} carregados com sucesso!`);
        return datas;
    }
    static AdicionarPokemonAoJogador(jogador, pokemon) {
        const folder = this.getFolder(Player_1.Player);
        const filePath = path.join(folder, `${jogador.name}.json`);
        if (!fs.existsSync(filePath)) {
            console.log(`Aviso: O arquivo do jogador ${jogador.name} não foi encontrado.`);
            return;
        }
        jogador.pokemons.push(pokemon);
        fs.writeFileSync(filePath, JSON.stringify(jogador, null, 2), 'utf-8');
        console.log(`O Pokémon foi adicionado ao jogador ${jogador.name} com sucesso!`);
    }
    static getFolder(type) {
        const folderName = type.name.toLowerCase() + "s"; // Ex: Player -> "players"
        return path.join(this.basePath, folderName);
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=StorageService.js.map
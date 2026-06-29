import fs from "node:fs/promises";
import path from "node:path";
import { IPlayer } from "../model/player-model";
import process from "node:process";

const databasePath = path.resolve(__dirname, "../data/champions.json");

export const playersRepository = {
  // LER TODOS OS JOGADORES DO ARQUIVO
  async findAll(): Promise<IPlayer[]> {
    const data = await fs.readFile(databasePath, "utf-8");
    return JSON.parse(data);
  },

  // SALVAR A LISTA ATUALIZADA NO ARQUIVO
  async writeAll(players: IPlayer[]): Promise<void> {
    await fs.writeFile(databasePath, JSON.stringify(players, null, 2), "utf-8");
  }
};
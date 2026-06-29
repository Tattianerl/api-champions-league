import { playersRepository } from "../repositories/players-repository";
import { IPlayer } from "../model/player-model";

export const playersService = {
  // 1. LISTAR TODOS
  async getAllPlayers(): Promise<IPlayer[]> {
    return await playersRepository.findAll();
  },

  // 2. BUSCAR POR ID
  async getPlayerById(id: number): Promise<IPlayer | undefined> {
    const players = await playersRepository.findAll();
    return players.find((player: { id: number; }) => player.id === id);
  },

  // 3. CADASTRAR NOVO JOGADOR
  async createPlayer(playerData: Omit<IPlayer, "id">): Promise<IPlayer> {
    const players = await playersRepository.findAll();
    
    // Gerador de ID incremental simples baseado no maior ID existente
    const nextId = players.length > 0 ? Math.max(...players.map((p: { id: any; }) => p.id)) + 1 : 1;
    
    const newPlayer: IPlayer = {
      id: nextId,
      ...playerData
    };

    players.push(newPlayer);
    await playersRepository.writeAll(players);
    return newPlayer;
  },

  // 4. ATUALIZAR JOGADOR
  async updatePlayer(id: number, playerData: Partial<Omit<IPlayer, "id">>): Promise<IPlayer | undefined> {
    const players = await playersRepository.findAll();
    const playerIndex = players.findIndex((player: { id: number; }) => player.id === id);

    if (playerIndex === -1) return undefined;

    // Mescla os dados antigos com as novas alterações que vieram na requisição
    players[playerIndex] = {
      ...players[playerIndex],
      ...playerData,
      stats: {
        ...players[playerIndex].stats,
        ...(playerData.stats || {})
      }
    };

    await playersRepository.writeAll(players);
    return players[playerIndex];
  },

  // 5. DELETAR JOGADOR
  async deletePlayer(id: number): Promise<boolean> {
    const players = await playersRepository.findAll();
    const playerIndex = players.findIndex((player: { id: number; }) => player.id === id);

    if (playerIndex === -1) return false;

    const updatedPlayers = players.filter((player: { id: number; }) => player.id !== id);
    await playersRepository.writeAll(updatedPlayers);
    return true;
  }
};
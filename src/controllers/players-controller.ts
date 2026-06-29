import { Request, Response } from "express";
import { playersService } from "../services/players-service";

export const playersController = {
  // 1. LISTAR TODOS
  async listAll(req: Request, res: Response) {
    try {
      const players = await playersService.getAllPlayers();
      return res.status(200).json(players);
    } catch (error) {
      return res.status(500).json({ error: "Erro interno ao buscar jogadores." });
    }
  },

  // 2. BUSCAR POR ID
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const player = await playersService.getPlayerById(id);

      if (!player) {
        return res.status(404).json({ error: "Jogador não encontrado no campeonato." });
      }

      return res.status(200).json(player);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar os detalhes do jogador." });
    }
  },

  // 3. CADASTRAR JOGADOR
  async create(req: Request, res: Response) {
    try {
      const newPlayer = await playersService.createPlayer(req.body);
      return res.status(201).json(newPlayer);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao registrar novo craque." });
    }
  },

  // 4. ATUALIZAR JOGADOR
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const updatedPlayer = await playersService.updatePlayer(id, req.body);

      if (!updatedPlayer) {
        return res.status(404).json({ error: "Jogador não encontrado para atualização." });
      }

      return res.status(200).json(updatedPlayer);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar estatísticas do jogador." });
    }
  },

  // 5. DELETAR JOGADOR
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const success = await playersService.deletePlayer(id);

      if (!success) {
        return res.status(404).json({ error: "Jogador não encontrado para remoção." });
      }

      return res.status(200).json({ mensagem: "Jogador removido com sucesso da competição." });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao remover o jogador." });
    }
  }
};
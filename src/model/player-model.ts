export interface IPlayerStats {
    gols: number;
    assistencias: number;
    partidas: number;
}

export interface IPlayer{
    id: number;
    name: string;
    club: string;
    nationality: string;
    position: string;
    stats: IPlayerStats;
}

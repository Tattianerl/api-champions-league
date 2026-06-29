# ⚽ ChampionsLeague API - CRUD de Elite com Express & TypeScript

A **ChampionsLeague API** é um backend completo desenvolvido com o ecossistema do **Express** e **TypeScript**, simulando um painel de controle estatístico da Champions League adaptado para o ritmo intenso de uma Copa do Mundo.
Ele demonstra o domínio do desenvolvimento de uma API RESTful com suporte a operações completas de persistência de dados local (I/O assíncrono), arquitetura de software dividida em responsabilidades e separação estrutural entre a inicialização (`server.ts`) e as configurações da aplicação (`app.ts`).

---

## 📐 Fluxo Arquitetural (Separação de Responsabilidades)

O projeto implementa uma arquitetura desacoplada baseada no tráfego de dados controlado por contratos (Interfaces TypeScript):

```text
[ Cliente / Thunder Client ] ◄──► [ Rotas (src/routes.ts) ]
                                    │
                                    ▼
                       [ Controllers (src/controllers/) ]
                                    │
                                    ▼
                        [ Services (src/services/) ]
                                    │
                                    ▼
                     [ Repositories (src/repositories/) ]
                                    │
                                    ▼
                       [ Data (src/data/champions.json) ]
                   

```
 - Models: Define as regras de tipagem estrita do modelo de dados (``IPlayer``).

- Repositories: Camada isolada que se comunica diretamente com o arquivo JSON usando ``fs/promises``.

- Services: Centraliza as regras de negócio, como validações e incremento automático de chaves primitivas (IDs).

- Controllers: Intercepta as requisições HTTP do Express, extrai dados (``body``, ``params``) e devolve os códigos de status adequados (``201``, ``200``, ``404``, ``500``).

### 🛠️ Stack Tecnológica
- Express: O framework web mais robusto e utilizado no ecossistema Node.js.

- TypeScript: Tipagem estática para evitar bugs em produção e garantir contratos de dados sólidos.

- tsx: Executor TypeScript dinâmico com suporte nativo a flags de ambiente (``--env-file``).

- tsup: Bundler ultra-rápido para geração de builds de produção otimizados.

- CORS: Segurança configurada para permitir acessos de aplicações externas.

## 📂 Organização dos Diretórios
```
Plaintext
src/
├── app.ts                 # Configurações do Express e Middlewares
├── server.ts             
├── routes.ts              # Centralização de verbos HTTP e endpoints
├── controllers/           # Manipuladores de requisições e respostas HTTP
│   └── players-controller.ts
├── services/              # Validações lógicas e regras de negócio do torneio
│   └── players-service.ts
├── repositories/          # Leitura e escrita assíncrona no banco físico
│   └── players-repository.ts
├── models/                # Interfaces TypeScript de dados
│   └── player-model.ts
└── data/
    └── champions.json     # Catálogo persistido de atletas
 ```   

## 📻 Guia de Endpoints 
A API gerencia o elenco na porta configurada no seu ``.env``. Os endpoints aceitam e respondem objetos em formato JSON:

## 📑 1. Listar Elenco Completo
- Rota: ``GET /api/players``

- Descrição: Retorna todos os craques escalados no campeonato.

## 🔍 2. Detalhes do Jogador por ID
- Rota: ``GET /api/players/:id``

- Descrição: Retorna dados de um único jogador. Retorna 404 se o ID não existir.

## ⚽ 3. Convocar Novo Jogador
- Rota:` POST /api/players`

- Corpo da Requisição (JSON):

```
JSON
{
  "name": "Rodrygo",
  "club": "Real Madrid",
  "nationality": "Brasil",
  "position": "Atacante",
  "stats": { "gols": 3, "assistencias": 2, "partidas": 8 }
}
```

## ⚙️ 4. Atualizar Estatísticas (Gols / Assistências)
- Rota:`` PUT /api/players/:id``

- Corpo Parcial (JSON):
```
JSON
{
  "stats": { "gols": 12, "assistencias": 4, "partidas": 11 }
}
```

## ❌ 5. Eliminar Jogador da Competição
- Rota:`` DELETE /api/players/:id``

- Descrição: Remove permanentemente o registro correspondente do arquivo de dados.


### Criado com persistência, foco e TypeScript por ``Tatiane Lima``.                      

export const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Universo', href: '#universo' },
  { label: 'Personagens', href: '#personagens' },
  { label: 'Conta', href: '#conta' },
  { label: 'Atualizacoes', href: '#atualizacoes' },
  { label: 'Loja', href: '#loja' },
];

export const highlights = [
  {
    value: 'Tower defense',
    label: 'Defesa de nucleo com torres e NPCs recrutaveis.',
  },
  {
    value: 'Dungeon crawler',
    label: 'Quanto mais profundo, melhores recursos e unidades.',
  },
  {
    value: 'Mascara',
    label: 'Habilidades especiais que mudam a estrategia do jogador.',
  },
];

export const lore = [
  {
    title: 'O nucleo da dungeon',
    text:
      'Cada partida comeca com uma dungeon propria e um nucleo infernal. O objetivo do mestre e proteger esse nucleo, expandir salas, instalar torres e recrutar NPCs para conter invasores.',
  },
  {
    title: 'Profundidade e saque',
    text:
      'A progressao acontece em camadas. Salas mais profundas guardam recursos raros, unidades valiosas e materiais usados para melhorar defesas e preparar ataques contra outras dungeons.',
  },
  {
    title: 'Invasoes',
    text:
      'No estado atual do projeto, as invasoes miram mestres de dungeon controlados por NPC. O modo multiplayer e uma possibilidade futura para transformar esses ataques em disputas entre jogadores.',
  },
];

export const units = [
  {
    name: 'Mestre da Dungeon',
    role: 'Jogador',
    type: 'Controle',
    description:
      'Comanda o nucleo, escolhe onde gastar recursos e decide quando invadir outras dungeons.',
    stats: ['Construcao', 'Saque', 'Defesa'],
  },
  {
    name: 'Sentinela de Cinzas',
    role: 'NPC defensivo',
    type: 'Tanque',
    description:
      'Guarda corredores estreitos e segura os inimigos enquanto as torres carregam disparos pesados.',
    stats: ['Vida alta', 'Provocacao', 'Baixa mobilidade'],
  },
  {
    name: 'Arcanista do Fosso',
    role: 'NPC de suporte',
    type: 'Magia',
    description:
      'Amplifica torres proximas e aplica efeitos de lentidao em unidades que avancam pelo mapa.',
    stats: ['Controle', 'Suporte', 'Recarga media'],
  },
  {
    name: 'Ladrao de Reliquias',
    role: 'Invasor NPC',
    type: 'Agilidade',
    description:
      'Aparece em invasoes inimigas para roubar recursos caso encontre uma rota ate o nucleo.',
    stats: ['Velocidade', 'Saque', 'Pouca vida'],
  },
];

export const updates = [
  {
    category: 'Devlog',
    date: '2026-07-01',
    title: 'Primeira versao da wiki em React',
    text: 'Estrutura inicial com paginas/secoes inspiradas em site oficial, dados de personagens, mascaras e loja conceitual.',
  },
  {
    category: 'Sistema',
    date: '2026-07-01',
    title: 'Fluxo de login e registro',
    text: 'Cadastro, login, consulta, edicao e exclusao de conta local usando armazenamento do navegador.',
  },
  {
    category: 'Gameplay',
    date: 'Planejado',
    title: 'Modo multiplayer em estudo',
    text: 'O jogo permanece single-player, mas o design reserva espaco para invasoes entre jogadores futuramente.',
  },
];

export const storeItems = [
  {
    name: 'Artbook digital',
    price: 'Conceito',
    description: 'Compilado futuro com artes, historia da dungeon e estudo visual das mascaras.',
  },
  {
    name: 'Pacote fundador',
    price: 'Planejado',
    description: 'Item promocional para interessados no jogo quando a pagina comercial for aberta.',
  },
  {
    name: 'Trilha sonora',
    price: 'Planejado',
    description: 'Album tematico com musicas de exploracao, invasao e defesa do nucleo.',
  },
];

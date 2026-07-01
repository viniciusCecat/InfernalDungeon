export const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Universo', href: '#universo' },
  { label: 'Personagens', href: '#personagens' },
  { label: 'Torres', href: '#torres' },
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
    name: 'Mercador de Ossos',
    role: 'NPC comerciante',
    type: 'Economia',
    description:
      'Aparece em saloes seguros da dungeon para trocar reliquias, vender contratos de NPCs e comprar fragmentos amaldicoados.',
    stats: ['Troca', 'Contratos', 'Itens raros'],
  },
  {
    name: 'Ferreiro Sem Face',
    role: 'NPC comerciante',
    type: 'Melhoria',
    description:
      'Forja reforcos para torres e grava runas em mascaras usando metais retirados das camadas inferiores.',
    stats: ['Upgrade', 'Runas', 'Custo alto'],
  },
  {
    name: 'Cultista do Nucleo Vazio',
    role: 'Inimigo NPC',
    type: 'Ritual',
    description:
      'Tenta corromper salas defendidas e enfraquecer o nucleo se permanecer vivo por tempo suficiente.',
    stats: ['Debuff', 'Vida media', 'Perigoso em grupo'],
  },
  {
    name: 'Cavaleiro Carnical',
    role: 'Inimigo NPC',
    type: 'Brutamontes',
    description:
      'Unidade pesada que avanca lentamente, resiste a dano fisico e abre caminho para inimigos menores.',
    stats: ['Armadura', 'Dano alto', 'Lento'],
  },
  {
    name: 'Aranha de Cripta',
    role: 'Inimigo NPC',
    type: 'Emboscada',
    description:
      'Movimenta-se por passagens rachadas e ignora parte das barricadas, obrigando o jogador a proteger rotas secundarias.',
    stats: ['Mobilidade', 'Veneno', 'Pouca vida'],
  },
  {
    name: 'Ladrao de Reliquias',
    role: 'Invasor NPC',
    type: 'Agilidade',
    description:
      'Aparece em invasoes inimigas para roubar recursos caso encontre uma rota ate o nucleo.',
    stats: ['Velocidade', 'Saque', 'Pouca vida'],
  },
  {
    name: 'Arauto da Dungeon Rival',
    role: 'Invasor NPC',
    type: 'Comando',
    description:
      'Lidera pequenas invasoes de mestres NPC e fortalece inimigos proximos quando entra em uma sala importante.',
    stats: ['Aura', 'Moral', 'Prioridade alta'],
  },
];

export const towers = [
  {
    name: 'Olho Abissal',
    role: 'Controle',
    damage: 'Baixo',
    range: 'Longo',
    cooldown: 'Rapida',
    description:
      'Dispara um raio arcano que marca inimigos e revela invasores escondidos antes que cheguem ao nucleo.',
  },
  {
    name: 'Balista de Ossos',
    role: 'Dano fisico',
    damage: 'Alto',
    range: 'Medio',
    cooldown: 'Lenta',
    description:
      'Perfura alvos resistentes e e ideal contra cavaleiros carnicais e criaturas de armadura pesada.',
  },
  {
    name: 'Caldeirao Pestilento',
    role: 'Area',
    damage: 'Medio',
    range: 'Curto',
    cooldown: 'Media',
    description:
      'Derrama veneno em corredores estreitos, causando dano continuo em hordas que tentam invadir a dungeon.',
  },
  {
    name: 'Obelisco da Mascara',
    role: 'Suporte',
    damage: 'Nenhum',
    range: 'Aura',
    cooldown: 'Passiva',
    description:
      'Amplifica habilidades de mascara do jogador e reduz a recarga de torres instaladas na mesma sala.',
  },
  {
    name: 'Carrilhao Funebre',
    role: 'Medo',
    damage: 'Baixo',
    range: 'Medio',
    cooldown: 'Media',
    description:
      'Emite ondas sonoras que atrasam inimigos e interrompem rituais de cultistas proximos.',
  },
  {
    name: 'Portao de Espinhos',
    role: 'Bloqueio',
    damage: 'Medio',
    range: 'Corredor',
    cooldown: 'Passiva',
    description:
      'Funciona como barreira viva, prende invasores e compra tempo para NPCs defensivos chegarem ao combate.',
  },
];

export const updates = [
  {
    category: 'Devlog',
    date: '2026-07-01',
    title: 'Wiki expandida com dark fantasy',
    text: 'Catalogo atualizado com comerciantes, inimigos, invasores, torres e uma loja ficticia propria do universo.',
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
    name: 'Tomo do Nucleo Infernal',
    price: 'R$ 39,90',
    description:
      'Livro ficticio com lendas das camadas profundas, mapas rabiscados e anotacoes de antigos mestres de dungeon.',
  },
  {
    name: 'Miniatura Olho Abissal',
    price: 'R$ 79,90',
    description:
      'Colecionavel conceitual da torre de vigilancia arcana, com base de pedra e runas turquesa.',
  },
  {
    name: 'Mascara do Mestre Sem Face',
    price: 'R$ 64,90',
    description:
      'Replica decorativa ficticia inspirada nas mascaras de poder usadas pelos mestres da dungeon.',
  },
  {
    name: 'Moedas de Reliquia',
    price: 'R$ 24,90',
    description:
      'Conjunto imaginario de moedas antigas usadas pelo Mercador de Ossos em trocas nas salas seguras.',
  },
  {
    name: 'Mapa das Catacumbas',
    price: 'R$ 29,90',
    description:
      'Poster ficticio com rotas de invasao, saloes amaldicoados, lojas ocultas e marcas de boss.',
  },
  {
    name: 'Diario do Ferreiro Sem Face',
    price: 'R$ 34,90',
    description:
      'Caderno tematico com paginas envelhecidas, tabelas de upgrade e esbocos de torres infernais.',
  },
];

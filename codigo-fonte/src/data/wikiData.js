export const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Universo', href: '#universo' },
  { label: 'Personagens', href: '#personagens' },
  { label: 'Mascaras', href: '#mascaras' },
  { label: 'Torres', href: '#torres' },
  { label: 'Conta', href: '#conta' },
  { label: 'Atualizacoes', href: '#atualizacoes' },
  { label: 'Loja', href: '#loja' },
];

export const highlights = [
  {
    value: 'Tower defense',
    label: 'Defesa de nucleo contra invasoes de jogadores rivais.',
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
      'Cada jogador comeca com uma dungeon propria e um nucleo infernal. O objetivo do mestre e proteger esse nucleo, expandir salas, instalar torres e recrutar NPCs para conter invasores de outros jogadores.',
  },
  {
    title: 'Profundidade e saque',
    text:
      'A progressao acontece em camadas. Salas mais profundas guardam recursos raros, unidades valiosas e materiais usados para melhorar defesas e preparar ataques contra dungeons rivais.',
  },
  {
    title: 'Invasoes',
    text:
      'O jogo e pensado como multiplayer: jogadores atacam dungeons de outros mestres, roubam recursos e precisam deixar a propria base pronta para contra-ataques.',
  },
];

export const units = [
  {
    name: 'Mestre da Dungeon',
    role: 'Jogador',
    type: 'Controle',
    description:
      'Comanda o nucleo, escolhe onde gastar recursos e decide quando invadir outras dungeons.',
    lore:
      'O mestre nao e um heroi classico. Ele e um senhor de territorio, preso a um pacto com o nucleo infernal. Cada vitoria aumenta a dungeon, mas tambem chama a atencao de outros mestres.',
    stats: ['Construcao', 'Saque', 'Defesa'],
  },
  {
    name: 'Sentinela de Cinzas',
    role: 'NPC defensivo',
    type: 'Tanque',
    description:
      'Guarda corredores estreitos e segura os inimigos enquanto as torres carregam disparos pesados.',
    lore:
      'Criada com cinzas de antigos guardas, a sentinela obedece ao som do nucleo. Ela nao fala, mas reage a invasores como se lembrasse de guerras antigas.',
    stats: ['Vida alta', 'Provocacao', 'Baixa mobilidade'],
  },
  {
    name: 'Arcanista do Fosso',
    role: 'NPC de suporte',
    type: 'Magia',
    description:
      'Amplifica torres proximas e aplica efeitos de lentidao em unidades que avancam pelo mapa.',
    lore:
      'O arcanista vive em pocos de mana escuro e vende lealdade a quem alimenta suas runas. Em combate, ele distorce corredores e prende inimigos em circulos de sombra.',
    stats: ['Controle', 'Suporte', 'Recarga media'],
  },
  {
    name: 'Mercador de Ossos',
    role: 'NPC comerciante',
    type: 'Economia',
    description:
      'Aparece em saloes seguros da dungeon para trocar reliquias, vender contratos de NPCs e comprar fragmentos amaldicoados.',
    lore:
      'Ninguem sabe se o mercador esta vivo. Ele carrega sacolas que tilintam como ossos secos e aceita moedas, dentes, mapas e promessas como pagamento.',
    stats: ['Troca', 'Contratos', 'Itens raros'],
  },
  {
    name: 'Ferreiro Sem Face',
    role: 'NPC comerciante',
    type: 'Melhoria',
    description:
      'Forja reforcos para torres e grava runas em mascaras usando metais retirados das camadas inferiores.',
    lore:
      'O ferreiro perdeu o rosto ao tentar fundir uma mascara proibida. Desde entao, grava identidades em metal e cobra caro por qualquer melhoria.',
    stats: ['Upgrade', 'Runas', 'Custo alto'],
  },
  {
    name: 'Cultista do Nucleo Vazio',
    role: 'Inimigo NPC',
    type: 'Ritual',
    description:
      'Tenta corromper salas defendidas e enfraquecer o nucleo se permanecer vivo por tempo suficiente.',
    lore:
      'Cultistas procuram nucleos instaveis para abrir rituais de vazio. Sozinhos parecem frageis, mas em grupo conseguem transformar uma sala em altar inimigo.',
    stats: ['Debuff', 'Vida media', 'Perigoso em grupo'],
  },
  {
    name: 'Cavaleiro Carnical',
    role: 'Inimigo NPC',
    type: 'Brutamontes',
    description:
      'Unidade pesada que avanca lentamente, resiste a dano fisico e abre caminho para inimigos menores.',
    lore:
      'Um guerreiro morto que ainda procura uma guerra digna. Sua armadura esta costurada a carne, e cada passo deixa marcas negras nas pedras.',
    stats: ['Armadura', 'Dano alto', 'Lento'],
  },
  {
    name: 'Aranha de Cripta',
    role: 'Inimigo NPC',
    type: 'Emboscada',
    description:
      'Movimenta-se por passagens rachadas e ignora parte das barricadas, obrigando o jogador a proteger rotas secundarias.',
    lore:
      'Essas criaturas nascem em salas abandonadas. Elas aprendem rotas que nem o dono da dungeon conhece e transformam rachaduras em atalhos de ataque.',
    stats: ['Mobilidade', 'Veneno', 'Pouca vida'],
  },
  {
    name: 'Mestre Rival',
    role: 'Invasor rival',
    type: 'PvP',
    description:
      'Outro jogador que invade sua dungeon para testar sua defesa, quebrar rotas seguras e roubar recursos do nucleo.',
    lore:
      'Cada mestre rival tambem possui sua propria dungeon, loja de melhorias, mascaras, ferreiros e torres. Quando entra no seu territorio, ele nao e um monstro comum: e um chefe inimigo buscando evoluir as proprias camadas.',
    stats: ['Ataque PvP', 'Saque', 'Estrategia rival'],
  },
  {
    name: 'Campeao de Cerco',
    role: 'Invasor rival',
    type: 'Investida',
    description:
      'Forca ofensiva usada por mestres rivais para abrir caminho ate salas importantes durante uma invasao multiplayer.',
    lore:
      'O campeao carrega o selo de outro nucleo. Ele representa o investimento ofensivo do jogador rival: equipamentos comprados, melhorias aplicadas e mascaras escolhidas para romper a defesa.',
    stats: ['Pressao', 'Cerco', 'Prioridade alta'],
  },
];

export const masks = [
  {
    name: 'Mascara do Guardiao Oco',
    category: 'Defesa',
    power: 'Juramento do Nucleo',
    use: 'Protecao emergencial',
    cooldown: 'Alta',
    risk: 'Baixo',
    description:
      'Cria uma barreira ao redor do nucleo e aumenta a resistencia de NPCs defensivos durante uma invasao inimiga.',
  },
  {
    name: 'Mascara do Carrasco',
    category: 'Ataque',
    power: 'Execucao Sombria',
    use: 'Finalizar unidades fortes',
    cooldown: 'Media',
    risk: 'Medio',
    description:
      'Marca um inimigo ferido. Se ele cair em poucos segundos, a sala recebe um bonus temporario de dano.',
  },
  {
    name: 'Mascara do Mercador Cego',
    category: 'Economia',
    power: 'Pacto de Reliquias',
    use: 'Troca de recursos',
    cooldown: 'Baixa',
    risk: 'Medio',
    description:
      'Converte parte do saque roubado em materiais raros, mas aumenta o custo da proxima melhoria comprada.',
  },
  {
    name: 'Mascara da Fenda',
    category: 'Invasao',
    power: 'Passagem Profana',
    use: 'Abrir rota rival',
    cooldown: 'Alta',
    risk: 'Alto',
    description:
      'Durante uma invasao, revela uma rota alternativa na dungeon rival e permite reposicionar uma unidade invasora.',
  },
  {
    name: 'Mascara do Lamento',
    category: 'Controle',
    power: 'Eco Funebre',
    use: 'Atrasar hordas',
    cooldown: 'Media',
    risk: 'Baixo',
    description:
      'Reduz a velocidade de inimigos em salas conectadas e interrompe rituais de cultistas por alguns segundos.',
  },
  {
    name: 'Mascara do Usurpador',
    category: 'Risco',
    power: 'Roubo de Comando',
    use: 'Virar combate',
    cooldown: 'Muito alta',
    risk: 'Muito alto',
    description:
      'Tenta dominar uma unidade inimiga temporariamente. Se falhar, o nucleo perde energia e a sala fica vulneravel.',
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
    date: 'Base do projeto',
    title: 'Multiplayer competitivo',
    text: 'A proposta central e disputa entre jogadores: defender a propria dungeon e invadir bases rivais para roubar recursos.',
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

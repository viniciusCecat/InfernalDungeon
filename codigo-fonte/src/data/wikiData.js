export const navItems = [
  { label: 'Início', href: '#inicio' },
  { label: 'Universo', href: '#universo' },
  { label: 'Personagens', href: '#personagens' },
  { label: 'Máscaras', href: '#mascaras' },
  { label: 'Torres', href: '#torres' },
  { label: 'Conta', href: '#conta' },
  { label: 'Atualizações', href: '#atualizacoes' },
  { label: 'Loja', href: '#loja' },
];

export const highlights = [
  {
    value: 'Tower defense',
    label: 'Defesa de núcleo contra invasões de jogadores rivais.',
  },
  {
    value: 'Dungeon crawler',
    label: 'Quanto mais profundo, melhores recursos e unidades.',
  },
  {
    value: 'Máscaras',
    label: 'Habilidades especiais que mudam a estratégia do jogador.',
  },
];

export const lore = [
  {
    title: 'A ruína do primeiro mestre',
    text:
      'O jogador começa como dono de uma dungeon destruída, abandonada depois de uma invasão que quase apagou o núcleo infernal. A campanha acompanha esse mestre se reerguendo, reconstruindo salas, recuperando contratos antigos e transformando ruínas em um território temido.',
  },
  {
    title: 'O ponto de vista do vilão',
    text:
      'Infernal Dungeon não coloca o jogador como herói salvando o mundo. A proposta é administrar a ameaça: proteger o próprio covil, negociar com criaturas perigosas, roubar recursos de rivais e tomar decisões de poder como um senhor de dungeon.',
  },
  {
    title: 'O núcleo da dungeon',
    text:
      'Cada jogador possui um núcleo infernal que sustenta a dungeon. Se ele cair, a base perde estabilidade, salas entram em colapso e o mestre rival consegue roubar parte dos recursos acumulados.',
  },
  {
    title: 'Profundidade e saque',
    text:
      'A progressão acontece em camadas. Salas mais profundas guardam minérios, relíquias, contratos de NPCs e fragmentos usados para melhorar torres, máscaras e ferreiros.',
  },
  {
    title: 'Fan service futuro',
    text:
      'A lore deixa espaço para eventos, chefes convidados, máscaras lendárias, facções rivais e temporadas focadas em antigos donos da dungeon. A ideia é permitir expansão sem quebrar o universo principal.',
  },
];

export const units = [
  {
    name: 'Mestre da Dungeon',
    role: 'Jogador',
    type: 'Controle',
    description:
      'Comanda o núcleo, escolhe onde gastar recursos e decide quando invadir outras dungeons.',
    lore:
      'O mestre não é um herói clássico. Ele herdou uma dungeon quebrada, com corredores soterrados e servos dispersos. A reconstrução começa pequena, mas cada sala recuperada reacende o pacto com o núcleo e atrai rivais interessados em tomar o que sobrou.',
    stats: ['Construção', 'Saque', 'Defesa'],
  },
  {
    name: 'Sentinela de Cinzas',
    role: 'NPC defensivo',
    type: 'Tanque',
    description:
      'Guarda corredores estreitos e segura os inimigos enquanto as torres carregam disparos pesados.',
    lore:
      'Criada com cinzas de antigos guardas, a sentinela obedece ao som do núcleo. Ela não fala, mas reconhece os salões destruídos da dungeon original e reage a invasores como se ainda estivesse defendendo uma guerra perdida.',
    stats: ['Vida alta', 'Provocação', 'Baixa mobilidade'],
  },
  {
    name: 'Arcanista do Fosso',
    role: 'NPC de suporte',
    type: 'Magia',
    description:
      'Amplifica torres próximas e aplica efeitos de lentidão em unidades que avançam pelo mapa.',
    lore:
      'O arcanista vive em poços de mana escuro e vende lealdade a quem alimenta suas runas. Ele conhece passagens soterradas da antiga dungeon e usa círculos de sombra para atrasar grupos rivais.',
    stats: ['Controle', 'Suporte', 'Recarga média'],
  },
  {
    name: 'Mercador de Ossos',
    role: 'NPC comerciante',
    type: 'Economia',
    description:
      'Aparece em salões seguros da dungeon para trocar relíquias, vender contratos de NPCs e comprar fragmentos amaldiçoados.',
    lore:
      'Ninguém sabe se o mercador está vivo. Ele carrega sacolas que tilintam como ossos secos e aceita moedas, dentes, mapas e promessas como pagamento. Dizem que ele já serviu ao antigo dono da dungeon.',
    stats: ['Troca', 'Contratos', 'Itens raros'],
  },
  {
    name: 'Ferreiro Sem Face',
    role: 'NPC comerciante',
    type: 'Melhoria',
    description:
      'Forja reforços para torres e grava runas em máscaras usando metais retirados das camadas inferiores.',
    lore:
      'O ferreiro perdeu o rosto ao tentar fundir uma máscara proibida. Desde então, grava identidades em metal e cobra caro por qualquer melhoria. Ele é essencial para transformar sucata da ruína em defesa real.',
    stats: ['Upgrade', 'Runas', 'Custo alto'],
  },
  {
    name: 'Mordomo de Ossos',
    role: 'NPC de suporte',
    type: 'Gestão',
    description:
      'Organiza salas destruídas, acelera reparos e reduz o custo de reconstrução após uma invasão.',
    lore:
      'O mordomo servia a linhagem anterior de mestres e permaneceu na dungeon mesmo depois da queda. Ele trata ruínas como cômodos bagunçados e chama qualquer desastre de manutenção atrasada.',
    stats: ['Reparo', 'Gestão', 'Economia'],
  },
  {
    name: 'Carcereiro de Ferro Frio',
    role: 'NPC defensivo',
    type: 'Controle',
    description:
      'Prende invasores em salas-chave e aumenta o tempo necessário para chegar ao núcleo.',
    lore:
      'O carcereiro guardava prisioneiros nas camadas inferiores antes da destruição da dungeon. Agora usa correntes quebradas para transformar corredores em celas temporárias.',
    stats: ['Controle', 'Bloqueio', 'Resistência'],
  },
  {
    name: 'Bruxa da Caldeira Rachada',
    role: 'NPC comerciante',
    type: 'Alquimia',
    description:
      'Vende poções, venenos e reagentes para torres de área ou máscaras de risco.',
    lore:
      'A bruxa instalou sua caldeira em uma sala que ainda pinga mana do teto. Ela não promete cura: promete vantagem, desde que o mestre aceite efeitos colaterais.',
    stats: ['Venenos', 'Reagentes', 'Risco médio'],
  },
  {
    name: 'Cultista do Núcleo Vazio',
    role: 'Inimigo NPC',
    type: 'Ritual',
    description:
      'Tenta corromper salas defendidas e enfraquecer o núcleo se permanecer vivo por tempo suficiente.',
    lore:
      'Cultistas procuram núcleos instáveis para abrir rituais de vazio. Sozinhos parecem frágeis, mas em grupo conseguem transformar uma sala em altar inimigo e acelerar o colapso da base.',
    stats: ['Debuff', 'Vida média', 'Perigoso em grupo'],
  },
  {
    name: 'Cavaleiro Carniçal',
    role: 'Inimigo NPC',
    type: 'Brutamontes',
    description:
      'Unidade pesada que avança lentamente, resiste a dano físico e abre caminho para inimigos menores.',
    lore:
      'Um guerreiro morto que ainda procura uma guerra digna. Sua armadura está costurada à carne, e cada passo deixa marcas negras nas pedras reconstruídas da dungeon.',
    stats: ['Armadura', 'Dano alto', 'Lento'],
  },
  {
    name: 'Aranha de Cripta',
    role: 'Inimigo NPC',
    type: 'Emboscada',
    description:
      'Movimenta-se por passagens rachadas e ignora parte das barricadas, obrigando o jogador a proteger rotas secundárias.',
    lore:
      'Essas criaturas nascem em salas abandonadas. Elas aprendem rotas que nem o dono da dungeon conhece e transformam rachaduras em atalhos de ataque.',
    stats: ['Mobilidade', 'Veneno', 'Pouca vida'],
  },
  {
    name: 'Espectro Cobrador',
    role: 'Inimigo NPC',
    type: 'Maldição',
    description:
      'Drena moedas e recursos se alcançar salas de armazenamento ou lojas da dungeon.',
    lore:
      'O espectro era um antigo credor do primeiro mestre. Mesmo morto, continua cobrando dívidas impossíveis e transforma riqueza acumulada em punição contra donos descuidados.',
    stats: ['Drena recursos', 'Evasivo', 'Prioridade alta'],
  },
  {
    name: 'Mestre Rival',
    role: 'Mestre rival',
    type: 'Ataque e defesa',
    description:
      'Jogador inimigo que invade outras bases para roubar recursos e também protege o próprio núcleo quando sua dungeon é atacada.',
    lore:
      'Cada mestre rival possui sua própria dungeon, loja de melhorias, máscaras, ferreiros e torres. Ele pode invadir bases adversárias como outro jogador, mas quando a dungeon dele é invadida, permanece perto do núcleo como o último inimigo da rota, controlado como NPC pelo sistema.',
    stats: ['Invade bases', 'Protege o núcleo', 'NPC na defesa'],
  },
  {
    name: 'Campeão de Cerco',
    role: 'Invasor rival',
    type: 'Investida',
    description:
      'Força ofensiva usada por mestres rivais para abrir caminho até salas importantes durante uma invasão multiplayer.',
    lore:
      'O campeão carrega o selo de outro núcleo. Ele representa o investimento ofensivo do jogador rival: equipamentos comprados, melhorias aplicadas e máscaras escolhidas para romper a defesa.',
    stats: ['Pressão', 'Cerco', 'Prioridade alta'],
  },
  {
    name: 'Saqueador de Relíquias',
    role: 'Invasor rival',
    type: 'Agilidade',
    description:
      'Especialista em entrar por rotas secundárias e fugir levando itens raros antes que a defesa reaja.',
    lore:
      'Saqueadores são contratados por mestres rivais para testar falhas da base. Eles não querem vencer a guerra sozinhos; querem provar que a dungeon ainda tem rachaduras.',
    stats: ['Velocidade', 'Roubo', 'Pouca vida'],
  },
];

export const masks = [
  {
    name: 'Máscara do Guardião Oco',
    category: 'Defesa',
    power: 'Juramento do Núcleo',
    use: 'Proteção emergencial',
    cooldown: 'Alta',
    risk: 'Baixo',
    description:
      'Cria uma barreira ao redor do núcleo e aumenta a resistência de NPCs defensivos durante uma invasão inimiga.',
  },
  {
    name: 'Máscara do Carrasco',
    category: 'Ataque',
    power: 'Execução Sombria',
    use: 'Finalizar unidades fortes',
    cooldown: 'Média',
    risk: 'Médio',
    description:
      'Marca um inimigo ferido. Se ele cair em poucos segundos, a sala recebe um bônus temporário de dano.',
  },
  {
    name: 'Máscara do Cofre Profano',
    category: 'Economia',
    power: 'Dízimo Sombrio',
    use: 'Converter saque',
    cooldown: 'Baixa',
    risk: 'Médio',
    description:
      'Transforma parte do saque roubado em materiais de melhoria, mas cobra uma taxa do núcleo na próxima compra da loja.',
  },
  {
    name: 'Máscara da Fenda',
    category: 'Invasão',
    power: 'Passagem Profana',
    use: 'Abrir rota rival',
    cooldown: 'Alta',
    risk: 'Alto',
    description:
      'Durante uma invasão, revela uma rota alternativa na dungeon rival e permite reposicionar uma unidade invasora.',
  },
  {
    name: 'Máscara do Lamento',
    category: 'Controle',
    power: 'Eco Fúnebre',
    use: 'Atrasar hordas',
    cooldown: 'Média',
    risk: 'Baixo',
    description:
      'Reduz a velocidade de inimigos em salas conectadas e interrompe rituais de cultistas por alguns segundos.',
  },
  {
    name: 'Máscara do Usurpador',
    category: 'Risco',
    power: 'Roubo de Comando',
    use: 'Virar combate',
    cooldown: 'Muito alta',
    risk: 'Muito alto',
    description:
      'Tenta dominar uma unidade inimiga temporariamente. Se falhar, o núcleo perde energia e a sala fica vulnerável.',
  },
  {
    name: 'Máscara da Coroa Partida',
    category: 'PvP',
    power: 'Autoridade Rival',
    use: 'Pressionar mestre rival',
    cooldown: 'Alta',
    risk: 'Alto',
    description:
      'Durante uma invasão, enfraquece temporariamente a defesa do Mestre Rival e aumenta o dano contra o núcleo inimigo.',
  },
  {
    name: 'Máscara do Ferreiro Rubro',
    category: 'Melhoria',
    power: 'Forja de Sangue',
    use: 'Reforçar torres',
    cooldown: 'Média',
    risk: 'Médio',
    description:
      'Aumenta o dano da próxima torre melhorada pelo ferreiro, mas exige fragmentos raros coletados nas camadas inferiores.',
  },
  {
    name: 'Máscara do Vigia Subterrâneo',
    category: 'Defesa',
    power: 'Olhar da Pedra',
    use: 'Revelar invasores',
    cooldown: 'Baixa',
    risk: 'Baixo',
    description:
      'Revela rotas escondidas e marca invasores rivais que tentam passar por salas secundárias da dungeon.',
  },
];

export const towers = [
  {
    name: 'Olho Abissal',
    role: 'Controle',
    damage: 'Baixo',
    range: 'Longo',
    cooldown: 'Rápida',
    description:
      'Dispara um raio arcano que marca inimigos e revela invasores escondidos antes que cheguem ao núcleo.',
  },
  {
    name: 'Balista de Ossos',
    role: 'Dano físico',
    damage: 'Alto',
    range: 'Médio',
    cooldown: 'Lenta',
    description:
      'Perfura alvos resistentes e é ideal contra cavaleiros carniçais e criaturas de armadura pesada.',
  },
  {
    name: 'Caldeirão Pestilento',
    role: 'Área',
    damage: 'Médio',
    range: 'Curto',
    cooldown: 'Média',
    description:
      'Derrama veneno em corredores estreitos, causando dano contínuo em hordas que tentam invadir a dungeon.',
  },
  {
    name: 'Obelisco da Máscara',
    role: 'Suporte',
    damage: 'Nenhum',
    range: 'Aura',
    cooldown: 'Passiva',
    description:
      'Amplifica habilidades de máscara do jogador e reduz a recarga de torres instaladas na mesma sala.',
  },
  {
    name: 'Agulha da Cripta',
    role: 'Execução',
    damage: 'Alto',
    range: 'Médio',
    cooldown: 'Lenta',
    description:
      'Dispara estacas de metal amaldiçoado contra alvos marcados, ideal para punir invasores fortes antes do núcleo.',
  },
  {
    name: 'Portão de Espinhos',
    role: 'Bloqueio',
    damage: 'Médio',
    range: 'Corredor',
    cooldown: 'Passiva',
    description:
      'Funciona como barreira viva, prende invasores e compra tempo para NPCs defensivos chegarem ao combate.',
  },
  {
    name: 'Forja de Lança-Viva',
    role: 'Dano contínuo',
    damage: 'Médio',
    range: 'Corredor',
    cooldown: 'Média',
    description:
      'Cria lanças orgânicas nas paredes da sala e causa dano constante em unidades que permanecem no corredor.',
  },
  {
    name: 'Totem do Núcleo Partido',
    role: 'Aura defensiva',
    damage: 'Nenhum',
    range: 'Sala',
    cooldown: 'Passiva',
    description:
      'Fortalece NPCs defensivos próximos e reduz o dano recebido pelo núcleo enquanto a sala estiver sob controle.',
  },
  {
    name: 'Canhão de Enxofre',
    role: 'Área pesada',
    damage: 'Alto',
    range: 'Longo',
    cooldown: 'Muito lenta',
    description:
      'Lança explosões de enxofre contra grupos de invasores, deixando o chão queimando por alguns segundos.',
  },
];

export const updates = [
  {
    category: 'Devlog',
    date: '2026-07-01',
    title: 'Wiki expandida com dark fantasy',
    text: 'Catálogo atualizado com comerciantes, inimigos, mestres rivais, invasores, torres e uma loja fictícia própria do universo.',
  },
  {
    category: 'Sistema',
    date: '2026-07-01',
    title: 'Fluxo de login e registro',
    text: 'Cadastro, login, consulta, edição e exclusão de conta local usando armazenamento do navegador.',
  },
  {
    category: 'Gameplay',
    date: 'Base do projeto',
    title: 'Multiplayer competitivo',
    text: 'A proposta central é disputa entre jogadores: defender a própria dungeon e invadir bases rivais para roubar recursos.',
  },
];

export const storeItems = [
  {
    id: 'tomo-nucleo-infernal',
    name: 'Tomo do Núcleo Infernal',
    price: 'R$ 39,90',
    priceValue: 39.9,
    stock: 8,
    description:
      'Livro fictício com lendas das camadas profundas, mapas rabiscados e anotações de antigos mestres de dungeon.',
  },
  {
    name: 'Miniatura Olho Abissal',
    id: 'miniatura-olho-abissal',
    price: 'R$ 79,90',
    priceValue: 79.9,
    stock: 5,
    description:
      'Colecionável conceitual da torre de vigilância arcana, com base de pedra e runas turquesa.',
  },
  {
    id: 'mascara-mestre-sem-face',
    name: 'Máscara do Mestre Sem Face',
    price: 'R$ 64,90',
    priceValue: 64.9,
    stock: 4,
    description:
      'Réplica decorativa fictícia inspirada nas máscaras de poder usadas pelos mestres da dungeon.',
  },
  {
    id: 'moedas-reliquia',
    name: 'Moedas de Relíquia',
    price: 'R$ 24,90',
    priceValue: 24.9,
    stock: 12,
    description:
      'Conjunto imaginário de moedas antigas usadas pelo Mercador de Ossos em trocas nas salas seguras.',
  },
  {
    name: 'Mapa das Catacumbas',
    id: 'mapa-catacumbas',
    price: 'R$ 29,90',
    priceValue: 29.9,
    stock: 7,
    description:
      'Pôster fictício com rotas de invasão, salões amaldiçoados, lojas ocultas e marcas de boss.',
  },
  {
    id: 'diario-ferreiro-sem-face',
    name: 'Diário do Ferreiro Sem Face',
    price: 'R$ 34,90',
    priceValue: 34.9,
    stock: 6,
    description:
      'Caderno temático com páginas envelhecidas, tabelas de upgrade e esboços de torres infernais.',
  },
];

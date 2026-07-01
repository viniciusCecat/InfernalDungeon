# Documento de Requisitos - Infernal Dungeon

## Objetivo do sistema

Desenvolver uma wiki/apresentacao oficial para o jogo Infernal Dungeon, reunindo informacoes sobre universo, proposta de gameplay, personagens/unidades, comerciantes, inimigos, torres, mascaras, atualizacoes e loja ficticia. A aplicacao deve despertar interesse pelo jogo e permitir que informacoes da wiki sejam organizadas de forma clara.

O jogo apresentado pela wiki tem proposta multiplayer: cada jogador administra uma dungeon propria, defende o nucleo e invade dungeons de jogadores rivais para disputar recursos.

## Escopo implementado na Etapa 2

Nesta etapa foi implementada uma aplicacao web em React com uma pagina principal componentizada e um fluxo funcional completo de acesso do visitante. Esse fluxo cobre registro, login, consulta de perfil, edicao de dados, logout e exclusao de conta local.

## Requisitos funcionais implementados

| Codigo | Requisito | Evidencia esperada |
| --- | --- | --- |
| RF01 | Exibir a pagina inicial com nome, descricao e proposta do jogo. | Print da tela inicial. |
| RF02 | Exibir uma secao de universo/background com informacoes sobre nucleo, profundidade e invasoes. | Print da secao Universo. |
| RF03 | Exibir catalogo de personagens, comerciantes, inimigos e invasores do projeto. | Print da secao Personagens. |
| RF04 | Permitir filtrar personagens/unidades por categoria. | Print mostrando filtro aplicado. |
| RF05 | Permitir registrar uma conta local com nome, e-mail, senha e interesse. | Video demonstrando registro. |
| RF06 | Permitir login com e-mail e senha cadastrados. | Video demonstrando login. |
| RF07 | Exibir os dados do perfil quando o usuario estiver logado. | Print do perfil logado. |
| RF08 | Permitir editar nome, e-mail, senha e interesse do perfil. | Video demonstrando edicao. |
| RF09 | Permitir logout da sessao atual. | Video demonstrando saida. |
| RF10 | Permitir excluir a conta local com confirmacao. | Video demonstrando exclusao. |
| RF11 | Exibir catalogo de torres com atributos principais. | Print da secao Torres. |
| RF12 | Exibir atualizacoes/devlog do projeto. | Print da secao Atualizacoes. |
| RF13 | Exibir loja ficticia com produtos inventados para o universo do jogo. | Print da secao Loja. |

## Requisitos nao funcionais considerados

| Codigo | Requisito | Como foi considerado |
| --- | --- | --- |
| RNF01 | A aplicacao deve ser executavel em ambiente web moderno. | Projeto configurado com React e Vite. |
| RNF02 | A interface deve ser responsiva. | CSS com media queries para desktop e mobile. |
| RNF03 | O codigo deve estar organizado em componentes. | Componentes separados em `src/components`. |
| RNF04 | Os dados estaticos devem ficar separados da interface. | Dados principais em `src/data/wikiData.js`. |
| RNF05 | O fluxo funcional deve funcionar sem backend. | Uso de `localStorage` para persistencia local de contas. |
| RNF06 | O projeto deve manter coerencia com a proposta da Etapa 1. | Conteudo focado em wiki, dungeon, torres, NPCs, mascaras, atualizacoes e loja ficticia. |
| RNF07 | A entrega deve seguir a estrutura solicitada. | Pastas `codigo-fonte`, `documentacao`, `evidencias` e `README.md`. |

## Observacoes

- O projeto ainda nao implementa backend.
- O jogo foi tratado como multiplayer desde a proposta desta versao da wiki.
- As imagens finais do jogo podem ser adicionadas em etapas futuras. Nesta entrega, o foco e a estrutura funcional e componentizada da wiki.

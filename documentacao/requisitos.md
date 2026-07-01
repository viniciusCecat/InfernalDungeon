# Documento de Requisitos - Infernal Dungeon

## Objetivo do sistema

Desenvolver uma wiki/apresentacao oficial para o jogo Infernal Dungeon, reunindo informacoes sobre universo, proposta de gameplay, personagens/unidades, mascaras, atualizacoes e loja conceitual. A aplicacao deve despertar interesse pelo jogo e permitir que informacoes da wiki sejam organizadas de forma clara.

## Escopo implementado na Etapa 2

Nesta etapa foi implementada uma aplicacao web em React com uma pagina principal componentizada e um fluxo funcional completo para gerenciamento de mascaras. Esse fluxo representa a administracao de uma parte da wiki e cobre inclusao, consulta, edicao e exclusao.

## Requisitos funcionais implementados

| Codigo | Requisito | Evidencia esperada |
| --- | --- | --- |
| RF01 | Exibir a pagina inicial com nome, descricao e proposta do jogo. | Print da tela inicial. |
| RF02 | Exibir uma secao de universo/background com informacoes sobre nucleo, profundidade e invasoes. | Print da secao Universo. |
| RF03 | Exibir catalogo de personagens/unidades do projeto. | Print da secao Personagens. |
| RF04 | Permitir filtrar personagens/unidades por categoria. | Print mostrando filtro aplicado. |
| RF05 | Listar mascaras cadastradas na wiki. | Print da listagem de mascaras. |
| RF06 | Permitir cadastrar uma nova mascara com nome, categoria, habilidade, recarga e efeito. | Video demonstrando cadastro. |
| RF07 | Permitir pesquisar e filtrar mascaras cadastradas. | Video ou print da busca/filtro. |
| RF08 | Permitir editar uma mascara existente. | Video demonstrando edicao. |
| RF09 | Permitir excluir uma mascara existente com confirmacao. | Video demonstrando exclusao. |
| RF10 | Persistir as mascaras no navegador usando armazenamento local. | Video recarregando a pagina apos cadastro. |
| RF11 | Exibir atualizacoes/devlog do projeto. | Print da secao Atualizacoes. |
| RF12 | Exibir loja conceitual com produtos previstos. | Print da secao Loja. |

## Requisitos nao funcionais considerados

| Codigo | Requisito | Como foi considerado |
| --- | --- | --- |
| RNF01 | A aplicacao deve ser executavel em ambiente web moderno. | Projeto configurado com React e Vite. |
| RNF02 | A interface deve ser responsiva. | CSS com media queries para desktop e mobile. |
| RNF03 | O codigo deve estar organizado em componentes. | Componentes separados em `src/components`. |
| RNF04 | Os dados estaticos devem ficar separados da interface. | Dados principais em `src/data/wikiData.js`. |
| RNF05 | O fluxo funcional deve funcionar sem backend. | Uso de `localStorage` para persistencia local. |
| RNF06 | O projeto deve manter coerencia com a proposta da Etapa 1. | Conteudo focado em wiki, dungeon, torres, NPCs, mascaras, atualizacoes e loja. |
| RNF07 | A entrega deve seguir a estrutura solicitada. | Pastas `codigo-fonte`, `documentacao`, `evidencias` e `README.md`. |

## Observacoes

- O projeto ainda nao implementa backend.
- O multiplayer aparece apenas como expectativa futura, pois o escopo atual do jogo e single-player.
- As imagens finais do jogo podem ser adicionadas em etapas futuras. Nesta entrega, o foco e a estrutura funcional e componentizada da wiki.


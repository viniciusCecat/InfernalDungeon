# Documento de Requisitos

## Projeto

**Infernal Dungeon**

## Integrantes

* Vinicius Cecatto
* Leonardo Scheffer Nunes

---

## Objetivo do sistema

O objetivo do sistema é montar uma wiki/apresentação do jogo **Infernal Dungeon**.

Na wiki colocamos informações sobre o universo do jogo, personagens, máscaras, torres, atualizações e uma loja fictícia.

Além da parte de apresentação, também fizemos algumas funcionalidades para mostrar um fluxo funcionando, como cadastro de usuário, login, edição de perfil, carrinho, endereço, pedidos, controle de estoque e suporte por e-mail.

A ideia foi entregar uma parte funcional do projeto, sem fazer um backend completo, mas com um fluxo que possa ser testado.

---

## Requisitos funcionais implementados

* **RF01:** Exibir a página inicial de apresentação do jogo.
* **RF02:** Exibir uma página com o universo e a história do jogo.
* **RF03:** Exibir personagens, NPCs, inimigos e mestres rivais.
* **RF04:** Permitir filtrar personagens por categoria.
* **RF05:** Exibir uma página de máscaras com habilidades, recarga, uso e risco.
* **RF06:** Exibir uma página de torres com dano, alcance, recarga e função.
* **RF07:** Exibir uma página de atualizações/devlog.
* **RF08:** Permitir cadastro de usuário.
* **RF09:** Permitir login de usuário.
* **RF10:** Permitir consultar e editar o perfil.
* **RF11:** Permitir excluir a conta.
* **RF12:** Manter a sessão ativa no navegador durante o uso.
* **RF13:** Permitir enviar mensagem de suporte por e-mail para usuário logado.
* **RF14:** Bloquear compra na loja quando o usuário não estiver logado.
* **RF15:** Permitir salvar endereço de entrega na conta.
* **RF16:** Permitir adicionar produtos ao carrinho.
* **RF17:** Permitir alterar quantidade e remover itens do carrinho.
* **RF18:** Validar se existe carrinho e endereço antes de liberar o pagamento.
* **RF19:** Exibir uma etapa de pagamento fictício, deixando claro que é apenas demonstração.
* **RF20:** Permitir finalizar a compra depois da confirmação do pagamento fictício.
* **RF21:** Registrar os pedidos no banco local.
* **RF22:** Controlar o estoque da loja no banco local.
* **RF23:** Permitir cancelar um pedido.
* **RF24:** Exibir uma página para visualizar o banco local e usar como evidência.

---

## Requisitos não funcionais considerados

* **RNF01:** O sistema foi feito usando React.
* **RNF02:** O projeto usa Vite para rodar o frontend.
* **RNF03:** A API local foi feita com Node.js e Express.
* **RNF04:** O banco local usa SQLite com SQL.js.
* **RNF05:** O projeto usa Git e GitHub para controle de versão.
* **RNF06:** O código foi organizado em componentes, dados, assets e servidor.
* **RNF07:** As senhas não são salvas em texto puro no banco.
* **RNF08:** Arquivos sensíveis, como `.env`, não devem ser enviados para o GitHub.
* **RNF09:** O arquivo local do banco SQLite também não deve ser enviado para o GitHub.
* **RNF10:** A interface foi pensada para funcionar em desktop e telas menores.
* **RNF11:** Foram usados SVGs locais para ícones da interface.
* **RNF12:** O envio de e-mail pode ser configurado com SMTP pelo arquivo `.env`.

---

## Fluxo principal do sistema

O fluxo principal que foi implementado é:

1. O usuário acessa a wiki.
2. O usuário cria uma conta.
3. O usuário faz login.
4. O usuário pode ver e editar o perfil.
5. O usuário acessa a loja.
6. O usuário cadastra um endereço.
7. O usuário adiciona produtos no carrinho.
8. O sistema verifica se o carrinho e o endereço estão corretos.
9. O usuário confirma um pagamento fictício.
10. O sistema registra o pedido e diminui o estoque.
11. O usuário pode cancelar o pedido.
12. O sistema registra o cancelamento e devolve o estoque.

---

## Observações

O pagamento do sistema é apenas uma simulação, sem cobrança real. Ele foi colocado para mostrar o fluxo de compra até o registro do pedido.

O banco de dados é local e usado somente para este projeto.

Com isso, o projeto entrega uma wiki funcional com conta de usuário, carrinho, pedidos, banco local e evidências de funcionamento.

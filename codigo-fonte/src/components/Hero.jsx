import { highlights } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';

export function Hero() {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow">Wiki do projeto</p>
        <h1>Infernal Dungeon</h1>
        <p className="hero-lead">
          Um tower defense em dungeon onde o jogador controla um nucleo,
          constroi salas, posiciona torres, recruta NPCs e invade outras
          dungeons de jogadores rivais para obter recursos mais raros.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#conta">
            <Icon name="userPlus" size={18} />
            Criar conta
          </a>
          <a className="secondary-button" href="#personagens">
            <Icon name="play" size={18} />
            Explorar wiki
          </a>
        </div>
      </div>

      <div className="dungeon-board" aria-label="Fluxo da partida">
        <div className="flow-lane">
          <strong>Defesa da dungeon</strong>
          <div className="flow-row">
            <div className="flow-step invasion-step">
              <Icon name="invader" size={24} />
              <span>Invasor rival</span>
              <small>entra pela rota</small>
            </div>
            <div className="flow-step">
              <Icon name="tower" size={24} />
              <span>Torres</span>
              <small>seguram corredor</small>
            </div>
            <div className="flow-step">
              <Icon name="shield" size={24} />
              <span>NPCs</span>
              <small>bloqueiam salas</small>
            </div>
            <div className="flow-step core-step">
              <Icon name="boss" size={28} />
              <span>Nucleo</span>
              <small>ultimo alvo</small>
            </div>
          </div>
        </div>

        <div className="flow-lane">
          <strong>Evolucao da base</strong>
          <div className="flow-row">
            <div className="flow-step">
              <Icon name="coinDollar" size={24} />
              <span>Saque</span>
              <small>gera recurso</small>
            </div>
            <div className="flow-step">
              <Icon name="shoppingBag" size={24} />
              <span>Loja</span>
              <small>compra contratos</small>
            </div>
            <div className="flow-step">
              <Icon name="merchant" size={24} />
              <span>Ferreiro</span>
              <small>melhora torres</small>
            </div>
            <div className="flow-step">
              <Icon name="mask" size={24} />
              <span>Mascaras</span>
              <small>mudam estrategia</small>
            </div>
          </div>
        </div>
      </div>

      <div className="highlight-strip">
        {highlights.map((item) => (
          <article key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

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

      <div className="dungeon-board" aria-label="Fluxo conceitual da dungeon">
        <span className="dungeon-route route-main" aria-hidden="true" />
        <span className="dungeon-route route-defense" aria-hidden="true" />
        <span className="dungeon-route route-economy" aria-hidden="true" />

        <div className="room room-resource">
          <Icon name="coinDollar" size={24} />
          <span>Recursos</span>
          <small>Saque</small>
        </div>
        <div className="room room-forge">
          <Icon name="merchant" size={24} />
          <span>Ferreiro</span>
          <small>Melhorias</small>
        </div>
        <div className="room room-shop">
          <Icon name="shoppingBag" size={24} />
          <span>Loja</span>
          <small>Contratos</small>
        </div>
        <div className="room room-tower">
          <Icon name="tower" size={24} />
          <span>Torres</span>
          <small>Defesa</small>
        </div>
        <div className="room room-core">
          <Icon name="boss" size={30} />
          <span>Nucleo</span>
          <small>Alvo final</small>
        </div>
        <div className="room room-npc">
          <Icon name="shield" size={24} />
          <span>NPCs</span>
          <small>Guardas</small>
        </div>
        <div className="room room-mask">
          <Icon name="mask" size={24} />
          <span>Mascaras</span>
          <small>Poderes</small>
        </div>
        <div className="room room-invasion">
          <Icon name="invader" size={24} />
          <span>Invasao rival</span>
          <small>Entrada</small>
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

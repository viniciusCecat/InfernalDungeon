import { highlights } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';

export function Hero() {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow">Wiki do projeto</p>
        <h1>Infernal Dungeon</h1>
        <p className="hero-lead">
          Um tower defense em dungeon onde o jogador controla um núcleo,
          constrói salas, posiciona torres, recruta NPCs e invade outras
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

      <div className="dungeon-showcase" aria-label="Arte conceitual do Infernal Dungeon">
        <div className="sigil-ring" aria-hidden="true" />
        <div className="sigil-ring sigil-ring-inner" aria-hidden="true" />
        <div className="core-orb">
          <span>Núcleo Infernal</span>
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

import { Play, ScrollText } from 'lucide-react';
import { highlights } from '../data/wikiData.js';

export function Hero() {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-copy">
        <p className="eyebrow">Wiki do projeto</p>
        <h1>Infernal Dungeon</h1>
        <p className="hero-lead">
          Um tower defense em dungeon onde o jogador controla um nucleo,
          constroi salas, posiciona torres, recruta NPCs e invade outras
          dungeons para obter recursos mais raros.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="#mascaras">
            <ScrollText size={18} />
            Ver mascaras
          </a>
          <a className="secondary-button" href="#personagens">
            <Play size={18} />
            Explorar wiki
          </a>
        </div>
      </div>

      <div className="dungeon-board" aria-label="Mapa conceitual da dungeon">
        <div className="room room-core">Nucleo</div>
        <div className="room">Torres</div>
        <div className="room">NPCs</div>
        <div className="room">Recursos</div>
        <div className="room">Invasao</div>
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

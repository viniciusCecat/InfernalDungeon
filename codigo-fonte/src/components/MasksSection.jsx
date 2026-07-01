import { masks } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';
import { SectionTitle } from './SectionTitle.jsx';

export function MasksSection() {
  return (
    <section className="page-section masks-section" id="mascaras">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Sistema de mascaras"
          title="Poderes do mestre"
          text="As mascaras funcionam como habilidades de jogador e definem estilos de defesa, invasao e controle durante partidas multiplayer."
        />

        <div className="mask-grid">
          {masks.map((mask) => (
            <article className="mask-card" key={mask.name}>
              <div className="mask-card-head">
                <Icon name="mask" size={30} />
                <span>{mask.category}</span>
              </div>
              <h3>{mask.name}</h3>
              <strong>{mask.power}</strong>
              <p>{mask.description}</p>
              <div className="mask-meta">
                <span>Uso: {mask.use}</span>
                <span>Recarga: {mask.cooldown}</span>
                <span>Risco: {mask.risk}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

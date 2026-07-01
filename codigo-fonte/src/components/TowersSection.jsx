import { towers } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';
import { SectionTitle } from './SectionTitle.jsx';

export function TowersSection() {
  return (
    <section className="page-section towers-section" id="torres">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Defesa da dungeon"
          title="Torres infernais"
          text="As torres definem o ritmo da defesa: algumas seguram hordas, outras punem invasores resistentes ou protegem o nucleo."
        />

        <div className="tower-grid">
          {towers.map((tower) => (
            <article className="tower-card" key={tower.name}>
              <div className="tower-card-head">
                <Icon name="tower" size={30} />
                <span>{tower.role}</span>
              </div>
              <h3>{tower.name}</h3>
              <p>{tower.description}</p>
              <div className="tower-stats">
                <span>Dano: {tower.damage}</span>
                <span>Alcance: {tower.range}</span>
                <span>Recarga: {tower.cooldown}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Shield, Swords, Gem } from 'lucide-react';
import { lore } from '../data/wikiData.js';
import { SectionTitle } from './SectionTitle.jsx';

const icons = [Shield, Gem, Swords];

export function LoreSection() {
  return (
    <section className="page-section lore-section" id="universo">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Background"
          title="Universo e objetivo do jogo"
          text="A wiki apresenta a ideia central do Infernal Dungeon e organiza os sistemas principais para futuros jogadores."
        />
        <div className="feature-grid">
          {lore.map((item, index) => {
            const Icon = icons[index] ?? Shield;

            return (
              <article className="feature-card" key={item.title}>
                <Icon size={26} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { lore } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';
import { SectionTitle } from './SectionTitle.jsx';

const icons = ['shield', 'gem', 'swords'];

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
            const icon = icons[index] ?? 'shield';

            return (
              <article className="feature-card" key={item.title}>
                <Icon name={icon} size={26} />
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

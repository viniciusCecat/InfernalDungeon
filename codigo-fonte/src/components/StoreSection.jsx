import { storeItems } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';
import { SectionTitle } from './SectionTitle.jsx';

export function StoreSection() {
  return (
    <section className="page-section store-section" id="loja">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Loja ficticia"
          title="Relicario do Abismo"
          text="Vitrine conceitual dark fantasy com produtos inventados para o universo do Infernal Dungeon."
        />
        <div className="store-grid">
          {storeItems.map((item) => (
            <article className="store-item" key={item.name}>
              <Icon name="shoppingBag" size={28} />
              <h3>{item.name}</h3>
              <strong>{item.price}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

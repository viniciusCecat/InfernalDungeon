import { storeItems } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';
import { SectionTitle } from './SectionTitle.jsx';

export function StoreSection() {
  return (
    <section className="page-section store-section" id="loja">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Loja"
          title="Produtos previstos"
          text="A loja funciona como vitrine conceitual para despertar interesse no jogo e em materiais derivados."
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

import { updates } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';
import { SectionTitle } from './SectionTitle.jsx';

export function NewsSection() {
  return (
    <section className="page-section news-section" id="atualizacoes">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Atualizacoes"
          title="Devlog e anuncios"
          text="Area reservada para eventos, correcoes de bugs e comunicados do projeto."
        />
        <div className="news-list">
          {updates.map((update) => (
            <article className="news-item" key={`${update.title}-${update.date}`}>
              <Icon name="newspaper" size={22} />
              <div>
                <span>{update.category} - {update.date}</span>
                <h3>{update.title}</h3>
                <p>{update.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

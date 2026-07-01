import { useMemo, useState } from 'react';
import { units } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';
import { SectionTitle } from './SectionTitle.jsx';

const categories = [
  'Todos',
  'Jogador',
  'NPC defensivo',
  'NPC de suporte',
  'NPC comerciante',
  'Inimigo NPC',
  'Mestre rival',
  'Invasor rival',
];

function getUnitIcon(unit) {
  if (unit.type === 'Economia') {
    return 'coinDollar';
  }

  if (unit.role === 'Jogador') {
    return 'userCog';
  }

  if (unit.role === 'Invasor rival') {
    return 'invader';
  }

  if (unit.role === 'Mestre rival') {
    return 'boss';
  }

  if (unit.role === 'NPC comerciante') {
    return 'merchant';
  }

  if (unit.role === 'Inimigo NPC') {
    return 'enemy';
  }

  if (unit.role === 'NPC defensivo') {
    return 'shield';
  }

  if (unit.role === 'NPC de suporte') {
    return 'support';
  }

  return 'gem';
}

export function CharactersSection() {
  const [category, setCategory] = useState('Todos');
  const [selectedName, setSelectedName] = useState(units[0].name);

  const filteredUnits = useMemo(() => {
    if (category === 'Todos') {
      return units;
    }

    return units.filter((unit) => unit.role === category);
  }, [category]);

  const selectedUnit =
    units.find((unit) => unit.name === selectedName) ?? filteredUnits[0] ?? units[0];

  function selectCategory(nextCategory) {
    setCategory(nextCategory);
    const firstMatch =
      nextCategory === 'Todos'
        ? units[0]
        : units.find((unit) => unit.role === nextCategory);
    setSelectedName(firstMatch?.name ?? units[0].name);
  }

  return (
    <section className="page-section characters-section" id="personagens">
      <div className="content-shell two-column">
        <div>
          <SectionTitle
            eyebrow="Personagens e unidades"
            title="Elenco inicial da wiki"
            text="A apresentacao segue a ideia de catalogo de personagens: categorias, lista e painel de detalhes."
          />

          <div className="segmented-control" aria-label="Filtro de personagens">
            {categories.map((item) => (
              <button
                className={category === item ? 'active' : ''}
                key={item}
                type="button"
                onClick={() => selectCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="unit-list">
            {filteredUnits.map((unit) => (
              <button
                className={selectedUnit.name === unit.name ? 'unit-row selected' : 'unit-row'}
                key={unit.name}
                type="button"
                onClick={() => setSelectedName(unit.name)}
              >
                <span className="unit-row-main">
                  <span className="unit-row-icon">
                    <Icon name={getUnitIcon(unit)} size={26} />
                  </span>
                  <span>{unit.name}</span>
                </span>
                <small>{unit.type}</small>
              </button>
            ))}
          </div>
        </div>

        <article className="detail-panel">
          <div className="detail-icon">
            <Icon name={getUnitIcon(selectedUnit)} size={40} />
          </div>
          <p className="eyebrow">{selectedUnit.role}</p>
          <h3>{selectedUnit.name}</h3>
          <p>{selectedUnit.description}</p>
          <h4>Lore</h4>
          <p>{selectedUnit.lore}</p>
          <div className="stat-list">
            {selectedUnit.stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

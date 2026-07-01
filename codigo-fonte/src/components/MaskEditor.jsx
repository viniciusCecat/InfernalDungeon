import { Plus, RotateCcw, Save, Search, Trash2, Pencil } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { defaultMasks } from '../data/wikiData.js';
import { SectionTitle } from './SectionTitle.jsx';

const storageKey = 'infernal-dungeon-masks';
const emptyForm = {
  id: '',
  name: '',
  category: 'Defesa',
  power: '',
  cooldown: '',
  effect: '',
};

function createId(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function loadMasks() {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : defaultMasks;
  } catch {
    return defaultMasks;
  }
}

export function MaskEditor() {
  const [masks, setMasks] = useState(loadMasks);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [error, setError] = useState('');

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(masks));
  }, [masks]);

  const categories = useMemo(
    () => ['Todas', ...Array.from(new Set(masks.map((mask) => mask.category)))],
    [masks],
  );

  const visibleMasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return masks.filter((mask) => {
      const matchesCategory = category === 'Todas' || mask.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [mask.name, mask.category, mask.power, mask.effect]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, masks, query]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
    setError('');
  }

  function submitMask(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.power.trim() || !form.effect.trim()) {
      setError('Preencha nome, habilidade e efeito da mascara.');
      return;
    }

    const baseId = createId(form.name) || `mascara-${Date.now()}`;
    const nextId =
      editingId ?? (masks.some((mask) => mask.id === baseId) ? `${baseId}-${Date.now()}` : baseId);
    const nextMask = {
      ...form,
      id: nextId,
      name: form.name.trim(),
      power: form.power.trim(),
      cooldown: form.cooldown.trim() || 'Nao definido',
      effect: form.effect.trim(),
    };

    setMasks((current) => {
      if (editingId) {
        return current.map((mask) => (mask.id === editingId ? nextMask : mask));
      }

      return [nextMask, ...current];
    });
    resetForm();
  }

  function editMask(mask) {
    setEditingId(mask.id);
    setForm(mask);
    setError('');
  }

  function deleteMask(maskId) {
    const target = masks.find((mask) => mask.id === maskId);
    const confirmed = window.confirm(`Excluir ${target?.name ?? 'esta mascara'} da wiki?`);

    if (!confirmed) {
      return;
    }

    setMasks((current) => current.filter((mask) => mask.id !== maskId));

    if (editingId === maskId) {
      resetForm();
    }
  }

  function restoreDefaults() {
    const confirmed = window.confirm('Restaurar as mascaras iniciais da wiki?');

    if (confirmed) {
      setMasks(defaultMasks);
      resetForm();
    }
  }

  return (
    <section className="page-section mask-section" id="mascaras">
      <div className="content-shell">
        <SectionTitle
          eyebrow="Sistema de mascaras"
          title="Habilidades do jogador"
          text="Cada mascara altera o estilo de jogo do mestre da dungeon e pode ser cadastrada, consultada, editada ou removida."
        />

        <div className="mask-layout">
          <form className="mask-form" onSubmit={submitMask}>
            <h3>{editingId ? 'Editar mascara' : 'Nova mascara'}</h3>

            <label>
              Nome
              <input
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Mascara do Guardiao"
              />
            </label>

            <label>
              Categoria
              <select
                value={form.category}
                onChange={(event) => updateField('category', event.target.value)}
              >
                <option>Defesa</option>
                <option>Construcao</option>
                <option>Invasao</option>
                <option>Suporte</option>
                <option>Controle</option>
              </select>
            </label>

            <label>
              Habilidade
              <input
                value={form.power}
                onChange={(event) => updateField('power', event.target.value)}
                placeholder="Bastiao do Nucleo"
              />
            </label>

            <label>
              Recarga
              <input
                value={form.cooldown}
                onChange={(event) => updateField('cooldown', event.target.value)}
                placeholder="45s"
              />
            </label>

            <label>
              Efeito
              <textarea
                value={form.effect}
                onChange={(event) => updateField('effect', event.target.value)}
                placeholder="Descreva como a mascara altera a gameplay."
                rows="5"
              />
            </label>

            {error ? <p className="form-error">{error}</p> : null}

            <div className="form-actions">
              <button className="primary-button" type="submit">
                {editingId ? <Save size={18} /> : <Plus size={18} />}
                {editingId ? 'Salvar' : 'Adicionar'}
              </button>
              <button className="secondary-button" type="button" onClick={resetForm}>
                <RotateCcw size={18} />
                Limpar
              </button>
            </div>
          </form>

          <div className="mask-browser">
            <div className="browser-toolbar">
              <label className="search-field">
                <Search size={18} />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Buscar mascara"
                />
              </label>

              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <button className="icon-button" type="button" onClick={restoreDefaults} title="Restaurar padrao" aria-label="Restaurar padrao">
                <RotateCcw size={18} />
              </button>
            </div>

            <div className="mask-list">
              {visibleMasks.map((mask) => (
                <article className="mask-card" key={mask.id}>
                  <div>
                    <span>{mask.category}</span>
                    <h3>{mask.name}</h3>
                    <strong>{mask.power}</strong>
                    <small>Recarga: {mask.cooldown}</small>
                    <p>{mask.effect}</p>
                  </div>
                  <div className="card-actions">
                    <button
                      className="icon-button"
                      type="button"
                      onClick={() => editMask(mask)}
                      title="Editar mascara"
                      aria-label={`Editar ${mask.name}`}
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      className="icon-button danger"
                      type="button"
                      onClick={() => deleteMask(mask.id)}
                      title="Excluir mascara"
                      aria-label={`Excluir ${mask.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              ))}

              {visibleMasks.length === 0 ? (
                <p className="empty-state">Nenhuma mascara encontrada.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

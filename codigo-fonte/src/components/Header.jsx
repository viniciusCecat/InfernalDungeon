import { useState } from 'react';
import { navItems } from '../data/wikiData.js';
import { Icon } from './Icon.jsx';

export function Header({ activePage }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#inicio" onClick={() => setOpen(false)}>
        <span className="brand-mark">ID</span>
        <span>
          <strong>Infernal Dungeon</strong>
          <small>Wiki oficial</small>
        </span>
      </a>

      <button
        className="icon-button mobile-menu"
        type="button"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        title={open ? 'Fechar menu' : 'Abrir menu'}
        onClick={() => setOpen((current) => !current)}
      >
        <Icon name={open ? 'close' : 'menu'} size={20} />
      </button>

      <nav className={open ? 'nav-list nav-list-open' : 'nav-list'}>
        {navItems.map((item) => (
          <a
            className={activePage === item.href.replace('#', '') ? 'active' : ''}
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

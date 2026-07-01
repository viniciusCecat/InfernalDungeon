import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navItems } from '../data/wikiData.js';

export function Header() {
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
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav className={open ? 'nav-list nav-list-open' : 'nav-list'}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

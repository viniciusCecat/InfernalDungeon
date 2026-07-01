import { useEffect, useMemo, useState } from 'react';
import { CharactersSection } from './components/CharactersSection.jsx';
import { AuthSection } from './components/AuthSection.jsx';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { LoreSection } from './components/LoreSection.jsx';
import { MasksSection } from './components/MasksSection.jsx';
import { NewsSection } from './components/NewsSection.jsx';
import { StoreSection } from './components/StoreSection.jsx';
import { TowersSection } from './components/TowersSection.jsx';
import { navItems } from './data/wikiData.js';

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '') || 'inicio';
  const availablePages = navItems.map((item) => item.href.replace('#', ''));
  return availablePages.includes(hash) ? hash : 'inicio';
}

export default function App() {
  const [page, setPage] = useState(getPageFromHash);

  useEffect(() => {
    function syncPage() {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    }

    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  const currentPage = useMemo(() => {
    const pages = {
      inicio: <Hero />,
      universo: <LoreSection />,
      personagens: <CharactersSection />,
      mascaras: <MasksSection />,
      torres: <TowersSection />,
      conta: <AuthSection />,
      atualizacoes: <NewsSection />,
      loja: <StoreSection />,
    };

    return pages[page] ?? pages.inicio;
  }, [page]);

  return (
    <>
      <Header activePage={page} />
      <main className="page-shell">
        {currentPage}
      </main>
      <Footer />
    </>
  );
}

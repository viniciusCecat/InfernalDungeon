import { CharactersSection } from './components/CharactersSection.jsx';
import { AuthSection } from './components/AuthSection.jsx';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { LoreSection } from './components/LoreSection.jsx';
import { NewsSection } from './components/NewsSection.jsx';
import { StoreSection } from './components/StoreSection.jsx';
import { TowersSection } from './components/TowersSection.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LoreSection />
        <CharactersSection />
        <TowersSection />
        <AuthSection />
        <NewsSection />
        <StoreSection />
      </main>
      <Footer />
    </>
  );
}

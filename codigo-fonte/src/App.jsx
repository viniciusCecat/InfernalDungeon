import { CharactersSection } from './components/CharactersSection.jsx';
import { Footer } from './components/Footer.jsx';
import { Header } from './components/Header.jsx';
import { Hero } from './components/Hero.jsx';
import { LoreSection } from './components/LoreSection.jsx';
import { MaskEditor } from './components/MaskEditor.jsx';
import { NewsSection } from './components/NewsSection.jsx';
import { StoreSection } from './components/StoreSection.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LoreSection />
        <CharactersSection />
        <MaskEditor />
        <NewsSection />
        <StoreSection />
      </main>
      <Footer />
    </>
  );
}

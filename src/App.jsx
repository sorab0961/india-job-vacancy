import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import ResumeForm from './components/ResumeForm';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import useTheme from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen theme-transition" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero isDark={isDark} />
        <WhyChooseUs isDark={isDark} />
        <ResumeForm isDark={isDark} />
        <TrustSection isDark={isDark} />
      </main>
      <Footer isDark={isDark} />
    </div>
  );
}

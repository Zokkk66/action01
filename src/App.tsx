import HeroSection from './sections/HeroSection'
import CinematicSection from './sections/CinematicSection'
import MetricsSection from './sections/MetricsSection'
import TechnologySection from './sections/TechnologySection'
import ArchitectureSection from './sections/ArchitectureSection'
import FooterSection from './sections/FooterSection'

function App() {
  return (
    <div style={{ fontFamily: '"Space Mono", monospace' }}>
      <HeroSection />
      <CinematicSection />
      <MetricsSection />
      <TechnologySection />
      <ArchitectureSection />
      <FooterSection />
    </div>
  )
}

export default App

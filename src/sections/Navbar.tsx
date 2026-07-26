import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SynapseXLogo from '../components/SynapseXLogo';
import SquashHamburger from '../components/SquashHamburger';
import ScrambleText from '../components/ScrambleText';

interface NavbarProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverAbout, setHoverAbout] = useState(false);
  const [hoverMetrics, setHoverMetrics] = useState(false);
  const [hoverDownload, setHoverDownload] = useState(false);

  const scrollTo = (section: number) => {
    window.scrollTo({ top: window.innerHeight * section, behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between px-4 sm:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* 左侧容器 */}
      <div className="flex gap-2">
        {/* Logo pill */}
        <motion.div
          className={`hidden h-12 items-center gap-2.5 rounded-[14px] bg-white/15 px-5 backdrop-blur-md md:flex ${menuOpen ? 'sm:hidden' : ''}`}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
          whileTap={{ scale: 0.98 }}
          animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? 0 : 'auto' }}
        >
          <SynapseXLogo size={18} />
          <span className="text-[16px] font-medium tracking-tight text-white">
            SynapseX
          </span>
        </motion.div>

        {/* Mobile logo pill (shown below sm) */}
        <motion.div
          className="flex h-9 items-center gap-2 rounded-[10px] bg-white/15 px-3.5 backdrop-blur-md sm:hidden"
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.22)' }}
          whileTap={{ scale: 0.98 }}
          animate={{ opacity: menuOpen ? 0 : 1, width: menuOpen ? 0 : 'auto' }}
        >
          <SynapseXLogo size={14} />
          <span className="text-[13px] font-medium tracking-tight text-white">
            SynapseX
          </span>
        </motion.div>

        {/* Expanding menu pill (desktop) */}
        <motion.div
          className="hidden h-12 items-center rounded-[14px] bg-white/15 backdrop-blur-md sm:flex"
          animate={{ width: menuOpen ? 290 : 48 }}
          transition={{ stiffness: 350, damping: 28, type: 'spring' }}
        >
          <SquashHamburger
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex-shrink-0 items-center justify-center ${
              menuOpen
                ? 'ml-1.5 h-9 w-9 rounded-[11px] bg-white/10 hover:bg-white/20'
                : 'h-12 w-12 rounded-[14px]'
            }`}
          />
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="flex gap-6 px-4"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
              >
                <button
                  onClick={() => scrollTo(1)}
                  onMouseEnter={() => setHoverAbout(true)}
                  onMouseLeave={() => setHoverAbout(false)}
                  className="text-[16px] font-normal text-white/85 hover:text-white"
                >
                  <ScrambleText text="About" isHovered={hoverAbout} />
                </button>
                <button
                  onClick={() => scrollTo(2)}
                  onMouseEnter={() => setHoverMetrics(true)}
                  onMouseLeave={() => setHoverMetrics(false)}
                  className="text-[16px] font-normal text-white/85 hover:text-white"
                >
                  <ScrambleText text="Metrics" isHovered={hoverMetrics} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Expanding menu pill (mobile) */}
        <motion.div
          className="flex h-9 items-center rounded-[10px] bg-white/15 backdrop-blur-md sm:hidden"
          animate={{ width: menuOpen ? 'calc(100vw - 140px)' : 40 }}
          transition={{ stiffness: 350, damping: 28, type: 'spring' }}
        >
          <SquashHamburger
            isOpen={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`flex h-9 w-10 flex-shrink-0 items-center justify-center ${
              menuOpen ? 'ml-0.5 h-7 w-7 rounded-[8px] bg-white/10' : ''
            }`}
          />
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="flex gap-4 px-3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <button
                  onClick={() => scrollTo(1)}
                  onMouseEnter={() => setHoverAbout(true)}
                  onMouseLeave={() => setHoverAbout(false)}
                  className="text-[13px] font-normal text-white/85 hover:text-white"
                >
                  <ScrambleText text="About" isHovered={hoverAbout} />
                </button>
                <button
                  onClick={() => scrollTo(2)}
                  onMouseEnter={() => setHoverMetrics(true)}
                  onMouseLeave={() => setHoverMetrics(false)}
                  className="text-[13px] font-normal text-white/85 hover:text-white"
                >
                  <ScrambleText text="Metrics" isHovered={hoverMetrics} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 右侧下载按钮 */}
      {/* Desktop */}
      <motion.button
        className="hidden h-12 items-center gap-2 rounded-full bg-white px-6 text-black sm:flex"
        whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
        whileTap={{ scale: 0.97 }}
        onMouseEnter={() => setHoverDownload(true)}
        onMouseLeave={() => setHoverDownload(false)}
      >
        <i className="bi bi-apple text-base" />
        <ScrambleText
          text="Download"
          isHovered={hoverDownload}
          className="text-[16px] font-medium"
        />
      </motion.button>

      {/* Mobile */}
      <motion.button
        className="flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-black sm:hidden"
        whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
        whileTap={{ scale: 0.97 }}
      >
        <i className="bi bi-apple text-xs" />
        <span className="text-[13px] font-medium">Download</span>
      </motion.button>
    </motion.nav>
  );
}

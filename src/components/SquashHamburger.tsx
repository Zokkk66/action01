import { motion } from 'framer-motion';

interface SquashHamburgerProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  barWidth?: number;
  barHeight?: number;
}

export default function SquashHamburger({
  isOpen,
  onClick,
  className,
  barWidth = 18,
  barHeight = 1.5,
}: SquashHamburgerProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex items-center justify-center ${className ?? ''}`}
      whileTap={{ scale: 0.92 }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* 上方横条 */}
        <motion.span
          className="absolute block bg-white"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 0 : -barHeight * 2.67,
          }}
          transition={{ stiffness: 300, damping: 20 }}
          style={{
            width: `${barWidth}px`,
            height: `${barHeight}px`,
            transformOrigin: 'center',
          }}
        />
        {/* 中间横条 */}
        <motion.span
          className="absolute block bg-white"
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          transition={{ stiffness: 300, damping: 20 }}
          style={{
            width: `${barWidth}px`,
            height: `${barHeight}px`,
          }}
        />
        {/* 下方横条 */}
        <motion.span
          className="absolute block bg-white"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? 0 : barHeight * 2.67,
          }}
          transition={{ stiffness: 300, damping: 20 }}
          style={{
            width: `${barWidth}px`,
            height: `${barHeight}px`,
            transformOrigin: 'center',
          }}
        />
      </div>
    </motion.button>
  );
}

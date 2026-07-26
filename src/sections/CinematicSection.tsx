import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4';

export default function CinematicSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(smoothProgress, [0.3, 0.6], [60, -120]);
  const opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const transform = useMotionTemplate`rotateX(24deg) translateY(${yScaleValue}px) translateZ(15px)`;

  const text =
    'A neural-AI interface built on the architecture of the human nervous system. SynapseX translates synaptic activity into computational intelligence. Every signal becomes measurable, structured, and visible. It continuously reconstructs internal state as a dynamic neural map. Biological noise is filtered into actionable cognitive patterns.';

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen h-[100dvh] items-center justify-center overflow-hidden"
    >
      {/* 视频背景 */}
      <video
        src={VIDEO_URL}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* 顶部渐变覆盖层 */}
      <div
        className="absolute top-0 left-0 z-10 h-[180px] w-full"
        style={{
          background: 'linear-gradient(#010103, transparent)',
        }}
      />

      {/* 3D 透视文本 */}
      <motion.div
        className="relative z-20 max-w-5xl px-6 text-center sm:px-12"
        style={{
          perspective: 400,
          opacity,
        }}
      >
        <motion.p
          className="select-none text-[22px] leading-[1.35] tracking-[-0.02em] text-white sm:text-[30px] md:text-[36px] lg:text-[42px]"
          style={{ transform }}
        >
          {text}
        </motion.p>
      </motion.div>
    </section>
  );
}

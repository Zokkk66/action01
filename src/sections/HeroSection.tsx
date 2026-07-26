import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ScrambleIn from '../components/ScrambleIn';
import Navbar from './Navbar';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entranceComplete, setEntranceComplete] = useState(false);

  // 入场动画：800ms 后触发
  useEffect(() => {
    const timer = setTimeout(() => setEntranceComplete(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // 鼠标拖拽控制视频进度（delta-based）
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let prevX = 0;
    let initialized = false;
    let seeking = false;
    let pendingTime = 0;
    let videoReady = false;
    const SENSITIVITY = 0.8;

    const handleMouseMove = (e: MouseEvent) => {
      if (!videoReady || !Number.isFinite(video.duration)) return;

      if (!initialized) {
        prevX = e.clientX;
        initialized = true;
        return;
      }

      const deltaX = e.clientX - prevX;
      prevX = e.clientX;

      if (deltaX === 0) return;

      // delta 映射到视频时间偏移
      const deltaTime = (deltaX / window.innerWidth) * video.duration * SENSITIVITY;
      const newTime = Math.max(0, Math.min(video.duration, video.currentTime + deltaTime));

      if (!seeking) {
        seeking = true;
        video.currentTime = newTime;
      } else {
        pendingTime = newTime;
      }
    };

    const handleSeeked = () => {
      seeking = false;
      if (pendingTime !== 0 && videoReady) {
        seeking = true;
        video.currentTime = pendingTime;
        pendingTime = 0;
      }
    };

    const handleLoaded = () => {
      videoReady = true;
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 如果视频已经缓存好了
    if (video.readyState >= 1) {
      handleLoaded();
    }

    return () => {
      videoReady = false;
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen h-[100dvh] overflow-hidden">
      {/* 视频背景 */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="auto"
      />

      {/* 点阵网格覆盖层 */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.05,
        }}
      />

      {/* 背景水印文字 "TRANSCENDENCE" */}
      <div className="pointer-events-none absolute inset-0 z-[4] flex items-center justify-center">
        <span
          className="font-anton absolute uppercase leading-none tracking-[-4px] text-[clamp(120px,30vw,521px)]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            opacity: 0.1,
            marginTop: '50px',
          }}
        >
          TRANSCENDENCE
        </span>
      </div>

      {/* 内容 */}
      <motion.div
        className="relative z-10 flex h-full flex-col px-4 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-12 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {/* 弹性间距 */}
        <div className="flex-1" />

        {/* 底部行 */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          {/* 左列 */}
          <div className="flex flex-col gap-4">
            <h1 className="text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white">
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>
            <motion.p
              className="max-w-sm text-[13px] leading-relaxed text-white/60 sm:text-[15px]"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: entranceComplete ? 1 : 0, y: entranceComplete ? 0 : 25 }}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0], delay: 0.2 }}
            >
              Built at the intersection of neuroscience and artificial intelligence.
              SynapseX continuously maps neural pathways, cognitive load, and
              physiological states into a single adaptive intelligence layer.
            </motion.p>
          </div>

          {/* 右列 */}
          <h1 className="text-left text-[clamp(40px,10vw,100px)] font-light leading-[0.95] tracking-[-0.03em] text-white md:text-right">
            <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
            <br />
            <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
          </h1>
        </div>
      </motion.div>

      {/* 导航栏 */}
      <Navbar visible={entranceComplete} />
    </section>
  );
}

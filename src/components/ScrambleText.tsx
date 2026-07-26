import { useEffect, useState, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

interface ScrambleTextProps {
  text: string;
  isHovered: boolean;
  className?: string;
}

export default function ScrambleText({ text, isHovered, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const wasHovered = useRef(false);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isHovered) {
      wasHovered.current = true;
      const len = text.length;
      let cursor = 0;
      const interval = setInterval(() => {
        let result = '';
        for (let i = 0; i < len; i++) {
          if (text[i] === ' ') {
            result += ' ';
          } else if (i < cursor) {
            result += text[i];
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        setDisplay(result);
        cursor += 4;
        if (cursor >= len) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 25);
      intervalRef.current = interval;
    } else if (wasHovered.current) {
      setDisplay(text);
      wasHovered.current = false;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered, text]);

  return <span className={className}>{display}</span>;
}

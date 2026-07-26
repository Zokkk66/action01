import { useEffect, useState, useRef } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?><';

interface ScrambleInProps {
  text: string;
  delay: number;
  triggered: boolean;
}

export default function ScrambleIn({ text, delay, triggered }: ScrambleInProps) {
  const [display, setDisplay] = useState('');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cursorRef = useRef(0);

  useEffect(() => {
    if (!triggered) {
      setDisplay('');
      return;
    }

    cursorRef.current = 0;
    const startTimeout = setTimeout(() => {
      const len = text.length;
      const interval = setInterval(() => {
        cursorRef.current += 0.5;
        const cursor = Math.floor(cursorRef.current);
        let result = '';
        for (let i = 0; i < len; i++) {
          if (text[i] === ' ') {
            result += ' ';
          } else if (i < cursor) {
            result += text[i];
          } else if (i <= cursor + 3) {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          } else {
            break;
          }
        }
        setDisplay(result);
        if (cursor >= len) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 25);
      intervalRef.current = interval;
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay, triggered]);

  if (!triggered) return <span>&nbsp;</span>;
  return <span>{display || '\u00A0'}</span>;
}

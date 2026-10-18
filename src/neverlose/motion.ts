import { useRef, useEffect, useState } from 'react';

export function useMotion(target: number, speed: number = 16, initial?: number): number {
  const valueRef = useRef(initial ?? target);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const diff = target - valueRef.current;
      if (Math.abs(diff) > 0.0005) {
        valueRef.current += diff * (1 - Math.exp(-speed * deltaTime));
        forceUpdate({});
        animationFrame = requestAnimationFrame(animate);
      } else {
        valueRef.current = target;
        forceUpdate({});
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, speed]);

  return valueRef.current;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function mixColors(colorA: string, colorB: string, t: number): string {
  const parseRgba = (color: string) => {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1
      };
    }
    return { r: 0, g: 0, b: 0, a: 1 };
  };

  const ca = parseRgba(colorA);
  const cb = parseRgba(colorB);

  const r = Math.round(lerp(ca.r, cb.r, t));
  const g = Math.round(lerp(ca.g, cb.g, t));
  const b = Math.round(lerp(ca.b, cb.b, t));
  const alpha = lerp(ca.a, cb.a, t);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

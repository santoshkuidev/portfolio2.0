import { useState, useEffect, RefObject } from 'react';

interface TiltOptions {
  max?: number;
  scale?: number;
  speed?: number;
  perspective?: number;
  easing?: string;
}

interface TiltValues {
  transform: string;
  transition: string;
}

export default function use3DTilt(
  ref: RefObject<HTMLElement | null>,
  options: TiltOptions = {}
): TiltValues {
  const {
    max = 15,
    scale = 1.05,
    speed = 1000,
    perspective = 1000,
    easing = 'cubic-bezier(.03,.98,.52,.99)'
  } = options;

  const [tiltValues, setTiltValues] = useState<TiltValues>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: `transform ${speed}ms ${easing}`
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const centerX = rect.left + width / 2;
      const centerY = rect.top + height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateX = max * mouseY / (height / 2) * -1;
      const rotateY = max * mouseX / (width / 2);

      setTiltValues({
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
        transition: `transform ${speed}ms ${easing}`
      });
    };

    const handleMouseLeave = () => {
      setTiltValues({
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: `transform ${speed}ms ${easing}`
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, max, scale, speed, perspective, easing]);

  return tiltValues;
}

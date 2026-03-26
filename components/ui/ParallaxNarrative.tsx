'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxNarrativeProps {
  children: ReactNode;
  baseVelocity?: number;
}

export function ParallaxNarrative({ children, baseVelocity = 0.5 }: ParallaxNarrativeProps) {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollXProgress, [0, 1], ["0%", `${baseVelocity * 100}%`]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ x }} className="w-full h-full">
        {children}
      </motion.div>
    </div>
  );
}

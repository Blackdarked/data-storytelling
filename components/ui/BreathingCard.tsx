'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BreathingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'gold' | 'chlorophyll' | 'biolume';
}

export function BreathingCard({ children, className = '', glowColor = 'chlorophyll' }: BreathingCardProps) {
  const glowClasses = {
    gold: 'glow-gold border-gold/20',
    chlorophyll: 'glow-chlorophyll border-chlorophyll/20',
    biolume: 'glow-biolume border-biolume/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      animate={{
        scale: [1, 1.01, 1],
      }}
      transition={{
        scale: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: { duration: 0.5 },
        y: { duration: 0.5 }
      }}
      className={`glass rounded-3xl p-8 relative overflow-hidden ${glowClasses[glowColor]} ${className}`}
    >
      {/* Subtle organic light sweep */}
      <motion.div
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

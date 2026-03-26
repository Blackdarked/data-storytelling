'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HorizontalJourneyProps {
  children: ReactNode;
}

export function HorizontalJourney({ children }: HorizontalJourneyProps) {
  return (
    <div className="story-journey">
      {children}
    </div>
  );
}

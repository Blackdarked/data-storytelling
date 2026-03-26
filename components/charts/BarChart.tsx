'use client';

import * as Plot from '@observablehq/plot';
import { useEffect, useRef } from 'react';

interface BarChartProps {
  data: Record<string, unknown>[];
  xField: string;
  yField: string;
  colorField?: string;
  title?: string;
}

export function BarChart({ data, xField, yField, colorField, title }: BarChartProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !data?.length) return;

    const chart = Plot.plot({
      title,
      marginLeft: 60,
      marginBottom: 50,
      style: { fontFamily: 'inherit', background: 'transparent' },
      x: { label: xField, tickRotate: -30 },
      y: { label: yField, grid: true },
      color: colorField ? { legend: true } : undefined,
      marks: [
        Plot.barY(data, {
          x: xField,
          y: yField,
          fill: colorField ?? '#6366f1',
          tip: true,
        }),
        Plot.ruleY([0]),
      ],
    });

    ref.current.replaceChildren(chart);
    return () => chart.remove();
  }, [data, xField, yField, colorField, title]);

  return <div ref={ref} className="w-full overflow-x-auto" />;
}

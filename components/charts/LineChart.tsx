'use client';

import * as Plot from '@observablehq/plot';
import { useEffect, useRef } from 'react';

interface LineChartProps {
  data: Record<string, unknown>[];
  xField: string;
  yField: string;
  colorField?: string;
  title?: string;
}

export function LineChart({ data, xField, yField, colorField, title }: LineChartProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !data?.length) return;

    const chart = Plot.plot({
      title,
      marginLeft: 60,
      marginBottom: 50,
      style: { fontFamily: 'inherit', background: 'transparent' },
      x: { label: xField },
      y: { label: yField, grid: true },
      color: colorField ? { legend: true } : undefined,
      marks: [
        Plot.lineY(data, {
          x: xField,
          y: yField,
          stroke: colorField ?? '#6366f1',
          strokeWidth: 2,
          tip: true,
        }),
        Plot.dot(data, {
          x: xField,
          y: yField,
          fill: colorField ?? '#6366f1',
          r: 3,
        }),
      ],
    });

    ref.current.replaceChildren(chart);
    return () => chart.remove();
  }, [data, xField, yField, colorField, title]);

  return <div ref={ref} className="w-full overflow-x-auto" />;
}

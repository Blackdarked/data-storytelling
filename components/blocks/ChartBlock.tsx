'use client';

import { useEffect, useState } from 'react';
import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { ScatterPlot } from '@/components/charts/ScatterPlot';

interface DataSource {
  inline?: string;
  url?: string;
}

interface ChartBlockProps {
  chartType: 'bar' | 'line' | 'area' | 'scatter' | 'pie';
  title?: string;
  caption?: string;
  dataSource?: DataSource;
  xField: string;
  yField: string;
  colorField?: string;
}

async function loadData(dataSource: DataSource): Promise<Record<string, unknown>[]> {
  if (dataSource.inline) {
    try {
      return JSON.parse(dataSource.inline);
    } catch {
      console.error('Invalid inline JSON in ChartBlock');
      return [];
    }
  }
  if (dataSource.url) {
    const res = await fetch(dataSource.url);
    const text = await res.text();
    // Simple CSV parser for flat rows
    if (dataSource.url.endsWith('.csv')) {
      const lines = text.trim().split('\n');
      const headers = lines[0].split(',').map((h) => h.trim());
      return lines.slice(1).map((line) => {
        const values = line.split(',');
        return Object.fromEntries(headers.map((h, i) => [h, isNaN(Number(values[i])) ? values[i]?.trim() : Number(values[i])]));
      });
    }
    return res.json();
  }
  return [];
}

export function ChartBlock({ chartType, title, caption, dataSource, xField, yField, colorField }: ChartBlockProps) {
  const [data, setData] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dataSource) { setLoading(false); return; }
    loadData(dataSource)
      .then(setData)
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, [dataSource]);

  const chartProps = { data, xField, yField, colorField, title };

  return (
    <figure className="my-8 rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl transition-all hover:bg-white/10">
      {title && <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-chlorophyll pl-4">{title}</h3>}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-gray-500 animate-pulse">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-chlorophyll border-t-transparent rounded-full animate-spin" />
            <span className="data-label text-[10px]">Đang tải dữ liệu biểu đồ…</span>
          </div>
        </div>
      ) : data.length === 0 ? (
        <div className="flex items-center justify-center h-48 text-gray-500 border border-dashed border-white/10 rounded-lg">
          Không có dữ liệu khả dụng
        </div>
      ) : (
        <div className="w-full overflow-hidden">
          {(() => {
            switch (chartType) {
              case 'bar': return <BarChart {...chartProps} />;
              case 'line':
              case 'area': return <LineChart {...chartProps} />;
              case 'scatter': return <ScatterPlot {...chartProps} />;
              default: return <div className="text-red-400">Loại biểu đồ không được hỗ trợ: {chartType}</div>;
            }
          })()}
        </div>
      )}
      {caption && <figcaption className="mt-4 text-xs text-gray-400 text-center italic opacity-70">
        [ {caption} ]
      </figcaption>}
    </figure>
  );
}

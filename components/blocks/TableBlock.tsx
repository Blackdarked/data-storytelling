interface TableBlockProps {
  title?: string;
  caption?: string;
  headers?: string[];
  tableData?: string;
}

export function TableBlock({ title, caption, headers, tableData }: TableBlockProps) {
  let rows: string[][] = [];
  try {
    if (tableData) rows = JSON.parse(tableData);
  } catch {
    console.error('Invalid tableData JSON in TableBlock');
  }

  return (
    <div className="my-8">
      {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left">
          {headers && headers.length > 0 && (
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors even:bg-gray-50/50 dark:even:bg-gray-900/50">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-3 text-gray-700 dark:text-gray-300">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">{caption}</p>}
    </div>
  );
}

interface CalloutBlockProps {
  value?: string;
  label?: string;
  description?: string;
  variant?: 'stat' | 'quote' | 'highlight';
}

export function CalloutBlock({ value, label, description, variant = 'stat' }: CalloutBlockProps) {
  if (variant === 'quote') {
    return (
      <blockquote className="my-8 border-l-4 border-indigo-500 pl-6 py-2">
        <p className="text-2xl font-medium italic text-gray-800 dark:text-gray-200">"{value}"</p>
        {label && <cite className="mt-2 block text-sm text-gray-500 dark:text-gray-400 not-italic">— {label}</cite>}
      </blockquote>
    );
  }

  return (
    <div className={`my-8 p-8 rounded-2xl text-center ${variant === 'highlight'
      ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800'
      : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
    }`}>
      {value && (
        <div className={`text-5xl font-black mb-2 ${variant === 'highlight' ? 'text-indigo-600 dark:text-indigo-400' : 'text-white'}`}>
          {value}
        </div>
      )}
      {label && (
        <div className={`text-sm font-semibold uppercase tracking-widest mb-2 ${variant === 'highlight' ? 'text-gray-600 dark:text-gray-400' : 'text-white/80'}`}>
          {label}
        </div>
      )}
      {description && (
        <p className={`text-sm max-w-md mx-auto ${variant === 'highlight' ? 'text-gray-600 dark:text-gray-400' : 'text-white/70'}`}>
          {description}
        </p>
      )}
    </div>
  );
}

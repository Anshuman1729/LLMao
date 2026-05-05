'use client';

interface Category {
  id: string;
  label: string;
  emoji: string;
}

const CATEGORIES: Category[] = [
  { id: 'fashion', label: 'Fashion', emoji: '👗' },
  { id: 'home-decor', label: 'Home Decor', emoji: '🛋️' },
  { id: 'makeup', label: 'Make-up', emoji: '💄' },
  { id: 'electronics', label: 'Electronics', emoji: '🔌' },
  { id: 'stationary', label: 'Stationary', emoji: '✏️' },
  { id: 'others', label: 'Others', emoji: '💬' },
];

interface CategoryPickerProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function CategoryPicker({ selected, onSelect }: CategoryPickerProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 bg-white transition-all duration-200 ${
              selected === cat.id
                ? 'border-pink-500 shadow-md shadow-pink-100'
                : 'border-gray-100 hover:border-pink-200'
            }`}
          >
            <span className="text-4xl">{cat.emoji}</span>
            <span className="text-sm font-medium text-gray-700">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export { CATEGORIES };
export type { Category };

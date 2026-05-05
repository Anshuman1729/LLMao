interface BadgeProps {
  label: string;
  variant?: 'pink' | 'purple' | 'green' | 'blue' | 'orange';
}

const variantClasses = {
  pink: 'bg-pink-100 text-pink-700',
  purple: 'bg-purple-100 text-purple-700',
  green: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  orange: 'bg-orange-100 text-orange-700',
};

export function Badge({ label, variant = 'pink' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {label}
    </span>
  );
}

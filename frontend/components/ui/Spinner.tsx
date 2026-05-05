export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div className={`${sizeMap[size]} border-3 border-pink-200 border-t-pink-500 rounded-full animate-spin`} />
  );
}

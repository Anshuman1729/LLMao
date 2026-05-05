'use client';

import { useRouter } from 'next/navigation';

type Tab = 'home' | 'performance' | 'payments' | 'help';

interface BottomNavProps {
  active: Tab;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#FF2D7B' : '#6B7280'}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function BarChartIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#FF2D7B' : '#6B7280'}>
      <path d="M5 9h3v11H5V9zm6-5h3v16h-3V4zm6 8h3v8h-3v-8z" />
    </svg>
  );
}

function PaymentsIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#FF2D7B' : '#6B7280'}>
      <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </svg>
  );
}

function HelpIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#FF2D7B' : '#6B7280'}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
  );
}

const TABS: Array<{ id: Tab; label: string; Icon: React.FC<{ active: boolean }> }> = [
  { id: 'home', label: 'Home', Icon: HomeIcon },
  { id: 'performance', label: 'Performance', Icon: BarChartIcon },
  { id: 'payments', label: 'Payments', Icon: PaymentsIcon },
  { id: 'help', label: 'Help', Icon: HelpIcon },
];

export function BottomNav({ active }: BottomNavProps) {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0F0F23] border-t border-white/10 flex items-center z-20">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => id === 'home' && router.push('/for-you')}
            className="flex-1 flex flex-col items-center gap-1 py-3"
          >
            <Icon active={isActive} />
            <span className={`text-[10px] font-medium ${isActive ? 'text-[#FF2D7B]' : 'text-gray-500'}`}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

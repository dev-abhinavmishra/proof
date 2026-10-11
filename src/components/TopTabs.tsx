import { cn } from '../lib/utils';
import type { RouteState } from '../App';
import { HelpCircle, Sigma } from 'lucide-react';

export type ViewKey =
  | 'library'
  | 'session'
  | 'attempt'
  | 'compare'
  | 'ledger'
  | 'progress'
  | 'import'
  | 'settings';

const TABS: { key: ViewKey; label: string; kbd: string }[] = [
  { key: 'library', label: 'Library', kbd: 'L' },
  { key: 'session', label: 'Session', kbd: 'S' },
  { key: 'ledger', label: 'Error ledger', kbd: 'E' },
  { key: 'progress', label: 'Progress', kbd: 'P' },
  { key: 'import', label: 'Import', kbd: 'I' },
];

export function TopTabs({
  route,
  goView,
  due,
  onHelp,
}: {
  route: RouteState;
  goView: (v: ViewKey) => void;
  due: number;
  onHelp: () => void;
}) {
  return (
    <header className="no-print flex items-end justify-between px-5 pt-3" role="banner">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5 pb-1">
          <span className="flex h-7 w-7 items-center justify-center rounded bg-[var(--color-paper)] text-[var(--color-bench)]">
            <Sigma size={16} strokeWidth={2.4} />
          </span>
          <span className="serif text-[19px] font-semibold tracking-wide text-[var(--color-paper)]">
            Proof
          </span>
          <span className="mono mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[rgb(244_242_234/0.4)]">
            calculation workbench
          </span>
        </div>
        <nav className="flex items-end gap-0.5" aria-label="Views">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={cn('dtab', (route.view === t.key || (route.view === 'attempt' && t.key === 'session') || (route.view === 'compare' && t.key === 'session')) && 'dtab--on')}
              onClick={() => goView(t.key)}
              aria-current={route.view === t.key ? 'page' : undefined}
            >
              {t.label}
              {t.key === 'session' && due > 0 && (
                <span className="ml-1.5 rounded-full border border-[rgb(var(--correct-rgb)/0.6)] px-1.5 text-[9px] text-[rgb(244_242_234/0.75)] dtab--on:text-[var(--color-correct-deep)]">
                  {due}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-1 pb-1">
        <button className="dtab" onClick={() => goView('settings')} aria-current={route.view === 'settings' ? 'page' : undefined}>
          Settings
        </button>
        <button className="xbtn text-[rgb(244_242_234/0.6)] hover:text-[var(--color-paper)]" onClick={onHelp} aria-label="Keyboard shortcuts" title="Keyboard shortcuts (?)">
          <HelpCircle size={16} />
        </button>
      </div>
    </header>
  );
}

import React from 'react';
import { Printer } from 'lucide-react';

export type ActiveView = 'assessment' | 'timeline' | 'docket';

interface TopBarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
  docketCount: number;
  onPrint: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  onNavigate,
  docketCount,
  onPrint,
}) => {
  return (
    <header className="no-print border-b border-[#E2DDD3] bg-[#FBF9F5]/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('assessment')}
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D] rounded-sm"
        >
          Sarawak Probate Registry
        </button>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            type="button"
            onClick={() => onNavigate('assessment')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeView === 'assessment'
                ? 'text-[#14532D] border-[#14532D]'
                : 'text-[#57534E] border-transparent hover:text-[#1C1917]'
            }`}
          >
            Assessment
          </button>
          <button
            type="button"
            onClick={() => onNavigate('timeline')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeView === 'timeline'
                ? 'text-[#14532D] border-[#14532D]'
                : 'text-[#57534E] border-transparent hover:text-[#1C1917]'
            }`}
          >
            Statutory Schedules
          </button>
          <button
            type="button"
            onClick={() => onNavigate('docket')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              activeView === 'docket'
                ? 'text-[#14532D] border-[#14532D]'
                : 'text-[#57534E] border-transparent hover:text-[#1C1917]'
            }`}
          >
            Saved Docket ({docketCount})
          </button>
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-md transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#14532D]"
          >
            <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Print Broadsheet</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="md:hidden border-t border-[#E2DDD3] px-6 py-2 flex items-center gap-5 overflow-x-auto text-xs font-medium">
        <button
          type="button"
          onClick={() => onNavigate('assessment')}
          className={`whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeView === 'assessment'
              ? 'text-[#14532D] border-[#14532D]'
              : 'text-[#57534E] border-transparent'
          }`}
        >
          Assessment
        </button>
        <button
          type="button"
          onClick={() => onNavigate('timeline')}
          className={`whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeView === 'timeline'
              ? 'text-[#14532D] border-[#14532D]'
              : 'text-[#57534E] border-transparent'
          }`}
        >
          Statutory Schedules
        </button>
        <button
          type="button"
          onClick={() => onNavigate('docket')}
          className={`whitespace-nowrap shrink-0 py-1 border-b-2 ${
            activeView === 'docket'
              ? 'text-[#14532D] border-[#14532D]'
              : 'text-[#57534E] border-transparent'
          }`}
        >
          Saved Docket ({docketCount})
        </button>
      </div>
    </header>
  );
};

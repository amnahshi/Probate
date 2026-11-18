import React from 'react';
import { RotateCcw, BookmarkPlus } from 'lucide-react';
import {
  AssessmentInput,
  EraDefinition,
  InterestTierMethod,
  StatuteId,
} from '../types/assessment';

interface AssessmentFormProps {
  input: AssessmentInput;
  onChange: (next: AssessmentInput) => void;
  overlappingStatutes: EraDefinition[];
  activeEra: EraDefinition;
  showInterestMethodToggle: boolean;
  onSaveToDocket: () => void;
  onReset: () => void;
  saveFeedback: string | null;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({
  input,
  onChange,
  overlappingStatutes,
  activeEra,
  showInterestMethodToggle,
  onSaveToDocket,
  onReset,
  saveFeedback,
}) => {
  const domicileMode = !input.domicileSpecified
    ? 'unspecified'
    : input.domicile === 'malaysian'
    ? 'malaysian'
    : 'non_malaysian';

  const setDomicileMode = (mode: 'unspecified' | 'non_malaysian' | 'malaysian') => {
    if (mode === 'unspecified') {
      onChange({ ...input, domicile: 'non_malaysian', domicileSpecified: false });
    } else if (mode === 'non_malaysian') {
      onChange({ ...input, domicile: 'non_malaysian', domicileSpecified: true });
    } else {
      onChange({ ...input, domicile: 'malaysian', domicileSpecified: true });
    }
  };

  return (
    <aside className="no-print bg-white border border-[#E2DDD3] rounded-lg p-6">
      <div className="pb-4 border-b border-[#E2DDD3]">
        <p className="text-xs font-medium tracking-wider uppercase text-[#78716C]">
          Case Particulars
        </p>
        <h2 className="font-serif text-2xl font-semibold text-[#1C1917] mt-1">
          Estate Assessment Input
        </h2>
      </div>

      <div className="mt-6 space-y-5">
        {/* Dates Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="date-of-death"
              className="block text-xs font-medium text-[#57534E] mb-1.5"
            >
              Date of Death
            </label>
            <input
              id="date-of-death"
              type="date"
              min="1933-11-01"
              max="2099-12-31"
              value={input.dateOfDeath}
              onChange={(e) =>
                onChange({
                  ...input,
                  dateOfDeath: e.target.value,
                  statuteOverride: undefined,
                })
              }
              className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-white border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:border-[#14532D]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <label
                htmlFor="date-of-declaration"
                className="block text-xs font-medium text-[#57534E]"
              >
                Date of Declaration <span className="text-[#A8A29E]">(Optional)</span>
              </label>
              {input.dateOfDeclaration.trim() !== '' && (
                <button
                  type="button"
                  onClick={() => onChange({ ...input, dateOfDeclaration: '' })}
                  className="text-[11px] font-medium text-[#78716C] hover:text-[#1C1917] underline"
                >
                  Clear
                </button>
              )}
            </div>
            <input
              id="date-of-declaration"
              type="date"
              min="1933-11-01"
              max="2099-12-31"
              value={input.dateOfDeclaration}
              onChange={(e) =>
                onChange({ ...input, dateOfDeclaration: e.target.value })
              }
              className="w-full px-3 py-2.5 text-sm font-mono tabular-nums bg-white border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:border-[#14532D]"
            />
          </div>
        </div>

        {/* Optional Interest Period (Years) when Declaration Date is blank */}
        <div>
          <label
            htmlFor="interest-period-years"
            className="block text-xs font-medium text-[#57534E] mb-1.5"
          >
            Interest Period (Years) — if Declaration Date is blank
          </label>
          <input
            id="interest-period-years"
            type="number"
            min="0"
            step="any"
            value={
              input.interestPeriodYears === undefined ||
              input.interestPeriodYears === null ||
              Number.isNaN(input.interestPeriodYears)
                ? ''
                : input.interestPeriodYears
            }
            onChange={(e) =>
              onChange({
                ...input,
                interestPeriodYears:
                  e.target.value === '' ? null : parseFloat(e.target.value),
              })
            }
            placeholder="e.g. 2"
            className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums bg-white border border-[#D6CEBE] rounded-md text-[#1C1917] placeholder:text-[#A8A29E] focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:border-[#14532D]"
          />
          <p className="mt-1.5 text-[11px] text-[#78716C] leading-relaxed">
            {input.dateOfDeclaration.trim() !== ''
              ? 'Elapsed months and days are calculated from Date of Declaration. Clear Date of Declaration to apply manual years.'
              : 'Leave blank for RM 0.00 pending interest, or enter years (e.g. 2) to compute annual interest.'}
          </p>
        </div>

        {/* Overlapping Statute Selector (only shown for 1939–1948 overlap) */}
        {overlappingStatutes.length > 1 && (
          <div className="p-3.5 bg-[#FBF9F5] border border-[#D6CEBE] rounded-md">
            <label
              htmlFor="statute-override"
              className="block text-xs font-semibold text-[#78350F] mb-1.5"
            >
              Overlapping Historical Period — Select Ordinance
            </label>
            <select
              id="statute-override"
              value={activeEra.id}
              onChange={(e) =>
                onChange({
                  ...input,
                  statuteOverride: e.target.value as StatuteId,
                })
              }
              className="w-full px-3 py-2 text-xs bg-white border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#14532D]"
            >
              {overlappingStatutes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.statuteName} ({s.startDate} to {s.endDate ?? 'onwards'})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Gross Estate & Debt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="gross-estate"
              className="block text-xs font-medium text-[#57534E] mb-1.5"
            >
              Gross Estate (RM)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#78716C] pointer-events-none">
                RM
              </span>
              <input
                id="gross-estate"
                type="number"
                min="0"
                step="0.01"
                value={Number.isNaN(input.grossEstate) ? '' : input.grossEstate}
                onChange={(e) =>
                  onChange({
                    ...input,
                    grossEstate: e.target.value === '' ? 0 : parseFloat(e.target.value),
                  })
                }
                className="w-full pl-9 pr-3 py-2.5 text-sm font-mono tabular-nums bg-white border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:border-[#14532D]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="estate-debt"
              className="block text-xs font-medium text-[#57534E] mb-1.5"
            >
              Debt / Liabilities (RM)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#78716C] pointer-events-none">
                RM
              </span>
              <input
                id="estate-debt"
                type="number"
                min="0"
                step="0.01"
                value={Number.isNaN(input.debt) ? '' : input.debt}
                onChange={(e) =>
                  onChange({
                    ...input,
                    debt: e.target.value === '' ? 0 : parseFloat(e.target.value),
                  })
                }
                className="w-full pl-9 pr-3 py-2.5 text-sm font-mono tabular-nums bg-white border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#14532D] focus:border-[#14532D]"
              />
            </div>
          </div>
        </div>

        {/* Domicile Segmented Selector (Strictly 1 Jan 1965 – 31 Dec 1975 under Act 29/1965) */}
        {activeEra.id === 'act_29_1965' && (
          <div>
            <span className="block text-xs font-medium text-[#57534E] mb-1.5">
              Domicile of Deceased (1965–1975)
            </span>
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#F3EFE6] rounded-md border border-[#E2DDD3]">
              <button
                type="button"
                onClick={() => setDomicileMode('unspecified')}
                className={`px-2 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap truncate ${
                  domicileMode === 'unspecified'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
                title="Defaults to Sabah & Sarawak Non-Malaysian Domiciles schedule"
              >
                Unspecified
              </button>
              <button
                type="button"
                onClick={() => setDomicileMode('non_malaysian')}
                className={`px-2 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap truncate ${
                  domicileMode === 'non_malaysian'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                Non-Malaysian
              </button>
              <button
                type="button"
                onClick={() => setDomicileMode('malaysian')}
                className={`px-2 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap truncate ${
                  domicileMode === 'malaysian'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                Malaysia
              </button>
            </div>
            <p className="mt-1.5 text-[11px] text-[#78716C] leading-relaxed">
              {domicileMode === 'unspecified'
                ? 'Unspecified domicile defaults to Sabah & Sarawak Non-Malaysian Domiciles schedule (Act 29 of 1965).'
                : domicileMode === 'malaysian'
                ? 'Applies Malaysia Domiciled Deceased Persons schedule (First RM 25,000 NIL, up to 50%).'
                : 'Applies Sabah and Sarawak Non-Malaysian Domiciles schedule (First RM 10,000 NIL, up to 50%).'}
            </p>
          </div>
        )}

        {/* Act 29 / A345 Tier Interest Method (only shown when relevant) */}
        {showInterestMethodToggle && (
          <div>
            <span className="block text-xs font-medium text-[#57534E] mb-1.5">
              Act 29/1965 Interest Accrual Basis
            </span>
            <div className="grid grid-cols-2 gap-1 p-1 bg-[#F3EFE6] rounded-md border border-[#E2DDD3]">
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...input,
                    interestMethod: 'progressive_tiers' as InterestTierMethod,
                  })
                }
                className={`px-2.5 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap truncate ${
                  (input.interestMethod ?? 'progressive_tiers') === 'progressive_tiers'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                Progressive (3→6→12/6%)
              </button>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...input,
                    interestMethod: 'whole_period_tier' as InterestTierMethod,
                  })
                }
                className={`px-2.5 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap truncate ${
                  input.interestMethod === 'whole_period_tier'
                    ? 'bg-white text-[#1C1917] shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                Flat Tier Rate
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-7 pt-5 border-t border-[#E2DDD3] flex items-center gap-3">
        <button
          type="button"
          onClick={onSaveToDocket}
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-md transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#14532D]"
        >
          <BookmarkPlus className="w-4 h-4" aria-hidden="true" />
          <span>Save to Docket</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-[#57534E] hover:text-[#1C1917] bg-[#FBF9F5] hover:bg-[#F3EFE6] border border-[#D6CEBE] rounded-md transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D]"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>

      {saveFeedback && (
        <p className="mt-3 text-xs font-medium text-[#14532D]" role="status">
          {saveFeedback}
        </p>
      )}
    </aside>
  );
};

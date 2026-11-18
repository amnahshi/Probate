import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { STATUTORY_ERAS, PRESET_CASES } from '../engine/estateDutyEngine';
import { AssessmentInput, EraDefinition } from '../types/assessment';

interface StatutoryTimelineViewProps {
  onLoadPreset: (input: AssessmentInput) => void;
}

export const StatutoryTimelineView: React.FC<StatutoryTimelineViewProps> = ({
  onLoadPreset,
}) => {
  const [selectedEraId, setSelectedEraId] = useState<string>(STATUTORY_ERAS[4].id);
  const [scheduleDomicile, setScheduleDomicile] = useState<'non_malaysian' | 'malaysian'>(
    'malaysian'
  );

  const selectedEra: EraDefinition =
    STATUTORY_ERAS.find((e) => e.id === selectedEraId) ?? STATUTORY_ERAS[0];

  const handleLoadEraSample = (era: EraDefinition) => {
    const matchingPreset = PRESET_CASES.find((p) => {
      const dod = p.input.dateOfDeath;
      return dod >= era.startDate && (era.endDate === null || dod <= era.endDate);
    });
    if (matchingPreset) {
      onLoadPreset({ ...matchingPreset.input, statuteOverride: era.id });
      return;
    }

    // Generate clean midpoint sample if era has no dedicated preset
    const sampleDod = era.startDate;
    const sampleDeclYear = parseInt(era.startDate.slice(0, 4), 10) + 1;
    const sampleDecl = `${sampleDeclYear}-${era.startDate.slice(5)}`;
    onLoadPreset({
      name: '',
      dateOfDeath: sampleDod,
      dateOfDeclaration: sampleDecl,
      grossEstate: 180000,
      debt: 10000,
      domicile: scheduleDomicile,
      domicileSpecified: true,
      statuteOverride: era.id,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Chronological Index */}
      <div className="lg:col-span-5 bg-white border border-[#E2DDD3] rounded-lg divide-y divide-[#E2DDD3]">
        <div className="p-5">
          <p className="text-xs font-medium tracking-wider uppercase text-[#78716C]">
            1933 – 1992+ Legislation
          </p>
          <h2 className="font-serif text-2xl font-semibold text-[#1C1917] mt-1">
            Sarawak Estate Duty Statutes
          </h2>
        </div>

        {STATUTORY_ERAS.map((era, index) => {
          const isSelected = era.id === selectedEra.id;
          return (
            <button
              key={era.id}
              type="button"
              onClick={() => setSelectedEraId(era.id)}
              className={`w-full text-left px-5 py-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#14532D] ${
                isSelected ? 'bg-[#F3EFE6]' : 'hover:bg-[#FBF9F5]'
              }`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-xs text-[#78716C] tabular-nums">
                  {String(index + 1).padStart(2, '0')} · {era.startDate} to{' '}
                  {era.endDate ?? 'Onwards'}
                </span>
                <span className="text-xs font-medium text-[#14532D] shrink-0">
                  {era.dutyType === 'flat_slab'
                    ? 'Flat Slab'
                    : era.dutyType === 'progressive'
                    ? 'Progressive'
                    : 'Repealed'}
                </span>
              </div>
              <div className="font-serif text-lg font-semibold text-[#1C1917] mt-1">
                {era.statuteName}
              </div>
              <p className="text-xs text-[#57534E] mt-1 leading-relaxed">
                {era.summaryNote}
              </p>
            </button>
          );
        })}
      </div>

      {/* Right Statutory Rate Schedule Inspector */}
      <div className="lg:col-span-7 bg-white border border-[#E2DDD3] rounded-lg p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#D6CEBE]">
          <div>
            <p className="font-mono text-xs text-[#78716C] tabular-nums">
              Effective {selectedEra.startDate} to {selectedEra.endDate ?? 'Onwards'}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] mt-1">
              {selectedEra.statuteName}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => handleLoadEraSample(selectedEra)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            <span>Test in Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        {/* Era Rules Summary */}
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-b border-[#E2DDD3] text-sm">
          <div>
            <dt className="text-xs text-[#78716C]">Funeral Deduction</dt>
            <dd className="font-medium text-[#1C1917] mt-1">
              {selectedEra.funeralRule === 'min_2_5_pct_1000'
                ? 'MIN(2.5% × Net Value, RM 1,000)'
                : selectedEra.funeralRule === 'flat_3000'
                ? 'Flat RM 3,000.00'
                : selectedEra.funeralRule === 'withdrawn'
                ? 'RM 0.00 (Withdrawn)'
                : 'Repealed'}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#78716C]">Interest Basis</dt>
            <dd className="font-medium text-[#1C1917] mt-1">
              {selectedEra.interestRule === 'flat_12_pa'
                ? '12% per annum'
                : selectedEra.interestRule === 'act_29_tiers'
                ? 'Act 29/1965 Tiers (3% / 6% / 12%→6%)'
                : 'Repealed (RM 0.00)'}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-[#78716C]">Calculation Type</dt>
            <dd className="font-medium text-[#1C1917] mt-1">
              {selectedEra.dutyType === 'flat_slab'
                ? 'Single Flat Slab on Net Estate'
                : selectedEra.dutyType === 'progressive'
                ? 'Progressive Marginal Bands'
                : 'No Duty Payable'}
            </dd>
          </div>
        </dl>

        {/* Schedule Table */}
        {selectedEra.dutyType === 'repealed' ? (
          <div className="py-10 text-center text-sm text-[#57534E]">
            Estate duty was abolished in Malaysia (including Sarawak) for deaths occurring on or
            after 1 November 1991 pursuant to the Finance Act 1992 (Act 476).
          </div>
        ) : selectedEra.dutyType === 'flat_slab' && selectedEra.slabs ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse border border-[#D6CEBE] text-sm">
              <thead>
                <tr className="bg-[#FBF9F5]">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#57534E] border-b border-r border-[#D6CEBE]">
                    Net Estate Value Bracket
                  </th>
                  <th className="text-right px-4 py-2.5 text-xs font-semibold text-[#57534E] border-b border-[#D6CEBE]">
                    Flat Slab Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedEra.slabs.map((slab, idx) => (
                  <tr key={idx} className="border-b border-[#E2DDD3] last:border-b-0">
                    <td className="px-4 py-2 font-mono tabular-nums text-[13px] text-[#1C1917] border-r border-[#D6CEBE]">
                      {slab.label}
                    </td>
                    <td className="px-4 py-2 text-right font-mono tabular-nums text-[13px] font-medium text-[#14532D]">
                      {slab.ratePercent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-6">
            {selectedEra.id === 'act_29_1965' && (
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-medium text-[#57534E]">
                  Schedule by Domicile (1 Jan 1965 – 31 Dec 1975)
                </span>
                <div className="inline-flex p-1 bg-[#F3EFE6] border border-[#E2DDD3] rounded-md">
                  <button
                    type="button"
                    onClick={() => setScheduleDomicile('non_malaysian')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      scheduleDomicile === 'non_malaysian'
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#57534E]'
                    }`}
                  >
                    Sabah &amp; Sarawak Non-Malaysian
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleDomicile('malaysian')}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                      scheduleDomicile === 'malaysian'
                        ? 'bg-white text-[#1C1917] shadow-xs'
                        : 'text-[#57534E]'
                    }`}
                  >
                    Malaysia Domiciled
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#D6CEBE] text-sm">
                <thead>
                  <tr className="bg-[#FBF9F5]">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#57534E] border-b border-r border-[#D6CEBE]">
                      Chargeable Estate Slice
                    </th>
                    <th className="text-right px-4 py-2.5 text-xs font-semibold text-[#57534E] border-b border-[#D6CEBE]">
                      Marginal Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(selectedEra.id === 'act_29_1965' && scheduleDomicile === 'non_malaysian'
                    ? selectedEra.nonMalaysianBands ?? []
                    : selectedEra.malaysianBands ?? []
                  ).map((band, idx) => (
                    <tr key={idx} className="border-b border-[#E2DDD3] last:border-b-0">
                      <td className="px-4 py-2 font-mono tabular-nums text-[13px] text-[#1C1917] border-r border-[#D6CEBE]">
                        {band.label}
                      </td>
                      <td className="px-4 py-2 text-right font-mono tabular-nums text-[13px] font-medium text-[#14532D]">
                        {band.ratePercent === 0 ? 'NIL (0%)' : `${band.ratePercent}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

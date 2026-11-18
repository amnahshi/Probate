import React, { useState } from 'react';
import { Copy, Check, AlertCircle } from 'lucide-react';
import { AssessmentResult } from '../types/assessment';
import {
  formatDisplayDate,
  formatRM,
  generateMarkdownOutput,
} from '../engine/estateDutyEngine';

interface FormulaBroadsheetProps {
  result: AssessmentResult;
}

export const FormulaBroadsheet: React.FC<FormulaBroadsheetProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyMarkdown = async () => {
    try {
      const md = generateMarkdownOutput(result);
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  if (result.validationError) {
    return (
      <section className="bg-white border border-[#E2DDD3] rounded-lg p-8">
        <div className="flex items-start gap-3 text-[#991B1B]">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#1C1917]">
              Assessment Input Requires Attention
            </h3>
            <p className="mt-1.5 text-sm text-[#57534E] leading-relaxed">
              {result.validationError}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const deceasedName = result.input.name.trim();
  const dodFormatted = formatDisplayDate(result.input.dateOfDeath);
  const declFormatted = result.input.dateOfDeclaration.trim()
    ? formatDisplayDate(result.input.dateOfDeclaration)
    : '-';

  const mastheadDuration =
    result.interestSource === 'declaration_date'
      ? result.era.interestRule === 'flat_12_pa'
        ? `${Math.floor(result.elapsed.months / 12)} year(s)`
        : `${result.elapsed.months} mos ${result.elapsed.days} day(s)`
      : result.interestSource === 'manual_years'
      ? `${result.interestPeriodYearsUsed} year(s)`
      : 'Declaration Date Pending';

  return (
    <section className="print-broadsheet bg-white border border-[#E2DDD3] rounded-lg p-6 sm:p-8 lg:p-10">
      {/* Broadsheet Masthead */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-[#D6CEBE]">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#78716C]">
            <span>Registry of Probate, Sarawak</span>
            <span aria-hidden="true">·</span>
            <span>{result.era.shortName}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{mastheadDuration}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1C1917] mt-1.5 leading-tight text-balance">
            {deceasedName || 'Estate Duty Assessment Sheet'}
          </h1>
          {deceasedName && (
            <p className="text-xs text-[#78716C] mt-1">
              Estate Duty Statutory Assessment ·{' '}
              {result.input.domicile === 'malaysian'
                ? 'Malaysian Domicile'
                : result.input.domicileSpecified
                ? 'Non-Malaysian Domicile'
                : 'Domicile Unspecified (Non-Malaysian Default)'}
            </p>
          )}
        </div>

        <div className="no-print flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1C1917] bg-[#FBF9F5] hover:bg-[#F3EFE6] border border-[#D6CEBE] rounded-md transition-colors whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14532D]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#14532D]" aria-hidden="true" />
                <span className="text-[#14532D]">Copied Markdown</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#57534E]" aria-hidden="true" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Table 1: Case & Statutory Particulars */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-[#D6CEBE] text-sm">
          <thead>
            <tr className="bg-[#FBF9F5]">
              <th
                scope="col"
                className="text-left px-4 py-2.5 text-xs font-semibold tracking-wide text-[#57534E] border-b border-r border-[#D6CEBE] w-[42%]"
              >
                Field
              </th>
              <th
                scope="col"
                className="text-left px-4 py-2.5 text-xs font-semibold tracking-wide text-[#57534E] border-b border-[#D6CEBE]"
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#E2DDD3]">
              <td className="px-4 py-3 font-semibold text-[#1C1917] border-r border-[#D6CEBE] align-top">
                TARIKH MENINGGAL DUNIA
              </td>
              <td className="px-4 py-3 font-mono tabular-nums text-[#1C1917] align-top">
                {dodFormatted}
              </td>
            </tr>
            <tr className="border-b border-[#E2DDD3]">
              <td className="px-4 py-3 font-semibold text-[#1C1917] border-r border-[#D6CEBE] align-top">
                TARIKH PENGISYTIHARAN
              </td>
              <td className="px-4 py-3 font-mono tabular-nums text-[#1C1917] align-top">
                {declFormatted}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-semibold text-[#1C1917] border-r border-[#D6CEBE] align-top">
                PERUNTUKAN UNDANG – UNDANG YANG DIGUNAKAN
              </td>
              <td className="px-4 py-3 font-medium text-[#14532D] align-top">
                {result.era.statuteName}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Section Heading */}
      <div className="mt-8 mb-3">
        <h2 className="text-sm font-bold tracking-wide text-[#1C1917]">
          FORMULA PENGIRAAN :
        </h2>
      </div>

      {/* Table 2: FORMULA PENGIRAAN */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#D6CEBE] text-sm">
          <thead>
            <tr className="bg-[#FBF9F5]">
              <th
                scope="col"
                className="text-left px-3.5 py-3 text-xs font-semibold text-[#57534E] border-b border-r border-[#D6CEBE] w-12"
              >
                No.
              </th>
              <th
                scope="col"
                className="text-left px-4 py-3 text-xs font-semibold text-[#57534E] border-b border-r border-[#D6CEBE] w-[23%]"
              >
                Perkara
              </th>
              <th
                scope="col"
                className="text-left px-4 py-3 text-xs font-semibold text-[#57534E] border-b border-r border-[#D6CEBE]"
              >
                Pengiraan
              </th>
              <th
                scope="col"
                className="text-right px-4 py-3 text-xs font-semibold text-[#57534E] border-b border-[#D6CEBE] w-[21%]"
              >
                Jumlah / Pengesahan
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1: Gross Estate minus Debt */}
            <tr className="border-b border-[#D6CEBE] align-top">
              <td className="px-3.5 py-3.5 font-semibold text-[#1C1917] border-r border-[#D6CEBE] tabular-nums">
                1.
              </td>
              <td className="px-4 py-3.5 font-semibold text-[#1C1917] border-r border-[#D6CEBE]">
                Jumlah keseluruhan harta
              </td>
              <td className="px-4 py-3.5 border-r border-[#D6CEBE] font-mono tabular-nums text-[13px] leading-relaxed text-[#292524]">
                <div>Estet : RM {formatRM(result.grossEstate)}</div>
                <div>Hutang : RM {formatRM(result.debt)}</div>
                <div className="mt-1.5 pt-1.5 border-t border-[#E2DDD3] font-semibold text-[#1C1917]">
                  (Estet - Hutang = RM {formatRM(result.estateAfterDebtRaw)})
                </div>
              </td>
              <td className="px-4 py-3.5 text-right font-mono tabular-nums font-semibold text-[#1C1917]">
                RM {formatRM(result.estateAfterDebtRaw)}
              </td>
            </tr>

            {/* Row 2: Funeral Expenses */}
            <tr className="border-b border-[#D6CEBE] align-top">
              <td className="px-3.5 py-3.5 font-semibold text-[#1C1917] border-r border-[#D6CEBE] tabular-nums">
                2.
              </td>
              <td className="px-4 py-3.5 border-r border-[#D6CEBE]">
                <div className="font-semibold text-[#1C1917]">Pengurangan</div>
                <div className="text-[#292524] mt-0.5">
                  Kos pengebumian <em className="italic">(funeral expenses)</em>
                </div>
                <div className="text-xs italic text-[#78716C] mt-1">
                  * 2.5% of net value (after debts) or RM 1,000.00, whichever is less
                </div>
              </td>
              <td className="px-4 py-3.5 border-r border-[#D6CEBE] font-mono tabular-nums text-[13px] leading-relaxed text-[#292524]">
                {result.funeralFormulaText.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </td>
              <td className="px-4 py-3.5 text-right font-mono tabular-nums font-semibold text-[#14532D]">
                {result.funeralConfirmationText}
              </td>
            </tr>

            {/* Row 3: Estate Duty Value & Breakdown */}
            <tr className="border-b border-[#D6CEBE] align-top">
              <td className="px-3.5 py-3.5 font-semibold text-[#1C1917] border-r border-[#D6CEBE] tabular-nums">
                3.
              </td>
              <td className="px-4 py-3.5 border-r border-[#D6CEBE]">
                <div className="font-semibold text-[#1C1917]">
                  Nilai duti estet{' '}
                  <em className="italic font-normal">(Estate duty value)</em>
                </div>
              </td>
              <td className="px-4 py-3.5 border-r border-[#D6CEBE] text-[13px] leading-relaxed text-[#292524]">
                <div className="font-mono tabular-nums pb-2.5 border-b border-[#E2DDD3]">
                  Estate : RM {formatRM(result.grossEstate)} - Debt : RM{' '}
                  {formatRM(result.debt)} - Funeral Expenses : RM{' '}
                  {formatRM(result.funeralAllowance)} ={' '}
                  <span className="font-semibold text-[#1C1917]">
                    RM {formatRM(result.netEstateRaw)}
                  </span>
                </div>

                <div className="mt-2.5 space-y-1.5 font-mono tabular-nums text-[12.5px]">
                  {result.dutyBreakdown.map((band, idx) => (
                    <div
                      key={idx}
                      className="flex items-baseline justify-between gap-3"
                    >
                      <span className="text-[#44403C]">
                        <span className="whitespace-nowrap">{band.label}</span>{' '}
                        <span className="whitespace-nowrap">
                          (RM {formatRM(band.taxableAmount)} × {band.ratePercent}%)
                        </span>
                      </span>
                      <span className="text-[#1C1917] shrink-0 whitespace-nowrap">
                        = RM {formatRM(band.dutyAmount)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-[#E2DDD3] font-mono tabular-nums font-semibold text-[#1C1917]">
                  Total estate duty : RM {formatRM(result.totalDuty)}
                </div>
              </td>
              <td className="px-4 py-3.5 text-right font-mono tabular-nums font-semibold text-[#1C1917]">
                <div>Total estate duty :</div>
                <div className="mt-0.5 text-base">
                  RM {formatRM(result.totalDuty)}
                </div>
              </td>
            </tr>

            {/* Row 4: Interest */}
            <tr className="border-b border-[#D6CEBE] align-top">
              <td className="px-3.5 py-3.5 font-semibold text-[#1C1917] border-r border-[#D6CEBE] tabular-nums">
                4.
              </td>
              <td className="px-4 py-3.5 border-r border-[#D6CEBE]">
                <div className="font-semibold text-[#1C1917]">
                  Faedah <em className="italic font-normal">(Interest)</em> :
                </div>
                <div className="mt-3 text-[#292524] leading-relaxed">
                  {result.interestSource === 'declaration_date' ? (
                    result.era.interestRule === 'flat_12_pa' ? (
                      <>
                        Pay the duty{' '}
                        <span className="font-mono tabular-nums font-medium">
                          {Math.floor(result.elapsed.months / 12)}
                        </span>{' '}
                        year(s) after date of death
                        <span className="block text-[11px] text-[#78716C] mt-0.5 font-mono tabular-nums">
                          ({result.elapsed.months} months {result.elapsed.days} day(s))
                        </span>
                      </>
                    ) : (
                      <>
                        Pay the duty{' '}
                        <span className="font-mono tabular-nums font-medium">
                          {result.elapsed.months}
                        </span>{' '}
                        months{' '}
                        <span className="font-mono tabular-nums font-medium">
                          {result.elapsed.days}
                        </span>{' '}
                        day(s) after date of death
                      </>
                    )
                  ) : result.interestSource === 'manual_years' ? (
                    <>
                      Interest Period:{' '}
                      <span className="font-mono tabular-nums font-medium">
                        {result.interestPeriodYearsUsed}
                      </span>{' '}
                      year(s) @{' '}
                      {result.era.interestRule === 'flat_12_pa'
                        ? '12% p.a.'
                        : result.era.interestRule === 'act_29_tiers'
                        ? 'Act 29/1965 tiers'
                        : '0%'}
                    </>
                  ) : (
                    <span>Pending Date of Declaration / Payment Date</span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3.5 border-r border-[#D6CEBE] font-mono tabular-nums text-[12.5px] leading-relaxed text-[#292524]">
                {result.totalDuty > 0 && result.era.dutyType !== 'repealed' && (
                  <div className="text-[11.5px] text-[#78716C] mb-1.5">
                    Base Estate Duty : RM {formatRM(result.totalDuty)}
                  </div>
                )}
                <div className="space-y-1.5">
                  {result.interestFormulaLines.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
                {result.isTier3Applied && (
                  <div className="mt-2.5 text-xs font-sans italic text-[#78350F]">
                    *reduce to 6% (unfamiliar with local laws) applied as primary payable figure
                  </div>
                )}
              </td>
              <td className="px-4 py-3.5 text-right font-mono tabular-nums">
                <div className="font-semibold text-[#1C1917] text-base">
                  RM {formatRM(result.primaryInterest)}
                </div>
                {result.isTier3Applied && result.unreducedInterest12 !== null && (
                  <div className="mt-1 text-[11px] text-[#78716C]">
                    Unreduced 12%: RM {formatRM(result.unreducedInterest12)}
                  </div>
                )}
              </td>
            </tr>

            {/* Row 5: Total Payable */}
            <tr className="bg-[#FBF9F5] align-top">
              <td className="px-3.5 py-4 font-semibold text-[#1C1917] border-r border-[#D6CEBE] tabular-nums">
                5.
              </td>
              <td className="px-4 py-4 font-semibold text-[#1C1917] border-r border-[#D6CEBE]">
                Jumlah duti estet yang perlu dibayar
              </td>
              <td className="px-4 py-4 border-r border-[#D6CEBE] font-mono tabular-nums text-xs text-[#78716C]">
                Estate Duty + Interest
              </td>
              <td className="px-4 py-4 text-right font-mono tabular-nums font-bold text-[#14532D] text-sm sm:text-base">
                <div>
                  RM {formatRM(result.totalDuty)} + RM{' '}
                  {formatRM(result.primaryInterest)} =
                </div>
                <div className="text-lg mt-0.5">
                  RM {formatRM(result.totalPayable)}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 1-Sentence Verification Notice */}
      <div className="mt-6 pt-5 border-t border-[#D6CEBE]">
        <p className="text-xs sm:text-[13px] text-[#44403C] leading-relaxed">
          {result.verificationNotice}
        </p>
      </div>
    </section>
  );
};

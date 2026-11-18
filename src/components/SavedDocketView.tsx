import React, { useState } from 'react';
import { Download, Trash2, FolderOpen, Search } from 'lucide-react';
import { AssessmentInput, SavedAssessmentRecord } from '../types/assessment';
import { formatDisplayDate, formatRM } from '../engine/estateDutyEngine';

interface SavedDocketViewProps {
  records: SavedAssessmentRecord[];
  onOpenRecord: (input: AssessmentInput) => void;
  onDeleteRecord: (id: string) => void;
  onReturnToAssessment: () => void;
}

export const SavedDocketView: React.FC<SavedDocketViewProps> = ({
  records,
  onOpenRecord,
  onDeleteRecord,
  onReturnToAssessment,
}) => {
  const [query, setQuery] = useState('');

  const filtered = records.filter((rec) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      rec.input.name.toLowerCase().includes(q) ||
      rec.statuteShortName.toLowerCase().includes(q) ||
      rec.input.dateOfDeath.includes(q)
    );
  });

  const handleDownloadCsv = () => {
    const headers = [
      'Saved At',
      'Deceased Name',
      'Date of Death',
      'Date of Declaration',
      'Domicile',
      'Statute',
      'Gross Estate (RM)',
      'Debt (RM)',
      'Estate Duty (RM)',
      'Interest (RM)',
      'Total Payable (RM)',
    ];
    const escapeCsv = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = records.map((r) =>
      [
        r.savedAt,
        r.input.name || 'Unnamed Estate',
        r.input.dateOfDeath,
        r.input.dateOfDeclaration,
        r.input.domicile === 'malaysian' ? 'Malaysia' : 'Non-Malaysian',
        r.statuteShortName,
        r.input.grossEstate.toFixed(2),
        r.input.debt.toFixed(2),
        r.totalDuty.toFixed(2),
        r.primaryInterest.toFixed(2),
        r.totalPayable.toFixed(2),
      ]
        .map(escapeCsv)
        .join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sarawak-estate-duty-docket.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (records.length === 0) {
    return (
      <div className="bg-white border border-[#E2DDD3] rounded-lg p-12 text-center max-w-2xl mx-auto">
        <p className="text-xs font-medium tracking-wider uppercase text-[#78716C]">
          Assessment Register
        </p>
        <h2 className="font-serif text-3xl font-semibold text-[#1C1917] mt-2">
          No Saved Assessments Yet
        </h2>
        <p className="text-sm text-[#57534E] mt-2 max-w-md mx-auto leading-relaxed">
          Calculate an estate duty assessment in the workbench and select Save to Docket to
          retain a searchable record for future reference or CSV export.
        </p>
        <button
          type="button"
          onClick={onReturnToAssessment}
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#14532D] hover:bg-[#0F3F22] rounded-md transition-colors"
        >
          Return to Assessment Workbench
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E2DDD3] rounded-lg p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2DDD3]">
        <div>
          <p className="text-xs font-medium tracking-wider uppercase text-[#78716C]">
            Assessment Register
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1C1917] mt-1">
            Saved Probate Docket ({records.length})
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search
              className="w-3.5 h-3.5 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by name, date, statute..."
              className="pl-8 pr-3 py-2 text-xs bg-[#FBF9F5] border border-[#D6CEBE] rounded-md text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#14532D] w-56"
            />
          </div>

          <button
            type="button"
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#1C1917] bg-[#FBF9F5] hover:bg-[#F3EFE6] border border-[#D6CEBE] rounded-md transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Download CSV</span>
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#D6CEBE] text-left text-xs font-semibold text-[#57534E]">
              <th className="py-3 pr-4">Deceased / Case</th>
              <th className="py-3 px-4">Date of Death</th>
              <th className="py-3 px-4">Statute</th>
              <th className="py-3 px-4 text-right">Duty (RM)</th>
              <th className="py-3 px-4 text-right">Interest (RM)</th>
              <th className="py-3 px-4 text-right">Total Payable (RM)</th>
              <th className="py-3 pl-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2DDD3]">
            {filtered.map((rec) => (
              <tr key={rec.id} className="hover:bg-[#FBF9F5] transition-colors">
                <td className="py-3.5 pr-4 font-medium text-[#1C1917]">
                  {rec.input.name.trim() || 'Unnamed Estate'}
                </td>
                <td className="py-3.5 px-4 font-mono tabular-nums text-xs text-[#57534E]">
                  {formatDisplayDate(rec.input.dateOfDeath)}
                </td>
                <td className="py-3.5 px-4 text-xs text-[#57534E]">
                  {rec.statuteShortName}
                </td>
                <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#1C1917]">
                  {formatRM(rec.totalDuty)}
                </td>
                <td className="py-3.5 px-4 text-right font-mono tabular-nums text-[#1C1917]">
                  {formatRM(rec.primaryInterest)}
                </td>
                <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-[#14532D]">
                  {formatRM(rec.totalPayable)}
                </td>
                <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenRecord(rec.input)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#14532D] hover:bg-[#14532D]/10 rounded transition-colors"
                    >
                      <FolderOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Open</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteRecord(rec.id)}
                      className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-[#991B1B] hover:bg-[#991B1B]/10 rounded transition-colors"
                      aria-label={`Delete ${rec.input.name || 'record'}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-[#78716C]">
            No saved assessments match &ldquo;{query}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
};

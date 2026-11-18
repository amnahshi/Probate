import { useEffect, useMemo, useState } from 'react';
import { TopBar, ActiveView } from './components/TopBar';
import { AssessmentForm } from './components/AssessmentForm';
import { FormulaBroadsheet } from './components/FormulaBroadsheet';
import { StatutoryTimelineView } from './components/StatutoryTimelineView';
import { SavedDocketView } from './components/SavedDocketView';
import {
  PRESET_CASES,
  calculateAssessment,
} from './engine/estateDutyEngine';
import { AssessmentInput, SavedAssessmentRecord } from './types/assessment';

const DOCKET_STORAGE_KEY = 'sarawak_probate_docket_v1';

const DEFAULT_INPUT: AssessmentInput = {
  ...PRESET_CASES[0].input,
  name: '',
};

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('assessment');
  const [input, setInput] = useState<AssessmentInput>(DEFAULT_INPUT);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [docket, setDocket] = useState<SavedAssessmentRecord[]>(() => {
    try {
      const raw = localStorage.getItem(DOCKET_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SavedAssessmentRecord[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(DOCKET_STORAGE_KEY, JSON.stringify(docket));
    } catch {
      // Ignore storage quota errors
    }
  }, [docket]);

  const result = useMemo(() => calculateAssessment(input), [input]);

  const handleSaveToDocket = () => {
    if (result.validationError) {
      setSaveFeedback('Resolve input validation errors before saving.');
      setTimeout(() => setSaveFeedback(null), 3000);
      return;
    }

    const record: SavedAssessmentRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      savedAt: new Date().toISOString(),
      input: { ...input },
      statuteShortName: result.era.shortName,
      totalDuty: result.totalDuty,
      primaryInterest: result.primaryInterest,
      totalPayable: result.totalPayable,
    };

    setDocket((prev) => [record, ...prev]);
    setSaveFeedback('Saved to probate docket.');
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  const handleReset = () => {
    setInput({
      name: '',
      dateOfDeath: '1970-01-15',
      dateOfDeclaration: '',
      interestPeriodYears: null,
      grossEstate: 0,
      debt: 0,
      domicile: 'non_malaysian',
      domicileSpecified: false,
      interestMethod: 'progressive_tiers',
    });
    setSaveFeedback(null);
  };

  const handleOpenSavedOrPreset = (nextInput: AssessmentInput) => {
    setInput({ ...nextInput });
    setActiveView('assessment');
  };

  const handleDeleteRecord = (id: string) => {
    setDocket((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePrint = () => {
    if (activeView !== 'assessment') {
      setActiveView('assessment');
      setTimeout(() => window.print(), 100);
    } else {
      window.print();
    }
  };

  const showInterestMethodToggle =
    !result.validationError &&
    result.era.interestRule === 'act_29_tiers' &&
    result.interestTierNumber !== null &&
    result.interestTierNumber >= 2;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <TopBar
        activeView={activeView}
        onNavigate={setActiveView}
        docketCount={docket.length}
        onPrint={handlePrint}
      />

      <main className="flex-1 w-full max-w-[1360px] mx-auto px-6 lg:px-10 py-8 lg:py-10">
        {activeView === 'assessment' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <AssessmentForm
                input={input}
                onChange={setInput}
                overlappingStatutes={result.overlappingStatutes}
                activeEra={result.era}
                showInterestMethodToggle={showInterestMethodToggle}
                onSaveToDocket={handleSaveToDocket}
                onReset={handleReset}
                saveFeedback={saveFeedback}
              />
            </div>

            <div className="lg:col-span-8">
              <FormulaBroadsheet result={result} />
            </div>
          </div>
        )}

        {activeView === 'timeline' && (
          <StatutoryTimelineView onLoadPreset={handleOpenSavedOrPreset} />
        )}

        {activeView === 'docket' && (
          <SavedDocketView
            records={docket}
            onOpenRecord={handleOpenSavedOrPreset}
            onDeleteRecord={handleDeleteRecord}
            onReturnToAssessment={() => setActiveView('assessment')}
          />
        )}
      </main>

      <footer className="no-print border-t border-[#E2DDD3] py-5 px-6 lg:px-10">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[#78716C]">
          <span>
            Sarawak Historical Estate Duty Schedules (1 November 1933 – Repealed 1 November 1991)
          </span>
          <span>For provisional probate computation; subject to Probate Officer certification.</span>
        </div>
      </footer>
    </div>
  );
}

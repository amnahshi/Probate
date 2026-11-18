export type DomicileStatus = 'non_malaysian' | 'malaysian';

export type StatuteId =
  | 'order_e2_1933'
  | 'cap_29_1939'
  | 'cap_16_1948'
  | 'cap_29_1958'
  | 'act_29_1965'
  | 'act_a345_1976'
  | 'act_224_1980'
  | 'act_293_1983'
  | 'act_309_1984'
  | 'act_476_1992';

export type InterestTierMethod = 'progressive_tiers' | 'whole_period_tier';

export interface AssessmentInput {
  name: string;
  dateOfDeath: string; // YYYY-MM-DD
  dateOfDeclaration: string; // YYYY-MM-DD or '' when blank
  interestPeriodYears?: number | null;
  grossEstate: number;
  debt: number;
  domicile: DomicileStatus;
  domicileSpecified: boolean;
  statuteOverride?: StatuteId;
  interestMethod?: InterestTierMethod;
}

export interface SlabBracket {
  upTo: number; // Infinity for top bracket
  minExclusive?: number; // For display label
  ratePercent: number;
  label: string;
}

export interface ProgressiveBand {
  width: number; // Infinity for excess band
  ratePercent: number;
  label: string;
}

export interface BandBreakdownLine {
  label: string;
  taxableAmount: number;
  ratePercent: number;
  dutyAmount: number;
}

export interface InterestBreakdownLine {
  tierLabel: string;
  durationLabel: string;
  ratePercent: number;
  reducedRatePercent?: number;
  amount: number;
  unreducedAmount?: number;
}

export interface EraDefinition {
  id: StatuteId;
  statuteName: string;
  shortName: string;
  startDate: string;
  endDate: string | null; // null = onwards
  funeralRule: 'min_2_5_pct_1000' | 'flat_3000' | 'withdrawn' | 'repealed';
  dutyType: 'flat_slab' | 'progressive' | 'repealed';
  interestRule: 'flat_12_pa' | 'act_29_tiers' | 'repealed';
  summaryNote: string;
  slabs?: SlabBracket[];
  malaysianBands?: ProgressiveBand[];
  nonMalaysianBands?: ProgressiveBand[];
}

export interface ElapsedDuration {
  months: number;
  days: number;
  totalDays: number;
  equivalentYears: number;
}

export interface AssessmentResult {
  input: AssessmentInput;
  era: EraDefinition;
  overlappingStatutes: EraDefinition[];
  elapsed: ElapsedDuration;
  grossEstate: number;
  debt: number;
  estateAfterDebtRaw: number;
  estateAfterDebt: number;
  funeralAllowance: number;
  funeralTwoAndHalfPct: number;
  funeralFormulaText: string;
  funeralConfirmationText: string;
  netEstateRaw: number;
  netEstate: number;
  dutyBreakdown: BandBreakdownLine[];
  totalDuty: number;
  interestTierNumber: 1 | 2 | 3 | null;
  interestSource: 'declaration_date' | 'manual_years' | 'pending';
  interestPeriodYearsUsed: number | null;
  interestLines: InterestBreakdownLine[];
  interestFormulaLines: string[];
  primaryInterest: number;
  unreducedInterest12: number | null;
  isTier3Applied: boolean;
  totalPayable: number;
  totalPayableUnreduced: number | null;
  verificationNotice: string;
  validationError?: string;
}

export interface SavedAssessmentRecord {
  id: string;
  savedAt: string;
  input: AssessmentInput;
  statuteShortName: string;
  totalDuty: number;
  primaryInterest: number;
  totalPayable: number;
}

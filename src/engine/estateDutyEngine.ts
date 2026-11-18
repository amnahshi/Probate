import {
  AssessmentInput,
  AssessmentResult,
  BandBreakdownLine,
  ElapsedDuration,
  EraDefinition,
  InterestBreakdownLine,
  InterestTierMethod,
  ProgressiveBand,
  SlabBracket,
  StatuteId,
} from '../types/assessment';

export const STATUTORY_ERAS: EraDefinition[] = [
  {
    id: 'order_e2_1933',
    statuteName: 'Estate Duties Order No. E-2 (1933)',
    shortName: 'Order No. E-2 (1933)',
    startDate: '1933-11-01',
    endDate: '1948-10-18',
    funeralRule: 'min_2_5_pct_1000',
    dutyType: 'flat_slab',
    interestRule: 'flat_12_pa',
    summaryNote: 'Funeral MIN(2.5% of net value, RM 1,000); flat slab 0%–8%; 12% p.a. interest.',
    slabs: [
      { upTo: 500, ratePercent: 0, label: '≤ RM 500' },
      { upTo: 5000, ratePercent: 3, label: '> RM 500 – RM 5,000' },
      { upTo: 25000, ratePercent: 4, label: '> RM 5,000 – RM 25,000' },
      { upTo: 50000, ratePercent: 5, label: '> RM 25,000 – RM 50,000' },
      { upTo: 99999.9999, ratePercent: 6, label: '> RM 50,000 – < RM 100,000' },
      { upTo: Infinity, ratePercent: 8, label: '≥ RM 100,000' },
    ],
  },
  {
    id: 'cap_29_1939',
    statuteName: 'Estate Duty Ordinance (Cap. 29)',
    shortName: 'Ordinance Cap. 29',
    startDate: '1939-09-03',
    endDate: '1948-08-31',
    funeralRule: 'min_2_5_pct_1000',
    dutyType: 'flat_slab',
    interestRule: 'flat_12_pa',
    summaryNote: '29-tier flat slab schedule up to 40% (> RM 5,000,000); 12% p.a. interest.',
    slabs: buildCap29Slabs(),
  },
  {
    id: 'cap_16_1948',
    statuteName: 'Estate Duty Ordinance (Cap. 16)',
    shortName: 'Ordinance Cap. 16',
    startDate: '1948-09-01',
    endDate: '1958-01-31',
    funeralRule: 'min_2_5_pct_1000',
    dutyType: 'flat_slab',
    interestRule: 'flat_12_pa',
    summaryNote: '10-tier flat slab schedule capped at 20% (> RM 100,000); 12% p.a. interest.',
    slabs: [
      { upTo: 1000, ratePercent: 0, label: '≤ RM 1,000' },
      { upTo: 3000, ratePercent: 1, label: '> RM 1,000 – RM 3,000' },
      { upTo: 5000, ratePercent: 1.5, label: '> RM 3,000 – RM 5,000' },
      { upTo: 7500, ratePercent: 2.5, label: '> RM 5,000 – RM 7,500' },
      { upTo: 10000, ratePercent: 3.5, label: '> RM 7,500 – RM 10,000' },
      { upTo: 20000, ratePercent: 5, label: '> RM 10,000 – RM 20,000' },
      { upTo: 40000, ratePercent: 7.5, label: '> RM 20,000 – RM 40,000' },
      { upTo: 70000, ratePercent: 10, label: '> RM 40,000 – RM 70,000' },
      { upTo: 100000, ratePercent: 15, label: '> RM 70,000 – RM 100,000' },
      { upTo: Infinity, ratePercent: 20, label: '> RM 100,000' },
    ],
  },
  {
    id: 'cap_29_1958',
    statuteName: 'G.N. No. S2 of SGG Part II 1958 — Cap. 29',
    shortName: 'G.N. S2 / 1958 (Cap. 29)',
    startDate: '1958-02-01',
    endDate: '1964-12-31',
    funeralRule: 'min_2_5_pct_1000',
    dutyType: 'flat_slab',
    interestRule: 'flat_12_pa',
    summaryNote: 'Restores 29-tier flat slab schedule up to 40% (> RM 5,000,000); 12% p.a. interest.',
    slabs: buildCap29Slabs(),
  },
  {
    id: 'act_29_1965',
    statuteName: 'Finance (Estate Duty) Act, 1965 (Act No. 29 of 1965)',
    shortName: 'Act No. 29 of 1965',
    startDate: '1965-01-01',
    endDate: '1975-12-31',
    funeralRule: 'min_2_5_pct_1000',
    dutyType: 'progressive',
    interestRule: 'act_29_tiers',
    summaryNote: 'Domicile-differentiated progressive bands (25k NIL Malaysia / 10k NIL Sabah & Sarawak Non-Malaysian, up to 50%) and 3%/6%/12% interest tiers.',
    nonMalaysianBands: [
      { width: 10000, ratePercent: 0, label: 'First RM 10,000' },
      { width: 15000, ratePercent: 5, label: 'Next RM 15,000' },
      { width: 25000, ratePercent: 7.5, label: 'Next RM 25,000' },
      { width: 25000, ratePercent: 10, label: 'Next RM 25,000' },
      { width: 25000, ratePercent: 12.5, label: 'Next RM 25,000' },
      { width: 50000, ratePercent: 15, label: 'Next RM 50,000' },
      { width: 50000, ratePercent: 20, label: 'Next RM 50,000' },
      { width: 100000, ratePercent: 25, label: 'Next RM 100,000' },
      { width: 100000, ratePercent: 30, label: 'Next RM 100,000' },
      { width: 100000, ratePercent: 35, label: 'Next RM 100,000' },
      { width: 250000, ratePercent: 40, label: 'Next RM 250,000' },
      { width: 250000, ratePercent: 45, label: 'Next RM 250,000' },
      { width: 1000000, ratePercent: 50, label: 'Next RM 1,000,000' },
      { width: Infinity, ratePercent: 50, label: 'Excess over RM 2,000,000' },
    ],
    malaysianBands: [
      { width: 25000, ratePercent: 0, label: 'First RM 25,000' },
      { width: 25000, ratePercent: 5, label: 'Next RM 25,000' },
      { width: 50000, ratePercent: 7.5, label: 'Next RM 50,000' },
      { width: 50000, ratePercent: 10, label: 'Next RM 50,000' },
      { width: 50000, ratePercent: 12.5, label: 'Next RM 50,000' },
      { width: 100000, ratePercent: 15, label: 'Next RM 100,000' },
      { width: 100000, ratePercent: 20, label: 'Next RM 100,000' },
      { width: 200000, ratePercent: 25, label: 'Next RM 200,000' },
      { width: 200000, ratePercent: 30, label: 'Next RM 200,000' },
      { width: 200000, ratePercent: 35, label: 'Next RM 200,000' },
      { width: 500000, ratePercent: 40, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 45, label: 'Next RM 500,000' },
      { width: 2000000, ratePercent: 50, label: 'Next RM 2,000,000' },
      { width: Infinity, ratePercent: 50, label: 'Excess over RM 4,000,000' },
    ],
  },
  {
    id: 'act_a345_1976',
    statuteName: 'Finance (Estate Duty) (Amendment) Act, 1976 (Act A345)',
    shortName: 'Act A345 (1976)',
    startDate: '1976-01-01',
    endDate: '1979-10-17',
    funeralRule: 'min_2_5_pct_1000',
    dutyType: 'progressive',
    interestRule: 'flat_12_pa',
    summaryNote: 'Raises exemption to First RM 50,000 NIL; 12% p.a. interest (Act 29/1965 tiered interest applies only to 1965–1975).',
    malaysianBands: [
      { width: 50000, ratePercent: 0, label: 'First RM 50,000' },
      { width: 50000, ratePercent: 7.5, label: 'Next RM 50,000' },
      { width: 50000, ratePercent: 10, label: 'Next RM 50,000' },
      { width: 50000, ratePercent: 12.5, label: 'Next RM 50,000' },
      { width: 100000, ratePercent: 15, label: 'Next RM 100,000' },
      { width: 100000, ratePercent: 20, label: 'Next RM 100,000' },
      { width: 200000, ratePercent: 25, label: 'Next RM 200,000' },
      { width: 200000, ratePercent: 30, label: 'Next RM 200,000' },
      { width: 200000, ratePercent: 35, label: 'Next RM 200,000' },
      { width: 500000, ratePercent: 40, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 45, label: 'Next RM 500,000' },
      { width: 2000000, ratePercent: 50, label: 'Next RM 2,000,000' },
      { width: 2000000, ratePercent: 55, label: 'Next RM 2,000,000' },
      { width: Infinity, ratePercent: 60, label: 'Excess over RM 6,000,000' },
    ],
    nonMalaysianBands: [
      { width: 10000, ratePercent: 0, label: 'First RM 10,000' },
      { width: 15000, ratePercent: 5, label: 'Next RM 15,000' },
      { width: 25000, ratePercent: 7.5, label: 'Next RM 25,000' },
      { width: 25000, ratePercent: 10, label: 'Next RM 25,000' },
      { width: 25000, ratePercent: 12.5, label: 'Next RM 25,000' },
      { width: 50000, ratePercent: 15, label: 'Next RM 50,000' },
      { width: 50000, ratePercent: 20, label: 'Next RM 50,000' },
      { width: 100000, ratePercent: 25, label: 'Next RM 100,000' },
      { width: 100000, ratePercent: 30, label: 'Next RM 100,000' },
      { width: 100000, ratePercent: 35, label: 'Next RM 100,000' },
      { width: 250000, ratePercent: 40, label: 'Next RM 250,000' },
      { width: 250000, ratePercent: 45, label: 'Next RM 250,000' },
      { width: 1000000, ratePercent: 50, label: 'Next RM 1,000,000' },
      { width: 2000000, ratePercent: 55, label: 'Next RM 2,000,000' },
      { width: Infinity, ratePercent: 60, label: 'Excess over RM 4,000,000' },
    ],
  },
  {
    id: 'act_224_1980',
    statuteName: 'Finance (Estate Duty) Act 1980 (Act 224)',
    shortName: 'Act 224 (1980)',
    startDate: '1979-10-18',
    endDate: '1983-10-20',
    funeralRule: 'flat_3000',
    dutyType: 'progressive',
    interestRule: 'flat_12_pa',
    summaryNote: 'Flat RM 3,000.00 funeral allowance; 300k NIL Malaysian / 60k NIL Outside Malaysia; 12% p.a. interest.',
    malaysianBands: [
      { width: 300000, ratePercent: 0, label: 'First RM 300,000' },
      { width: 100000, ratePercent: 12, label: 'Next RM 100,000' },
      { width: 100000, ratePercent: 16, label: 'Next RM 100,000' },
      { width: 200000, ratePercent: 20, label: 'Next RM 200,000' },
      { width: 300000, ratePercent: 25, label: 'Next RM 300,000' },
      { width: 500000, ratePercent: 30, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 35, label: 'Next RM 500,000' },
      { width: 1000000, ratePercent: 40, label: 'Next RM 1,000,000' },
      { width: 1000000, ratePercent: 45, label: 'Next RM 1,000,000' },
      { width: 1000000, ratePercent: 50, label: 'Next RM 1,000,000' },
      { width: 1000000, ratePercent: 55, label: 'Next RM 1,000,000' },
      { width: Infinity, ratePercent: 60, label: 'Excess over RM 6,000,000' },
    ],
    nonMalaysianBands: [
      { width: 60000, ratePercent: 0, label: 'First RM 60,000' },
      { width: 40000, ratePercent: 5, label: 'Next RM 40,000' },
      { width: 100000, ratePercent: 9, label: 'Next RM 100,000' },
      { width: 200000, ratePercent: 14, label: 'Next RM 200,000' },
      { width: 300000, ratePercent: 18, label: 'Next RM 300,000' },
      { width: 300000, ratePercent: 22, label: 'Next RM 300,000' },
      { width: 500000, ratePercent: 28, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 35, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 40, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 45, label: 'Next RM 500,000' },
      { width: 1000000, ratePercent: 50, label: 'Next RM 1,000,000' },
      { width: 1000000, ratePercent: 55, label: 'Next RM 1,000,000' },
      { width: Infinity, ratePercent: 60, label: 'Excess over RM 5,000,000' },
    ],
  },
  {
    id: 'act_293_1983',
    statuteName: 'Finance Act 1983 (Act 293)',
    shortName: 'Act 293 (1983)',
    startDate: '1983-10-21',
    endDate: '1984-10-18',
    funeralRule: 'flat_3000',
    dutyType: 'progressive',
    interestRule: 'flat_12_pa',
    summaryNote: 'Flat RM 3,000.00 funeral allowance; 600k NIL Malaysian / 120k NIL Outside Malaysia; 12% p.a. interest.',
    malaysianBands: [
      { width: 600000, ratePercent: 0, label: 'First RM 600,000' },
      { width: 100000, ratePercent: 12, label: 'Next RM 100,000' },
      { width: 100000, ratePercent: 16, label: 'Next RM 100,000' },
      { width: 200000, ratePercent: 20, label: 'Next RM 200,000' },
      { width: 300000, ratePercent: 25, label: 'Next RM 300,000' },
      { width: 500000, ratePercent: 30, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 35, label: 'Next RM 500,000' },
      { width: 1000000, ratePercent: 40, label: 'Next RM 1,000,000' },
      { width: 1000000, ratePercent: 45, label: 'Next RM 1,000,000' },
      { width: 1000000, ratePercent: 50, label: 'Next RM 1,000,000' },
      { width: 1000000, ratePercent: 55, label: 'Next RM 1,000,000' },
      { width: Infinity, ratePercent: 60, label: 'Excess over RM 6,300,000' },
    ],
    nonMalaysianBands: [
      { width: 120000, ratePercent: 0, label: 'First RM 120,000' },
      { width: 40000, ratePercent: 5, label: 'Next RM 40,000' },
      { width: 100000, ratePercent: 9, label: 'Next RM 100,000' },
      { width: 200000, ratePercent: 14, label: 'Next RM 200,000' },
      { width: 300000, ratePercent: 18, label: 'Next RM 300,000' },
      { width: 300000, ratePercent: 22, label: 'Next RM 300,000' },
      { width: 500000, ratePercent: 28, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 35, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 40, label: 'Next RM 500,000' },
      { width: 500000, ratePercent: 45, label: 'Next RM 500,000' },
      { width: 1000000, ratePercent: 50, label: 'Next RM 1,000,000' },
      { width: 1000000, ratePercent: 55, label: 'Next RM 1,000,000' },
      { width: Infinity, ratePercent: 60, label: 'Excess over RM 5,060,000' },
    ],
  },
  {
    id: 'act_309_1984',
    statuteName: 'Finance Act 1984 (Act 309)',
    shortName: 'Act 309 (1984)',
    startDate: '1984-10-19',
    endDate: '1991-10-31',
    funeralRule: 'withdrawn',
    dutyType: 'progressive',
    interestRule: 'flat_12_pa',
    summaryNote: 'Funeral allowance withdrawn (RM 0.00); simplified 2-band rate (5% / 10%); 12% p.a. interest.',
    malaysianBands: [
      { width: 2000000, ratePercent: 0, label: 'First RM 2,000,000' },
      { width: 2000000, ratePercent: 5, label: 'Next RM 2,000,000' },
      { width: Infinity, ratePercent: 10, label: 'Excess over RM 4,000,000' },
    ],
    nonMalaysianBands: [
      { width: 400000, ratePercent: 0, label: 'First RM 400,000' },
      { width: 400000, ratePercent: 5, label: 'Next RM 400,000' },
      { width: Infinity, ratePercent: 10, label: 'Excess over RM 800,000' },
    ],
  },
  {
    id: 'act_476_1992',
    statuteName: 'Finance Act 1992 (Act 476)',
    shortName: 'Act 476 (Repealed)',
    startDate: '1991-11-01',
    endDate: null,
    funeralRule: 'repealed',
    dutyType: 'repealed',
    interestRule: 'repealed',
    summaryNote: 'Estate duty repealed from 1 November 1991 onwards; RM 0.00 duty and RM 0.00 interest.',
  },
];

function buildCap29Slabs(): SlabBracket[] {
  return [
    { upTo: 1000, ratePercent: 0, label: '≤ RM 1,000' },
    { upTo: 3000, ratePercent: 1, label: '> RM 1,000 – RM 3,000' },
    { upTo: 5000, ratePercent: 1.5, label: '> RM 3,000 – RM 5,000' },
    { upTo: 7500, ratePercent: 2.5, label: '> RM 5,000 – RM 7,500' },
    { upTo: 10000, ratePercent: 3.5, label: '> RM 7,500 – RM 10,000' },
    { upTo: 20000, ratePercent: 5, label: '> RM 10,000 – RM 20,000' },
    { upTo: 40000, ratePercent: 7.5, label: '> RM 20,000 – RM 40,000' },
    { upTo: 70000, ratePercent: 10, label: '> RM 40,000 – RM 70,000' },
    { upTo: 100000, ratePercent: 15, label: '> RM 70,000 – RM 100,000' },
    { upTo: 150000, ratePercent: 21, label: '> RM 100,000 – RM 150,000' },
    { upTo: 200000, ratePercent: 22, label: '> RM 150,000 – RM 200,000' },
    { upTo: 250000, ratePercent: 23, label: '> RM 200,000 – RM 250,000' },
    { upTo: 300000, ratePercent: 24, label: '> RM 250,000 – RM 300,000' },
    { upTo: 350000, ratePercent: 25, label: '> RM 300,000 – RM 350,000' },
    { upTo: 400000, ratePercent: 26, label: '> RM 350,000 – RM 400,000' },
    { upTo: 450000, ratePercent: 27, label: '> RM 400,000 – RM 450,000' },
    { upTo: 500000, ratePercent: 28, label: '> RM 450,000 – RM 500,000' },
    { upTo: 600000, ratePercent: 29, label: '> RM 500,000 – RM 600,000' },
    { upTo: 700000, ratePercent: 30, label: '> RM 600,000 – RM 700,000' },
    { upTo: 800000, ratePercent: 31, label: '> RM 700,000 – RM 800,000' },
    { upTo: 900000, ratePercent: 32, label: '> RM 800,000 – RM 900,000' },
    { upTo: 1000000, ratePercent: 33, label: '> RM 900,000 – RM 1,000,000' },
    { upTo: 1500000, ratePercent: 34, label: '> RM 1,000,000 – RM 1,500,000' },
    { upTo: 2000000, ratePercent: 35, label: '> RM 1,500,000 – RM 2,000,000' },
    { upTo: 2500000, ratePercent: 36, label: '> RM 2,000,000 – RM 2,500,000' },
    { upTo: 3000000, ratePercent: 37, label: '> RM 2,500,000 – RM 3,000,000' },
    { upTo: 4000000, ratePercent: 38, label: '> RM 3,000,000 – RM 4,000,000' },
    { upTo: 5000000, ratePercent: 39, label: '> RM 4,000,000 – RM 5,000,000' },
    { upTo: Infinity, ratePercent: 40, label: '> RM 5,000,000' },
  ];
}

export function roundSen(val: number): number {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

export function formatRM(val: number): string {
  return val.toLocaleString('en-MY', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDisplayDate(isoDate: string): string {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate;
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function parseUtcDate(isoDate: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return null;
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  if (
    dt.getUTCFullYear() !== y ||
    dt.getUTCMonth() !== m - 1 ||
    dt.getUTCDate() !== d
  ) {
    return null;
  }
  return dt;
}

function daysInUtcMonth(year: number, monthIndexZeroBased: number): number {
  return new Date(Date.UTC(year, monthIndexZeroBased + 1, 0)).getUTCDate();
}

export function computeElapsedDuration(startIso: string, endIso: string): ElapsedDuration {
  const d1 = parseUtcDate(startIso);
  const d2 = parseUtcDate(endIso);
  if (!d1 || !d2 || d2.getTime() <= d1.getTime()) {
    return { months: 0, days: 0, totalDays: 0, equivalentYears: 0 };
  }

  const totalDays = Math.round((d2.getTime() - d1.getTime()) / 86400000);

  let months =
    (d2.getUTCFullYear() - d1.getUTCFullYear()) * 12 +
    (d2.getUTCMonth() - d1.getUTCMonth());

  let anchorYear = d1.getUTCFullYear() + Math.floor((d1.getUTCMonth() + months) / 12);
  let anchorMonth = (d1.getUTCMonth() + months) % 12;
  let clampedDay = Math.min(d1.getUTCDate(), daysInUtcMonth(anchorYear, anchorMonth));
  let anchor = new Date(Date.UTC(anchorYear, anchorMonth, clampedDay));

  if (anchor.getTime() > d2.getTime()) {
    months -= 1;
    anchorYear = d1.getUTCFullYear() + Math.floor((d1.getUTCMonth() + months) / 12);
    anchorMonth = (d1.getUTCMonth() + months) % 12;
    clampedDay = Math.min(d1.getUTCDate(), daysInUtcMonth(anchorYear, anchorMonth));
    anchor = new Date(Date.UTC(anchorYear, anchorMonth, clampedDay));
  }

  const days = Math.round((d2.getTime() - anchor.getTime()) / 86400000);
  const equivalentYears = months / 12 + days / 365;

  return {
    months,
    days,
    totalDays,
    equivalentYears,
  };
}

export function findMatchingStatutes(dateOfDeath: string): EraDefinition[] {
  return STATUTORY_ERAS.filter((era) => {
    const afterStart = dateOfDeath >= era.startDate;
    const beforeEnd = era.endDate === null ? true : dateOfDeath <= era.endDate;
    return afterStart && beforeEnd;
  });
}

export function selectDefaultStatute(
  dateOfDeath: string,
  overrideId?: StatuteId
): { era: EraDefinition | null; overlapping: EraDefinition[] } {
  const matches = findMatchingStatutes(dateOfDeath);
  if (matches.length === 0) {
    return { era: null, overlapping: [] };
  }

  if (overrideId) {
    const found = matches.find((m) => m.id === overrideId);
    if (found) {
      return { era: found, overlapping: matches };
    }
  }

  // When historical ranges overlap (1939-09-03..1948-10-18), prefer the newer-commencing Ordinance
  // (Cap. 29 for 1939-09-03..1948-08-31; Cap. 16 for 1948-09-01..1948-10-18), while exposing all matches.
  const sortedByNewestStart = [...matches].sort((a, b) =>
    b.startDate.localeCompare(a.startDate)
  );
  return {
    era: sortedByNewestStart[0],
    overlapping: matches,
  };
}

export function calculateAssessment(input: AssessmentInput): AssessmentResult {
  const d1 = parseUtcDate(input.dateOfDeath);
  const declTrimmed = (input.dateOfDeclaration ?? '').trim();
  const hasDeclarationDate = declTrimmed !== '';
  const d2 = hasDeclarationDate ? parseUtcDate(declTrimmed) : null;

  const fallbackEra = STATUTORY_ERAS[0];

  if (!d1) {
    return buildErrorResult(input, fallbackEra, 'Please enter a valid Date of Death.');
  }

  if (hasDeclarationDate && !d2) {
    return buildErrorResult(input, fallbackEra, 'Please enter a valid Date of Declaration or leave it blank.');
  }

  if (hasDeclarationDate && d2 && d2.getTime() < d1.getTime()) {
    return buildErrorResult(
      input,
      fallbackEra,
      'Date of Declaration cannot precede Date of Death.'
    );
  }

  if (
    input.interestPeriodYears !== undefined &&
    input.interestPeriodYears !== null &&
    (Number.isNaN(input.interestPeriodYears) || input.interestPeriodYears < 0)
  ) {
    return buildErrorResult(
      input,
      fallbackEra,
      'Interest Period (Years) must be a non-negative number.'
    );
  }

  if (input.dateOfDeath < '1933-11-01') {
    return buildErrorResult(
      input,
      fallbackEra,
      'Date of Death precedes Estate Duties Order No. E-2 (effective 1 November 1933). Historical Sarawak statutory rules begin from 1933-11-01.'
    );
  }

  if (input.grossEstate < 0 || input.debt < 0 || Number.isNaN(input.grossEstate) || Number.isNaN(input.debt)) {
    return buildErrorResult(input, fallbackEra, 'Gross Estate and Debt must be non-negative numeric amounts.');
  }

  const { era, overlapping } = selectDefaultStatute(input.dateOfDeath, input.statuteOverride);
  if (!era) {
    return buildErrorResult(input, fallbackEra, 'No statutory era matched the Date of Death.');
  }

  const elapsed: ElapsedDuration = hasDeclarationDate
    ? computeElapsedDuration(input.dateOfDeath, declTrimmed)
    : { months: 0, days: 0, totalDays: 0, equivalentYears: 0 };

  const manualYears =
    !hasDeclarationDate &&
    input.interestPeriodYears !== undefined &&
    input.interestPeriodYears !== null &&
    !Number.isNaN(input.interestPeriodYears)
      ? input.interestPeriodYears
      : null;

  const interestSource: 'declaration_date' | 'manual_years' | 'pending' = hasDeclarationDate
    ? 'declaration_date'
    : manualYears !== null
    ? 'manual_years'
    : 'pending';

  const grossEstate = roundSen(input.grossEstate);
  const debt = roundSen(input.debt);
  const estateAfterDebtRaw = roundSen(grossEstate - debt);
  const estateAfterDebt = Math.max(0, estateAfterDebtRaw);

  // 1. Funeral expenses allowance: MIN(2.5% of net value after debts, RM 1,000.00)
  const funeralTwoAndHalfPct = roundSen(estateAfterDebt * 0.025);
  let funeralAllowance = 0;
  let funeralFormulaText = '';
  let funeralConfirmationText = '';

  if (era.funeralRule === 'min_2_5_pct_1000') {
    funeralAllowance = roundSen(Math.min(funeralTwoAndHalfPct, 1000));
    const pctWins = funeralTwoAndHalfPct <= 1000;
    funeralFormulaText = `2.5% × RM ${formatRM(estateAfterDebt)} = RM ${formatRM(funeralTwoAndHalfPct)}${pctWins ? ' ✓' : ''}\nStatutory cap = RM 1,000.00${!pctWins ? ' ✓' : ''}`;
    funeralConfirmationText = `RM ${formatRM(funeralAllowance)} ✓`;
  } else if (era.funeralRule === 'flat_3000') {
    funeralAllowance = 3000;
    funeralFormulaText = `Flat statutory funeral allowance (${era.shortName}): RM 3,000.00`;
    funeralConfirmationText = `RM 3,000.00 ✓`;
  } else if (era.funeralRule === 'withdrawn') {
    funeralAllowance = 0;
    funeralFormulaText = `Funeral allowance withdrawn under Finance Act 1984 (Act 309)`;
    funeralConfirmationText = `RM 0.00 ✓`;
  } else {
    funeralAllowance = 0;
    funeralFormulaText = `Repealed under Finance Act 1992 (Act 476)`;
    funeralConfirmationText = `RM 0.00 ✓`;
  }

  const netEstateRaw = roundSen(grossEstate - debt - funeralAllowance);
  const netEstate = Math.max(0, netEstateRaw);

  // 2. Estate duty calculation
  const dutyBreakdown: BandBreakdownLine[] = [];
  let totalDuty = 0;

  if (era.dutyType === 'repealed') {
    dutyBreakdown.push({
      label: 'Repealed from 1 November 1991 (Act 476)',
      taxableAmount: netEstate,
      ratePercent: 0,
      dutyAmount: 0,
    });
    totalDuty = 0;
  } else if (era.dutyType === 'flat_slab' && era.slabs) {
    if (netEstate <= 0) {
      dutyBreakdown.push({
        label: 'Net Estate ≤ RM 0.00 (No dutiable value)',
        taxableAmount: 0,
        ratePercent: 0,
        dutyAmount: 0,
      });
      totalDuty = 0;
    } else {
      const matchedSlab =
        era.slabs.find((s) => netEstate <= s.upTo) ?? era.slabs[era.slabs.length - 1];
      const duty = roundSen((netEstate * matchedSlab.ratePercent) / 100);
      dutyBreakdown.push({
        label: `Flat Slab (${matchedSlab.label})`,
        taxableAmount: netEstate,
        ratePercent: matchedSlab.ratePercent,
        dutyAmount: duty,
      });
      totalDuty = duty;
    }
  } else if (era.dutyType === 'progressive') {
    const isDomicileEra = era.id === 'act_29_1965';
    const bands = isDomicileEra
      ? input.domicile === 'malaysian'
        ? era.malaysianBands ?? []
        : era.nonMalaysianBands ?? era.malaysianBands ?? []
      : era.malaysianBands ?? [];

    if (netEstate <= 0) {
      dutyBreakdown.push({
        label: 'Net Estate ≤ RM 0.00 (No dutiable value)',
        taxableAmount: 0,
        ratePercent: 0,
        dutyAmount: 0,
      });
      totalDuty = 0;
    } else {
      let remaining = netEstate;
      for (const band of bands) {
        if (remaining <= 0) break;
        const slice = band.width === Infinity ? remaining : Math.min(remaining, band.width);
        const bandDuty = roundSen((slice * band.ratePercent) / 100);
        dutyBreakdown.push({
          label: band.label,
          taxableAmount: slice,
          ratePercent: band.ratePercent,
          dutyAmount: bandDuty,
        });
        totalDuty = roundSen(totalDuty + bandDuty);
        remaining = roundSen(remaining - slice);
      }
    }
  }

  // 3. Interest calculation
  const interestMethod: InterestTierMethod = input.interestMethod ?? 'progressive_tiers';
  let interestTierNumber: 1 | 2 | 3 | null = null;
  const interestLines: InterestBreakdownLine[] = [];
  const interestFormulaLines: string[] = [];
  let primaryInterest = 0;
  let unreducedInterest12: number | null = null;
  let isTier3Applied = false;

  if (era.interestRule === 'repealed' || totalDuty <= 0) {
    primaryInterest = 0;
    if (era.interestRule === 'repealed') {
      interestFormulaLines.push('Repealed (RM 0.00 interest)');
    } else {
      interestFormulaLines.push('No duty payable — RM 0.00 interest');
    }
  } else if (interestSource === 'pending') {
    primaryInterest = 0;
    interestFormulaLines.push('Pending Date of Declaration / Payment Date');
  } else if (interestSource === 'manual_years') {
    const years = manualYears ?? 0;
    if (era.interestRule === 'flat_12_pa') {
      const interest = roundSen(totalDuty * 0.12 * years);
      primaryInterest = interest;
      interestLines.push({
        tierLabel: 'Statutory Rate (12% p.a.)',
        durationLabel: `${years} year(s)`,
        ratePercent: 12,
        amount: interest,
      });
      interestFormulaLines.push(
        `RM ${formatRM(totalDuty)} × 12% p.a. × ${years} year(s) = RM ${formatRM(interest)}`
      );
    } else if (era.interestRule === 'act_29_tiers') {
      if (years <= 0.5) {
        interestTierNumber = 1;
        const amt = roundSen(totalDuty * 0.03 * years);
        primaryInterest = amt;
        interestLines.push({
          tierLabel: 'no 1 (≤ 0.5 yr)',
          durationLabel: `${years} year(s)`,
          ratePercent: 3,
          amount: amt,
        });
        interestFormulaLines.push(
          `Tier no 1 (≤ 6 mos @ 3% p.a.): RM ${formatRM(totalDuty)} × 3% × ${years} year(s) = RM ${formatRM(amt)}`
        );
      } else if (years <= 1.5) {
        interestTierNumber = 2;
        if (interestMethod === 'progressive_tiers') {
          const tier1Amt = roundSen(totalDuty * 0.03 * 0.5);
          const remYears = years - 0.5;
          const tier2Amt = roundSen(totalDuty * 0.06 * remYears);
          primaryInterest = roundSen(tier1Amt + tier2Amt);
          interestLines.push(
            {
              tierLabel: 'no 1 (First 0.5 yr)',
              durationLabel: '0.5 year(s)',
              ratePercent: 3,
              amount: tier1Amt,
            },
            {
              tierLabel: 'no 2 (> 0.5 to ≤ 1.5 yr)',
              durationLabel: `${roundSen(remYears)} year(s)`,
              ratePercent: 6,
              amount: tier2Amt,
            }
          );
          interestFormulaLines.push(
            `no 1 (First 6 mos @ 3% p.a.): RM ${formatRM(totalDuty)} × 3% × 0.5 yr = RM ${formatRM(tier1Amt)}`
          );
          interestFormulaLines.push(
            `no 2 (Next ${remYears} yr @ 6% p.a.): RM ${formatRM(totalDuty)} × 6% × ${remYears} yr = RM ${formatRM(tier2Amt)}`
          );
        } else {
          const amt = roundSen(totalDuty * 0.06 * years);
          primaryInterest = amt;
          interestLines.push({
            tierLabel: 'no 2 (> 0.5 to ≤ 1.5 yr)',
            durationLabel: `${years} year(s)`,
            ratePercent: 6,
            amount: amt,
          });
          interestFormulaLines.push(
            `Tier no 2 (> 6 to ≤ 18 mos @ 6% p.a.): RM ${formatRM(totalDuty)} × 6% × ${years} year(s) = RM ${formatRM(amt)}`
          );
        }
      } else {
        interestTierNumber = 3;
        isTier3Applied = true;
        if (interestMethod === 'progressive_tiers') {
          const tier1Amt = roundSen(totalDuty * 0.03 * 0.5);
          const tier2Amt = roundSen(totalDuty * 0.06 * 1);
          const remYears = years - 1.5;
          const tier3Unreduced = roundSen(totalDuty * 0.12 * remYears);
          const tier3Reduced = roundSen(totalDuty * 0.06 * remYears);
          primaryInterest = roundSen(tier1Amt + tier2Amt + tier3Reduced);
          unreducedInterest12 = roundSen(tier1Amt + tier2Amt + tier3Unreduced);
          interestLines.push(
            {
              tierLabel: 'no 1 (First 0.5 yr)',
              durationLabel: '0.5 year(s)',
              ratePercent: 3,
              amount: tier1Amt,
            },
            {
              tierLabel: 'no 2 (0.5 to 1.5 yr)',
              durationLabel: '1 year(s)',
              ratePercent: 6,
              amount: tier2Amt,
            },
            {
              tierLabel: 'no 3 (> 1.5 yr)',
              durationLabel: `${remYears} year(s)`,
              ratePercent: 12,
              reducedRatePercent: 6,
              amount: tier3Reduced,
              unreducedAmount: tier3Unreduced,
            }
          );
          interestFormulaLines.push(
            `no 1 (First 6 mos @ 3% p.a.): RM ${formatRM(totalDuty)} × 3% × 0.5 yr = RM ${formatRM(tier1Amt)}`
          );
          interestFormulaLines.push(
            `no 2 (6 to 18 mos @ 6% p.a.): RM ${formatRM(totalDuty)} × 6% × 1 yr = RM ${formatRM(tier2Amt)}`
          );
          interestFormulaLines.push(
            `no 3 (Remaining ${remYears} yr @ 12% p.a.): RM ${formatRM(tier3Unreduced)} *reduce to 6% (unfamiliar with local laws) = RM ${formatRM(tier3Reduced)}`
          );
        } else {
          const amtUnreduced = roundSen(totalDuty * 0.12 * years);
          const amtReduced = roundSen(totalDuty * 0.06 * years);
          primaryInterest = amtReduced;
          unreducedInterest12 = amtUnreduced;
          interestLines.push({
            tierLabel: 'no 3 (> 1.5 yr)',
            durationLabel: `${years} year(s)`,
            ratePercent: 12,
            reducedRatePercent: 6,
            amount: amtReduced,
            unreducedAmount: amtUnreduced,
          });
          interestFormulaLines.push(
            `Tier no 3 (> 18 mos @ 12% p.a.): RM ${formatRM(amtUnreduced)} *reduce to 6% (unfamiliar with local laws) = RM ${formatRM(amtReduced)}`
          );
        }
      }
    }
  } else if (era.interestRule === 'flat_12_pa') {
    const completedYears = Math.floor(elapsed.months / 12);
    const interest = roundSen(totalDuty * 0.12 * completedYears);
    primaryInterest = interest;
    interestLines.push({
      tierLabel: 'Statutory Rate (12% p.a.)',
      durationLabel: `${completedYears} year(s)`,
      ratePercent: 12,
      amount: interest,
    });
    interestFormulaLines.push(
      `RM ${formatRM(totalDuty)} × 12% p.a. × ${completedYears} year(s) = RM ${formatRM(interest)}`
    );
  } else if (era.interestRule === 'act_29_tiers') {
    const totalMonthsExact = elapsed.months + elapsed.days / 30.4375;
    // Exact tier classification strictly by months/days:
    // <= 6 mos: (months < 6 || (months === 6 && days === 0))
    // > 6 to <= 18 mos: (months < 18 || (months === 18 && days === 0))
    // > 18 mos: Tier 3
    if (elapsed.months < 6 || (elapsed.months === 6 && elapsed.days === 0)) {
      interestTierNumber = 1;
    } else if (elapsed.months < 18 || (elapsed.months === 18 && elapsed.days === 0)) {
      interestTierNumber = 2;
    } else {
      interestTierNumber = 3;
      isTier3Applied = true;
    }

    if (interestTierNumber === 1) {
      const amt = roundSen(totalDuty * 0.03 * elapsed.equivalentYears);
      primaryInterest = amt;
      interestLines.push({
        tierLabel: 'no 1 (≤ 6 mos)',
        durationLabel: `${elapsed.months} mos ${elapsed.days} day(s)`,
        ratePercent: 3,
        amount: amt,
      });
      interestFormulaLines.push(
        `Tier no 1 (≤ 6 mos @ 3% p.a.): RM ${formatRM(totalDuty)} × 3% × (${elapsed.months}/12 + ${elapsed.days}/365) = RM ${formatRM(amt)}`
      );
    } else if (interestTierNumber === 2) {
      if (interestMethod === 'progressive_tiers') {
        const tier1Amt = roundSen(totalDuty * 0.03 * (6 / 12));
        const remMonths = elapsed.months - 6;
        const remYears = remMonths / 12 + elapsed.days / 365;
        const tier2Amt = roundSen(totalDuty * 0.06 * remYears);
        primaryInterest = roundSen(tier1Amt + tier2Amt);
        interestLines.push(
          {
            tierLabel: 'no 1 (First 6 mos)',
            durationLabel: '6 mos 0 day(s)',
            ratePercent: 3,
            amount: tier1Amt,
          },
          {
            tierLabel: 'no 2 (> 6 to ≤ 18 mos)',
            durationLabel: `${remMonths} mos ${elapsed.days} day(s)`,
            ratePercent: 6,
            amount: tier2Amt,
          }
        );
        interestFormulaLines.push(
          `no 1 (First 6 mos @ 3% p.a.): RM ${formatRM(totalDuty)} × 3% × 6/12 = RM ${formatRM(tier1Amt)}`
        );
        interestFormulaLines.push(
          `no 2 (Next ${remMonths} mos ${elapsed.days} day(s) @ 6% p.a.): RM ${formatRM(totalDuty)} × 6% × (${remMonths}/12 + ${elapsed.days}/365) = RM ${formatRM(tier2Amt)}`
        );
      } else {
        const amt = roundSen(totalDuty * 0.06 * elapsed.equivalentYears);
        primaryInterest = amt;
        interestLines.push({
          tierLabel: 'no 2 (> 6 to ≤ 18 mos)',
          durationLabel: `${elapsed.months} mos ${elapsed.days} day(s)`,
          ratePercent: 6,
          amount: amt,
        });
        interestFormulaLines.push(
          `Tier no 2 (> 6 to ≤ 18 mos @ 6% p.a.): RM ${formatRM(totalDuty)} × 6% × (${elapsed.months}/12 + ${elapsed.days}/365) = RM ${formatRM(amt)}`
        );
      }
    } else {
      // Tier 3 (> 18 months): show *reduce to 6% (unfamiliar with local laws) as primary payable figure
      if (interestMethod === 'progressive_tiers') {
        const tier1Amt = roundSen(totalDuty * 0.03 * (6 / 12));
        const tier2Amt = roundSen(totalDuty * 0.06 * (12 / 12));
        const remMonths = elapsed.months - 18;
        const remYears = remMonths / 12 + elapsed.days / 365;
        const tier3Unreduced = roundSen(totalDuty * 0.12 * remYears);
        const tier3Reduced = roundSen(totalDuty * 0.06 * remYears);

        primaryInterest = roundSen(tier1Amt + tier2Amt + tier3Reduced);
        unreducedInterest12 = roundSen(tier1Amt + tier2Amt + tier3Unreduced);

        interestLines.push(
          {
            tierLabel: 'no 1 (First 6 mos)',
            durationLabel: '6 mos 0 day(s)',
            ratePercent: 3,
            amount: tier1Amt,
          },
          {
            tierLabel: 'no 2 (> 6 to 18 mos)',
            durationLabel: '12 mos 0 day(s)',
            ratePercent: 6,
            amount: tier2Amt,
          },
          {
            tierLabel: 'no 3 (> 18 mos)',
            durationLabel: `${remMonths} mos ${elapsed.days} day(s)`,
            ratePercent: 12,
            reducedRatePercent: 6,
            amount: tier3Reduced,
            unreducedAmount: tier3Unreduced,
          }
        );

        interestFormulaLines.push(
          `no 1 (First 6 mos @ 3% p.a.): RM ${formatRM(totalDuty)} × 3% × 6/12 = RM ${formatRM(tier1Amt)}`
        );
        interestFormulaLines.push(
          `no 2 (6 to 18 mos @ 6% p.a.): RM ${formatRM(totalDuty)} × 6% × 12/12 = RM ${formatRM(tier2Amt)}`
        );
        interestFormulaLines.push(
          `no 3 (Remaining ${remMonths} mos ${elapsed.days} day(s) @ 12% p.a.): RM ${formatRM(tier3Unreduced)} *reduce to 6% (unfamiliar with local laws) = RM ${formatRM(tier3Reduced)}`
        );
      } else {
        const amtUnreduced = roundSen(totalDuty * 0.12 * elapsed.equivalentYears);
        const amtReduced = roundSen(totalDuty * 0.06 * elapsed.equivalentYears);
        primaryInterest = amtReduced;
        unreducedInterest12 = amtUnreduced;

        interestLines.push({
          tierLabel: 'no 3 (> 18 mos)',
          durationLabel: `${elapsed.months} mos ${elapsed.days} day(s)`,
          ratePercent: 12,
          reducedRatePercent: 6,
          amount: amtReduced,
          unreducedAmount: amtUnreduced,
        });
        interestFormulaLines.push(
          `Tier no 3 (> 18 mos @ 12% p.a.): RM ${formatRM(amtUnreduced)} *reduce to 6% (unfamiliar with local laws) = RM ${formatRM(amtReduced)}`
        );
      }
      void totalMonthsExact;
    }
  }

  const totalPayable = roundSen(totalDuty + primaryInterest);
  const totalPayableUnreduced =
    unreducedInterest12 !== null ? roundSen(totalDuty + unreducedInterest12) : null;

  // 1-sentence verification notice
  const isDomicileEra = era.id === 'act_29_1965';
  const domicileText = isDomicileEra
    ? input.domicile === 'malaysian'
      ? 'Malaysia Domiciled schedule applied (1965–1975)'
      : input.domicileSpecified
      ? 'Sabah and Sarawak Non-Malaysian Domiciles schedule applied (1965–1975)'
      : 'Sabah and Sarawak Non-Malaysian Domiciles schedule applied by default (1965–1975)'
    : 'statutory schedule applied (domicile distinction applies only to deaths from 1 January 1965 to 31 December 1975)';

  const tier3Note =
    isTier3Applied && unreducedInterest12 !== null && totalPayableUnreduced !== null
      ? `, noting that the unreduced 12% Tier 3 interest stands at RM ${formatRM(unreducedInterest12)} (total RM ${formatRM(totalPayableUnreduced)})`
      : '';

  const interestTimingClause =
    interestSource === 'declaration_date'
      ? `with interest accrued to the declaration date of ${formatDisplayDate(declTrimmed)} (subject to recalculation to the actual date of payment)`
      : interestSource === 'manual_years'
      ? `with interest calculated for ${manualYears} year(s) (subject to recalculation to the actual date of payment)`
      : `pending the Date of Declaration and actual date of payment`;

  const verificationNotice = `Assessment computed under ${domicileText} ${interestTimingClause} and remains provisional pending formal certification by the Probate Officer${tier3Note}.`;

  return {
    input,
    era,
    overlappingStatutes: overlapping,
    elapsed,
    grossEstate,
    debt,
    estateAfterDebtRaw,
    estateAfterDebt,
    funeralAllowance,
    funeralTwoAndHalfPct,
    funeralFormulaText,
    funeralConfirmationText,
    netEstateRaw,
    netEstate,
    dutyBreakdown,
    totalDuty,
    interestTierNumber,
    interestSource,
    interestPeriodYearsUsed: manualYears,
    interestLines,
    interestFormulaLines,
    primaryInterest,
    unreducedInterest12,
    isTier3Applied,
    totalPayable,
    totalPayableUnreduced,
    verificationNotice,
  };
}

function buildErrorResult(
  input: AssessmentInput,
  era: EraDefinition,
  validationError: string
): AssessmentResult {
  return {
    input,
    era,
    overlappingStatutes: [],
    elapsed: { months: 0, days: 0, totalDays: 0, equivalentYears: 0 },
    grossEstate: 0,
    debt: 0,
    estateAfterDebtRaw: 0,
    estateAfterDebt: 0,
    funeralAllowance: 0,
    funeralTwoAndHalfPct: 0,
    funeralFormulaText: '—',
    funeralConfirmationText: '—',
    netEstateRaw: 0,
    netEstate: 0,
    dutyBreakdown: [],
    totalDuty: 0,
    interestTierNumber: null,
    interestSource: 'pending',
    interestPeriodYearsUsed: null,
    interestLines: [],
    interestFormulaLines: [],
    primaryInterest: 0,
    unreducedInterest12: null,
    isTier3Applied: false,
    totalPayable: 0,
    totalPayableUnreduced: null,
    verificationNotice: validationError,
    validationError,
  };
}

export function generateMarkdownOutput(res: AssessmentResult): string {
  const dod = formatDisplayDate(res.input.dateOfDeath);
  const decl = res.input.dateOfDeclaration.trim()
    ? formatDisplayDate(res.input.dateOfDeclaration)
    : '-';

  const metaRows = [
    `| Field | Details |`,
    `| :--- | :--- |`,
    ...(res.input.name.trim() ? [`| **NAMA SI MATI** | ${res.input.name.trim()} |`] : []),
    `| **TARIKH MENINGGAL DUNIA** | ${dod} |`,
    `| **TARIKH PENGISYTIHARAN** | ${decl} |`,
    `| **PERUNTUKAN UNDANG – UNDANG YANG DIGUNAKAN** | ${res.era.statuteName} |`,
  ];

  const funeralCalcMd = res.funeralFormulaText.replace(/\n/g, '<br>');

  const breakdownLinesMd = res.dutyBreakdown
    .map(
      (b) =>
        `${b.label} (RM ${formatRM(b.taxableAmount)} × ${b.ratePercent}%) = RM ${formatRM(b.dutyAmount)}`
    )
    .join('<br>');

  const estateLine = `Estate : RM ${formatRM(res.grossEstate)} - Debt : RM ${formatRM(res.debt)} - Funeral Expenses : RM ${formatRM(res.funeralAllowance)} = **RM ${formatRM(res.netEstateRaw)}**`;

  const interestCalcMd = res.interestFormulaLines.join('<br>');
  const finalInterestText =
    res.isTier3Applied && res.unreducedInterest12 !== null
      ? `**RM ${formatRM(res.primaryInterest)}** *(unreduced 12%: RM ${formatRM(res.unreducedInterest12)})*`
      : `**RM ${formatRM(res.primaryInterest)}**`;

  const completedYears = Math.floor(res.elapsed.months / 12);
  const interestPeriodText =
    res.interestSource === 'declaration_date'
      ? res.era.interestRule === 'flat_12_pa'
        ? `Pay the duty ${completedYears} year(s) (${res.elapsed.months} months ${res.elapsed.days} day(s)) after date of death`
        : `Pay the duty ${res.elapsed.months} months ${res.elapsed.days} day(s) after date of death`
      : res.interestSource === 'manual_years'
      ? `Interest Period: ${res.interestPeriodYearsUsed} year(s) @ ${
          res.era.interestRule === 'flat_12_pa' ? '12% p.a.' : 'Act 29/1965 tiers'
        }`
      : `Pending Date of Declaration / Payment Date`;

  const tableRows = [
    `**FORMULA PENGIRAAN :**`,
    ``,
    `| No. | Perkara | Pengiraan | Jumlah / Pengesahan |`,
    `| :--- | :--- | :--- | :--- |`,
    `| **1.** | **Jumlah keseluruhan harta** | Estet : RM ${formatRM(res.grossEstate)}<br>Hutang : RM ${formatRM(res.debt)}<br>(Estet - Hutang = **RM ${formatRM(res.estateAfterDebtRaw)}**) | **RM ${formatRM(res.estateAfterDebtRaw)}** |`,
    `| **2.** | **Pengurangan**<br>Kos pengebumian *(funeral expenses)*<br>*\\* 2.5% of net value or RM 1,000.00, whichever is less* | ${funeralCalcMd} | ${res.funeralConfirmationText} |`,
    `| **3.** | **Nilai duti estet** *(Estate duty value)* | ${estateLine}<br><br>${breakdownLinesMd}<br><br>**Total estate duty : RM ${formatRM(res.totalDuty)}** | **Total estate duty : RM ${formatRM(res.totalDuty)}** |`,
    `| **4.** | **Faedah** *(Interest)* :<br><br>${interestPeriodText} | ${interestCalcMd} | ${finalInterestText} |`,
    `| **5.** | **Jumlah duti estet yang perlu dibayar** | | **RM ${formatRM(res.totalDuty)} + RM ${formatRM(res.primaryInterest)} = RM ${formatRM(res.totalPayable)}** |`,
  ];

  return [...metaRows, '', ...tableRows, '', res.verificationNotice].join('\n');
}

export interface PresetCase {
  id: string;
  label: string;
  eraTag: string;
  input: AssessmentInput;
}

export const PRESET_CASES: PresetCase[] = [
  {
    id: 'act29_tier3',
    label: '1971 Act 29 · Delayed Declaration (Tier 3)',
    eraTag: '1965–1975',
    input: {
      name: 'Abang Haji Othman bin Abang Kassim',
      dateOfDeath: '1971-04-12',
      dateOfDeclaration: '1974-09-20',
      grossEstate: 145000,
      debt: 8500,
      domicile: 'malaysian',
      domicileSpecified: true,
      interestMethod: 'progressive_tiers',
    },
  },
  {
    id: 'e2_1938',
    label: '1938 Order No. E-2 · Colonial Rubber Holding',
    eraTag: '1933–1948',
    input: {
      name: 'Wee Boon Tat',
      dateOfDeath: '1938-06-15',
      dateOfDeclaration: '1940-02-10',
      grossEstate: 32000,
      debt: 1200,
      domicile: 'non_malaysian',
      domicileSpecified: false,
    },
  },
  {
    id: 'cap16_1954',
    label: '1954 Cap. 16 · Mid-Century Timber Estate',
    eraTag: '1948–1958',
    input: {
      name: 'Temenggong Koh anak Jubang',
      dateOfDeath: '1954-08-03',
      dateOfDeclaration: '1955-11-19',
      grossEstate: 85000,
      debt: 4000,
      domicile: 'non_malaysian',
      domicileSpecified: false,
    },
  },
  {
    id: 'cap29_1961',
    label: '1961 G.N. S2 Cap. 29 · Kuching Mercantile Estate',
    eraTag: '1958–1964',
    input: {
      name: 'Ong Tiang Swee Estate',
      dateOfDeath: '1961-02-18',
      dateOfDeclaration: '1962-05-28',
      grossEstate: 280000,
      debt: 15000,
      domicile: 'non_malaysian',
      domicileSpecified: false,
    },
  },
  {
    id: 'act224_1981',
    label: '1981 Act 224 · Outside Malaysia Domicile',
    eraTag: '1979–1983',
    input: {
      name: 'Haji Yusuf bin Ibrahim',
      dateOfDeath: '1981-07-22',
      dateOfDeclaration: '1983-01-14',
      grossEstate: 450000,
      debt: 22000,
      domicile: 'non_malaysian',
      domicileSpecified: true,
    },
  },
  {
    id: 'act309_1988',
    label: '1988 Act 309 · High-Value Estate',
    eraTag: '1984–1991',
    input: {
      name: 'Datuk Patinggi Estate',
      dateOfDeath: '1988-09-05',
      dateOfDeclaration: '1990-03-11',
      grossEstate: 3250000,
      debt: 120000,
      domicile: 'malaysian',
      domicileSpecified: true,
    },
  },
  {
    id: 'act476_1995',
    label: '1995 Act 476 · Post-Repeal Assessment',
    eraTag: '1991+',
    input: {
      name: 'Siti Mariam binti Dollah',
      dateOfDeath: '1995-03-14',
      dateOfDeclaration: '1996-06-01',
      grossEstate: 680000,
      debt: 45000,
      domicile: 'malaysian',
      domicileSpecified: true,
    },
  },
];

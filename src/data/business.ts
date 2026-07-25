// Every value here traces to a field in ../../facts.json. Nothing is invented.
import facts from "../../facts.json";

export const NAME = facts.name; // "MAKKAWI BARBERSHOP"
export const RATING = facts.rating; // 4.9
export const REVIEW_COUNT = facts.reviewCount; // 580
export const PLUS_CODE = facts.plusCode; // "XR5Q+P4 Amman"
export const MAPS_URL = facts.mapsUrl;
export const REVIEW_URL = facts.reviewUrl;
export const PLACE_ID = facts.placeId;
export const PHONE_DISPLAY = facts.phoneLocal; // "07 9637 9479"

/**
 * `phoneIntl` is a human-readable string with spaces ("+962 7 9637 9479").
 * A tel: href must be digits + one leading "+" only.
 */
export const PHONE_TEL = "+" + facts.phoneIntl.replace(/[^\d]/g, "");

/** `whatsappNumber` is a DIFFERENT field: already digits-only, no "+", no spaces. */
export const WA_NUMBER = facts.whatsappNumber; // "962796379479"

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Google Maps embed. `lat`/`lng` are null in facts.json, so we do NOT fabricate a
 * coordinate pin — we query by the real Plus Code, which is itself a precise
 * geographic identifier captured from the business profile.
 */
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  PLUS_CODE,
)}&output=embed`;

/* ---------------------------------------------------------------------------
 * Hours — parsed from facts.json `hoursRaw`, verbatim. Every day 9 AM–11 PM
 * EXCEPT Wednesday, which opens 9:30 AM. That variance is real and is surfaced,
 * not flattened.
 * ------------------------------------------------------------------------ */

type Day = {
  /** JS Date.getDay() index */
  index: number;
  en: string;
  ar: string;
  open: string;
  close: string;
  /** minutes from midnight */
  openMin: number;
  closeMin: number;
  variant: boolean;
};

const DAY_INDEX: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const DAY_AR: Record<string, string> = {
  Sunday: "الأحد",
  Monday: "الاثنين",
  Tuesday: "الثلاثاء",
  Wednesday: "الأربعاء",
  Thursday: "الخميس",
  Friday: "الجمعة",
  Saturday: "السبت",
};

/** "9 AM" | "9:30 AM" | "11 PM" -> minutes from midnight */
function toMinutes(t: string): number {
  const m = t.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!m) return NaN;
  let h = parseInt(m[1], 10) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return h * 60 + (m[2] ? parseInt(m[2], 10) : 0);
}

export const HOURS: Day[] = facts.hoursRaw
  .map((line) => {
    // "Saturday, 9 AM to 11 PM"
    const m = line.match(/^(\w+),\s*(.+?)\s+to\s+(.+)$/);
    if (!m) return null;
    const [, dayEn, open, close] = m;
    if (!(dayEn in DAY_INDEX)) return null;
    return {
      index: DAY_INDEX[dayEn],
      en: dayEn,
      ar: DAY_AR[dayEn],
      open,
      close,
      openMin: toMinutes(open),
      closeMin: toMinutes(close),
      variant: false,
    };
  })
  .filter((d): d is Day => d !== null && !Number.isNaN(d.openMin));

// Flag any day whose opening time differs from the majority — Wednesday, here.
{
  const counts = new Map<number, number>();
  for (const d of HOURS) counts.set(d.openMin, (counts.get(d.openMin) ?? 0) + 1);
  let majority = -1;
  let best = -1;
  for (const [min, n] of counts) if (n > best) ((best = n), (majority = min));
  for (const d of HOURS) d.variant = d.openMin !== majority;
}

/** "09:00" / "23:00" — for schema.org openingHoursSpecification */
function pad(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export const HOURS_SCHEMA = HOURS.map((d) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: `https://schema.org/${d.en}`,
  opens: pad(d.openMin),
  closes: pad(d.closeMin),
}));

/** Client-side "open now" payload — the browser computes against Asia/Amman. */
export const HOURS_CLIENT = HOURS.map((d) => ({
  index: d.index,
  openMin: d.openMin,
  closeMin: d.closeMin,
}));

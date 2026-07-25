// Single, shallow module that imports every USABLE photo from ../../photos/ once.
//
// PHOTO AUDIT (verified by opening every file — see brief.md §0):
//   photo-7.jpg  — sign reads "صالون كمال" + a "SINCE 1989" graphic. DIFFERENT BUSINESS. Excluded.
//   photo-10.jpg — street shot of "SALOON عايد FOR MEN".          DIFFERENT BUSINESS. Excluded.
//   photo-11.jpg — "Gemini Barbershop" team photo carrying their logo,
//                  two phone numbers and their social handles.     DIFFERENT BUSINESS. Hard-excluded.
// Those three are intentionally NOT imported here so they cannot reach a component.
// Usable pool: 8.

import storefront from "../../photos/photo-2.jpg"; // red awning "SALOON ALI MAKKAWI FOR MEN"
import barberAtWork from "../../photos/photo-5.jpg"; // barber in a MAKKAWI BARBER SHOP polo
import interiorWide from "../../photos/photo-8.jpg"; // wide interior, product wall + stations
import interiorChairs from "../../photos/photo-1.jpg"; // chairs + tall mirrors
import beardComb from "../../photos/photo-3.jpg"; // comb + shears on a shaped beard
import razorLineup from "../../photos/photo-4.jpg"; // straight razor edging a temple line
import kidCut from "../../photos/photo-6.jpg"; // child mid-haircut, smiling
import washStation from "../../photos/photo-9.jpg"; // wash station, window onto Amman at dusk

export const photos = {
  storefront,
  barberAtWork,
  interiorWide,
  interiorChairs,
  beardComb,
  razorLineup,
  kidCut,
  washStation,
};

export type PhotoKey = keyof typeof photos;

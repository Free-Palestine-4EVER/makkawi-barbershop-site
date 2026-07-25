# Design Brief — MAKKAWI BARBERSHOP (صالون مكاوي), Amman

Source of truth: `./facts.json`. Every fact below is traced to a field in it. Anything not in it is either flagged `[GENERIC]` (category-standard knowledge) or flagged as unbuildable.

---

## 0. Photo audit — READ THIS BEFORE ANY LAYOUT WORK

I opened all 11 files in `photos/`. They are **not** a uniform set, and three of them show **other businesses**. Using them would put a competitor's name and phone number on this client's homepage. Binding allowlist:

| File | Contents | Use |
|---|---|---|
| `photo-2.jpg` | **The real storefront** — red awning, "SALOON ALI MAKKAWI FOR MEN", phone `0796379479` (matches `phoneLocal`), scissors mark | **HERO / signature asset.** Only verified branded exterior. |
| `photo-5.jpg` | Barber mid-cut in a black polo embroidered "MAKKAWI BARBER SHOP" | **HERO-GRADE.** Only verified in-action branded shot. |
| `photo-8.jpg` | Wide interior — black barber chairs, wood stations, product wall, track lighting | Primary interior / about section |
| `photo-1.jpg` | Interior, black leather chairs + tall mirrors, white walls | Gallery |
| `photo-3.jpg` | Close-up: comb + shears on a shaped beard | Gallery — beard service tile |
| `photo-4.jpg` | Close-up: straight razor edging a temple/brow line | Gallery — shave/line-up tile |
| `photo-6.jpg` | Child mid-haircut, smiling | Gallery — kids service tile |
| `photo-9.jpg` | Wash station, window onto the Amman skyline at dusk | Gallery — the one "Amman" establishing shot |
| `photo-7.jpg` | Signage reading **صالون كمال** — a *different* shop | **DO NOT SHIP AS-IS.** Only permissible tightly cropped to the anonymous scissors/blade illustration with no legible text. Default: exclude. |
| `photo-10.jpg` | Street view, **"SALOON عايد FOR MEN"** — a different shop, low quality | **EXCLUDE.** |
| `photo-11.jpg` | **"Gemini Barbershop"** team photo with their logo, their two phone numbers, their socials | **EXCLUDE — hard block.** Shipping this is a live brand-safety failure. |

**Net usable pool: 8 photos.** Every layout decision below is sized to 8, not 11. This is also why the palette is derived from a real asset instead of guessed: `photo-2.jpg` gives us the brand's actual red.

---

## 1. Archetype

**Salon/barber — services + WhatsApp-booking-led, with a craft-gallery spine.**

Justification from the data:
- `category: "Barber shop"` and the photo set is 100% craft-in-progress and room imagery — no products to sell, no menu with prices, no bookable class schedule. So: not retail, not restaurant, not gym.
- `menuOrServices` is empty and there is **no online booking URL** (`website: null`). The single conversion path this business actually has is the phone: `phoneIntl` + `whatsappNumber`. WhatsApp is how Amman books a barber. Every scroll depth must have a WhatsApp CTA within a thumb's reach.
- `rating: 4.9` / `reviewCount: 580` is an exceptionally strong signal — 580 reviews at 4.9 is a neighbourhood institution. But `reviews: []` means **zero quotable text**. The trust story therefore has to be carried by *numerals*, not testimonials. This inverts the usual salon template: the stat block is a headline element, not a footnote.
- No before/after pairs exist in the photo set, so the classic barber "before/after slider" is **unbuildable** — do not fake it by pairing two unrelated photos.

### Layout geometry devices (implement these, not a centered stack)

1. **Asymmetric split hero with an off-bleed angled storefront plate.** Left column (60%) holds the type stack on flat `--bg`; right column holds `photo-2.jpg` (the red awning) in a plate that is rotated ~-3°, bleeds off the right and bottom edges, and is clipped so the red awning band lands roughly on the hero's optical centerline. The real red awning becomes the hero's color event — the accent isn't decorative, it's photographic. A thin `--accent` rule runs from the type stack under the plate, continuing the awning's line.
2. **Bento mosaic gallery, 8 tiles, deliberately uneven.** Exactly matches the usable pool. Suggested grid (12-col, 4 rows): `photo-8` at 6×2 (the anchor), `photo-5` at 3×2 portrait, `photo-9` at 3×2 portrait, then `photo-1`, `photo-3`, `photo-4`, `photo-6` as 3×1 tiles, and one tile is **not a photo** — it's a `--accent`-filled panel holding the "4.9 ★ / 580" stat, so the trust number is physically embedded in the craft evidence. `photo-2` stays reserved for the hero so it doesn't lose its impact.
3. Section transitions use a **-3° diagonal divider** echoing the hero plate's rotation — the awning angle becomes the site's structural motif.

---

## 2. Palette

Sampled from `photo-2.jpg` (the real red awning + stone facade) and `photo-8.jpg` (black leather chairs, white walls, warm wood, black track lighting). This is the shop's actual color story, not a barber-shop cliché.

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#12100F` | Near-black, warm-shifted — the black leather + night storefront |
| `--surface` | `#1D1A18` | Raised cards, sticky nav, bento tiles |
| `--text` | `#F2EDE6` | Warm bone — the shop's white walls and stone facade, never pure `#FFF` |
| `--accent` | `#E11D33` | **The awning red**, lifted for screen legibility |
| `--accent-2` | `#D8A657` | Warm brass — the wood stations and tungsten bulbs; used for the rating ring, stars, and hairlines |

**Contrast verification (WCAG 2.1, vs `--bg #12100F`):**
- `--text #F2EDE6` → **16.3:1** — passes AAA. **Use this pair for all body text.**
- `--accent-2 #D8A657` → **8.6:1** — passes AA/AAA. Safe for small accent text, numerals, links.
- `--accent #E11D33` → **4.0:1** — **fails AA for body text.** Constraint for the build: red is permitted only for ≥24px display type, ≥18.66px bold, filled buttons (with `--text` on top: `#F2EDE6` on `#E11D33` = 4.1:1, so button labels must be ≥18px bold), rules, and non-text UI. **Never set body copy or small labels in `--accent`.** Where a small accent-colored element is needed, use `--accent-2`.

---

## 3. Type pair

- **Arabic + body (both scripts): IBM Plex Sans Arabic** — `@fontsource/ibm-plex-sans-arabic`, weights 400 / 500 / 600 / 700. Chosen deliberately over Cairo (over-defaulted) and Readex Pro (too soft/friendly): Plex Arabic is engineered, precise, slightly blade-like in its terminals — it reads as *tools and craft*, which is exactly this business's register. It ships a matching Latin, so Arabic and English body copy sit at identical color and rhythm with no pairing seam.
- **Latin display: Archivo Variable** — `@fontsource-variable/archivo`, using the **width axis pushed to Expanded** at weight 700–800. Grotesk with a squared, signage-like build — it rhymes with the real storefront lettering in `photo-2.jpg` without imitating it. For Arabic display, use **IBM Plex Sans Arabic 700 with tight tracking**; do not stretch Arabic to fake the Expanded width.

**Hero typographic decision:** a small, wide-tracked eyebrow label (`0.72rem`, `+0.22em` tracking, `--accent-2`, uppercase Latin / Arabic at 500) sitting above the pair; then **"MAKKAWI" set oversized in Archivo Expanded 800 at `clamp(3.5rem, 11vw, 9rem)` with tracking pulled to `-0.02em`, and "BARBERSHOP" directly beneath it at roughly one-third the size in Archivo 300 with `+0.3em` tracking** — heavy word / thin word, the mass contrast doing the work. The Arabic lockup «صالون مكاوي» sits in the same stack at ~40% of the display size in Plex Arabic 600, `--accent-2`, and is never demoted below the fold.

---

## 4. Offering / services content

`menuOrServices` in facts.json is **empty (0 items)** — there is no genuine sourced service list and no genuine price for this business. Therefore:

### GENERIC — CATEGORY-TYPICAL, NOT VERIFIED PER-BUSINESS FACTS, NO PRICES

Standard offerings any Amman barbershop customer already assumes. **Ship all seven. Do not display a price, a duration, or a "from JD" figure next to any of them — none exists in facts.json and inventing one is prohibited.**

1. **Haircut** — قصة شعر `[GENERIC]`
2. **Skin Fade** — تدريج (فيد) `[GENERIC]`
3. **Beard Trim & Shape-Up** — تهذيب وتحديد اللحية `[GENERIC]`
4. **Hot Towel Shave** — حلاقة بالمنشفة الساخنة `[GENERIC]`
5. **Line-Up / Edge Work** — تحديد `[GENERIC]`
6. **Kids Haircut** — قصة أطفال `[GENERIC]`
7. **Hair Wash & Style** — غسيل وتصفيف `[GENERIC]`

**Build notes:** four of these have direct photographic support in the usable pool — pair **Beard Trim → `photo-3`**, **Hot Towel Shave / Line-Up → `photo-4`**, **Haircut / Skin Fade → `photo-5`**, **Kids Haircut → `photo-6`**, **Hair Wash & Style → `photo-9`**. Cards without a matching photo take a `--surface` panel with an `--accent-2` hairline icon instead, so the row never looks half-populated.

Where a price would normally sit, put a **WhatsApp "اسأل عن السعر / Ask about pricing" chip** deep-linking to `wa.me/962796379479` with a service-specific prefilled message. This converts a data gap into the site's strongest CTA surface rather than leaving a visible hole.

---

## 5. Trust / why-choose-us

Real, sourced from facts.json — this section is the load-bearing trust element because `reviews` is empty.

**Stat block (`[REAL]`, from `rating` + `reviewCount`):**
- **4.9** — animated rating ring, with 5 stars in `--accent-2` (4.9 rendered honestly: 4 full + one ~90% clipped star)
- **580** — count-up numeral, labelled "تقييم على خرائط جوجل / Google reviews"
- Small caption: "التقييمات من ملف النشاط على خرائط جوجل — Ratings from our Google Business profile", with the star row linking to `mapsUrl` and a secondary "اكتب تقييمك / Leave a review" link to `reviewUrl`.

**Craft-pride lines (`[GENERIC]` — category-standard, no unverifiable specifics):**
1. **أدوات معقّمة لكل زبون** — "Sterilised tools, fresh for every client"
2. **تدريج نظيف وخطوط مضبوطة** — "Clean fades, sharp lines"
3. **مفتوح كل يوم حتى ١١ مساءً** — "Open every day until 11 PM" — *this one is `[REAL]`*, derived from `hoursRaw`: all seven days close at 11 PM. A genuinely strong differentiator; do not bury it.

**Explicitly forbidden here:** years in business, number of barbers, number of clients served, awards, "since 19xx". None are in facts.json. Note that `photo-7.jpg` contains a "SINCE 1989" graphic — **that belongs to a different shop and must never be transcribed as this business's founding date.**

---

## 6. Signature moment

### PRIMARY — "The 4.9 / 580 reveal"

A full-viewport, scroll-pinned trust moment. `--bg` clears; a large `--accent-2` **rating ring draws from 0° to 352.8° (4.9/5)** on an SVG stroke tied to scroll progress, while **580 counts up** in Archivo Expanded 800 at display scale in the ring's center, and the five stars stagger in behind it. As the ring completes, it snaps to `--accent` red for ~200ms and settles back to brass. Beneath, the three craft-pride lines wipe up in sequence.

**Why this and not something else:** the data shape dictates it. `rating: 4.9` + `reviewCount: 580` is by far the most persuasive asset this business owns, and `reviews: []` means it cannot be told through quotes. The site's most memorable moment therefore has to *be* the number. A 4.9 from 580 people is a rare figure and deserves to be the thing a visitor remembers.

### SUPPORTING BEAT 1 — Duotone-to-color wipe on the bento mosaic

The 8 gallery tiles load in a `--bg`/`--accent-2` duotone and resolve to full color on scroll-enter, staggered on a diagonal matching the -3° section dividers; on hover a tile lifts, un-duotones instantly, and reveals its Arabic service caption sliding up from the lower edge. **Why:** 8 usable photos of genuinely mixed provenance and color temperature (`photo-4`'s blue gloves vs `photo-2`'s red awning vs `photo-9`'s dusk blue) — a duotone pass is what makes a scavenged set read as one art-directed system, and the reveal turns that unification into an intentional effect.

### SUPPORTING BEAT 2 — Magnetic dual-CTA cluster with an always-live WhatsApp rail

The paired **اتصل / Call** (`+962 7 9637 9479`) and **واتساب / WhatsApp** (`wa.me/962796379479`) buttons magnetically track the cursor within ~40px, the red button carrying a slow `--accent` glow pulse; on mobile the WhatsApp button detaches into a persistent bottom-right FAB after the hero exits. **Why:** with `website: null` and no booking system, WhatsApp *is* the conversion funnel — the only interaction on this site that produces revenue deserves motion the others don't get.

---

## 7. Section list (8 sections, in order)

1. **Hero** — asymmetric split, angled `photo-2.jpg` plate.
   *Feeds:* `name`, `category`, `address`, `rating`, `reviewCount`, `phoneIntl`, `whatsappNumber`, `photos[1]`.
   *Omitted:* `nameAr` is null → render the Arabic lockup as a **transliteration of the real name**, «صالون مكاوي». No invented alternate name. Note the storefront in `photo-2.jpg` independently reads "SALOON ALI MAKKAWI" — treat "مكاوي / MAKKAWI" as the display name and do not introduce "Ali" as a person's name in copy, since facts.json names no individual.

2. **About / story** — short, three sentences maximum, over `photo-8.jpg`.
   *Feeds:* `category`, `address` ("Amman"), `rating`, `reviewCount`, `hoursRaw`.
   *Omitted:* no bio, founding year, owner name, or team names exist. **Do not write a founding story.** The honest frame is: a barbershop in Amman, open every day 9 AM–11 PM, rated 4.9 by 580 people. That is the whole story and it is enough.

3. **Services** — 7 `[GENERIC]` cards from §4, photo-paired where possible, WhatsApp pricing chips.
   *Feeds:* `category`, `whatsappNumber`, `photos[3,4,5,6,9]`.
   *Omitted:* **no prices, no durations** — `menuOrServices` is empty. The cards ship regardless; the price line simply does not exist as an element.

4. **Gallery** — 8-tile bento mosaic + embedded stat tile, duotone wipe.
   *Feeds:* `photos` (8 of 11), `rating`, `reviewCount`.
   *Omitted:* `photo-7`, `photo-10`, `photo-11` excluded per §0 — they show other businesses. **No before/after slider** — no before/after pairs exist in the set; do not manufacture one.

5. **Trust / why-choose-us — "The 4.9 / 580 reveal"** — primary signature moment.
   *Feeds:* `rating`, `reviewCount`, `hoursRaw`, `mapsUrl`, `reviewUrl`.
   *This section absorbs social proof.* `reviews` is empty → **no quote carousel, no testimonial cards, no review author names or avatars.** Not a single line of review text may be written. The stat block plus a link to `mapsUrl` ("اقرأ التقييمات على جوجل / Read all 580 reviews on Google") is the complete social-proof story — outbound to the real reviews rather than inventing local ones.

6. **Location** — map panel + directions.
   *Feeds:* `address` ("Amman"), `plusCode` ("XR5Q+P4 Amman"), `mapsUrl`.
   *Omitted:* **`lat`/`lng` are null → no pinned-coordinate embedded map, no interactive Leaflet/Mapbox canvas, no "we're here" marker animation.** Substitute: a `--surface` panel with a stylised `--accent-2` line-art street pattern (decorative, non-geographic — must not imply a real street layout), the Plus Code `XR5Q+P4 Amman` set large in Archivo Expanded as the addressable fact, and a full-width **"افتح في خرائط جوجل / Open in Google Maps"** button to `mapsUrl` (which resolves by `placeId`, so it lands accurately without coordinates). Also render "عمّان، الأردن / Amman, Jordan" — `addressAr` is null, so use standard Arabic for the city; no street address exists to display.

7. **Contact** — magnetic dual-CTA cluster (supporting beat 2).
   *Feeds:* `phoneLocal` (display), `phoneIntl` (`tel:` href), `whatsappNumber` (`wa.me` href).
   *Omitted:* `instagram`, `facebook`, `website` all null → **no social icon row.** Do not render greyed-out or placeholder social icons; the cluster is two buttons, and it should look deliberately two-button, not truncated. No email field or contact form — no email address exists and there is no backend to receive one.

8. **Footer** — full weekly hours table + "open now" state.
   *Feeds:* `hoursRaw` (all 7 lines, verbatim), `name`, `phoneLocal`, `plusCode`, `mapsUrl`, `reviewUrl`.
   *Detail worth designing around:* every day is 9 AM–11 PM **except Wednesday, which opens 9:30 AM.** Render the table honestly — the Wednesday variance is a small authenticity signal, so highlight it in `--accent-2` rather than flattening all seven rows to "9 AM – 11 PM". Include a live client-side "مفتوح الآن / Open now" pill computed against Amman time (Asia/Amman).

---

## 8. Tone of voice

Write as an Ammani would speak to a regular: **white Arabic with a Jordanian warmth** — direct, confident, a little proud, never flowery MSA and never the stiff cadence of machine translation. Short sentences. Address the reader as **إنت**, not the formal plural. The English is a *parallel* voice, not a translation — same swagger, contraction-friendly, written for a bilingual Amman reader who switches mid-sentence anyway. Ban translationese artifacts: no «نحن نقدم أفضل الخدمات», no "We provide high-quality services to our valued customers."

**Example hero headline:**
> **حلاقتك عنّا، تمام من أول مرة.**
> *"Sharp lines. Every single time."*

(Not a literal translation — the Arabic leans on «تمام», the everyday Jordanian word for *exactly right*; the English carries the same confidence through barber vocabulary instead.)

**Bilingual requirements — mandatory, not optional:**
- Ship **Arabic-first with full RTL** (`dir="rtl"`, logical CSS properties throughout — `margin-inline`, `padding-inline`, `inset-inline`, never `left`/`right`), with an EN/ع toggle in the nav that flips `dir` and swaps the copy. Both languages ship at launch; **English-only or "Arabic to follow" is not acceptable.**
- `nameAr` is null → use the **natural transliteration of the real name only**: «صالون مكاوي» (or «مكاوي باربر شوب» in mixed contexts). Never invent an Arabic alternate name.
- `categoryAr` is null → use the standard Amman term **«صالون رجالي»** ("Barber shop" / men's salon).
- `addressAr` is null → **«عمّان، الأردن»**. No street or district may be added — none exists in facts.json.
- Numerals: use Western Arabic digits (4.9, 580, 9:30) in both language modes — that is what Jordanian sites and signage actually use; Eastern Arabic-Indic numerals would read as affected here. Note the storefront in `photo-2.jpg` prints its own phone number in Western digits.

---

## Hard prohibitions (carry into the build)

- No invented prices, durations, staff names, owner names, founding years, or years-in-business.
- No fabricated review text, reviewer names, or star-rating breakdowns. `reviews` is empty and stays empty.
- No `photo-7`, `photo-10`, or `photo-11` — they depict other businesses (كمال, عايد, Gemini Barbershop). `photo-11` in particular carries a competitor's logo, phone numbers, and social handles.
- No "SINCE 1989" — that text belongs to a different shop's sign in `photo-7.jpg`.
- No pinned-coordinate map; no social links; no contact form; no before/after slider.

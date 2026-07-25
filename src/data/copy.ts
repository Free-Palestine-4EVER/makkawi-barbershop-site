import { NAME, PHONE_DISPLAY, PLUS_CODE, RATING, REVIEW_COUNT } from "./business";

export type Lang = "ar" | "en";

export const LANGS: Lang[] = ["ar", "en"];
export const DEFAULT_LANG: Lang = "ar";
export const DIR: Record<Lang, "rtl" | "ltr"> = { ar: "rtl", en: "ltr" };

/**
 * `nameAr` is null in facts.json. We use a natural transliteration of the REAL
 * name only — never an invented alternate name. The storefront in photo-2.jpg
 * independently reads "SALOON ALI MAKKAWI FOR MEN"; facts.json names no person,
 * so "Ali" is never introduced as a person in copy.
 */
export const NAME_AR = "صالون مكاوي";
/** `categoryAr` is null -> the standard Amman term. */
export const CATEGORY_AR = "صالون رجالي";
/** `addressAr` is null -> standard Arabic for the city. No street exists in facts.json. */
export const CITY_AR = "عمّان، الأردن";
export const CITY_EN = "Amman, Jordan";

/* WhatsApp message builders — Arabic greeting mentioning the business by name. */
export const waGeneral =
  `مرحباً، شفت موقعكم — بدي أحجز دور في ${NAME_AR} (${NAME}).`;
export const waService = (serviceAr: string, serviceEn: string) =>
  `مرحباً، شفت موقعكم — بدي أسأل عن سعر «${serviceAr}» (${serviceEn}) في ${NAME_AR} (${NAME}).`;

/* ---------------------------------------------------------------------------
 * SERVICES
 * facts.json `menuOrServices` is EMPTY. These seven are generic, category-standard
 * offerings any Amman barbershop customer already assumes. No price, no duration,
 * no "starting from" is attached to any of them — none exists.
 * ------------------------------------------------------------------------ */
export type Service = {
  id: string;
  ar: string;
  en: string;
  lineAr: string;
  lineEn: string;
  /** key into src/data/photos.ts, or null -> typographic panel instead */
  photo: "barberAtWork" | "beardComb" | "razorLineup" | "kidCut" | "washStation" | null;
};

export const SERVICES: Service[] = [
  {
    id: "haircut",
    ar: "قصة شعر",
    en: "Haircut",
    lineAr: "قصة مضبوطة على شكل راسك، وبدون استعجال.",
    lineEn: "A cut shaped to your head. Never rushed.",
    photo: "barberAtWork",
  },
  {
    id: "fade",
    ar: "تدريج · فيد",
    en: "Skin Fade",
    lineAr: "تدريج ناعم من الجلد لفوق، بدون خطوط ناشزة.",
    lineEn: "A clean gradient from the skin up. No hard steps.",
    photo: null,
  },
  {
    id: "beard",
    ar: "تهذيب وتحديد اللحية",
    en: "Beard Trim & Shape-Up",
    lineAr: "نشكّل لحيتك ونحدّدها بخطوط واضحة.",
    lineEn: "Shaped, evened out, and squared off at the edges.",
    photo: "beardComb",
  },
  {
    id: "shave",
    ar: "حلاقة بالمنشفة الساخنة",
    en: "Hot Towel Shave",
    lineAr: "منشفة ساخنة وموس، وبشرة مرتاحة بعدها.",
    lineEn: "Hot towel, straight razor, skin that feels it after.",
    photo: "razorLineup",
  },
  {
    id: "lineup",
    ar: "تحديد وخطوط",
    en: "Line-Up & Edge Work",
    lineAr: "خط الجبهة والرقبة مضبوط بالموس.",
    lineEn: "Hairline and neck, razored straight.",
    photo: null,
  },
  {
    id: "kids",
    ar: "قصة أطفال",
    en: "Kids Haircut",
    lineAr: "قصة للولاد بهدوء وصبر — وبدون بكي.",
    lineEn: "Kids' cuts, patient and calm. No tears.",
    photo: "kidCut",
  },
  {
    id: "wash",
    ar: "غسيل وتصفيف",
    en: "Hair Wash & Style",
    lineAr: "غسيل وتصفيف يخلّيك جاهز عالطول.",
    lineEn: "Washed, styled, out the door ready.",
    photo: "washStation",
  },
];

/* ------------------------------------------------------------------------ */

type Dict = {
  htmlLang: string;
  title: string;
  description: string;
  ogAlt: string;
  skip: string;
  /* nav */
  navItems: { id: string; label: string }[];
  langSwitch: string;
  langSwitchAria: string;
  /* hero */
  heroEyebrow: string;
  heroLockup: string;
  heroTagline: string;
  heroSub: string;
  ctaCall: string;
  ctaWhatsapp: string;
  heroRating: string;
  heroScroll: string;
  /* ticker */
  ticker: string[];
  /* about */
  aboutEyebrow: string;
  aboutHeading: string;
  aboutBody: string[];
  aboutQuote: string;
  /* services */
  servicesEyebrow: string;
  servicesHeading: string;
  servicesNote: string;
  askPrice: string;
  /* gallery */
  galleryEyebrow: string;
  galleryHeading: string;
  galleryStatLabel: string;
  captions: Record<string, string>;
  /** Descriptive alt text, per language. Keyed the same as src/data/photos.ts. */
  alts: Record<string, string>;
  lightboxClose: string;
  /* trust */
  trustEyebrow: string;
  trustHeading: string;
  trustOutOf: string;
  trustReviewsLabel: string;
  trustCaption: string;
  trustReadAll: string;
  trustLeave: string;
  craft: { ar?: never; title: string; line: string }[];
  /* location */
  locEyebrow: string;
  locHeading: string;
  locPlusLabel: string;
  locCity: string;
  locNote: string;
  locOpenMaps: string;
  locMapTitle: string;
  /* contact */
  contactEyebrow: string;
  contactHeading: string;
  contactLine: string;
  contactPhoneLabel: string;
  contactWaLabel: string;
  contactWaValue: string;
  /* footer */
  hoursHeading: string;
  openNow: string;
  closedNow: string;
  footerRights: string;
  footerRate: string;
  days: Record<string, string>;
  timeFmt: (t: string) => string;
};

const EN_TIME = (t: string) => t;
/** Western digits in both languages — that's what Jordanian sites and signage use. */
const AR_TIME = (t: string) =>
  t.replace(/\bAM\b/, "ص").replace(/\bPM\b/, "م");

export const COPY: Record<Lang, Dict> = {
  ar: {
    htmlLang: "ar",
    title: `${NAME_AR} — ${CATEGORY_AR} في عمّان | ${NAME}`,
    description: `${CATEGORY_AR} في عمّان. قصّات، تدريج، لحية، وحلاقة بالمنشفة الساخنة. مفتوح كل يوم حتى 11 مساءً. تقييم ${RATING} من ${REVIEW_COUNT} زبون على جوجل. احجز دورك عالواتساب.`,
    ogAlt: `واجهة ${NAME_AR} في عمّان بالتندة الحمراء`,
    skip: "تخطَّ إلى المحتوى",
    navItems: [
      { id: "about", label: "عنّا" },
      { id: "services", label: "الخدمات" },
      { id: "gallery", label: "الصالون" },
      { id: "trust", label: "التقييم" },
      { id: "location", label: "الموقع" },
      { id: "contact", label: "احجز" },
    ],
    langSwitch: "EN",
    langSwitchAria: "Switch to English",
    heroEyebrow: `${CATEGORY_AR} · عمّان`,
    heroLockup: NAME_AR,
    heroTagline: "حلاقتك عنّا، تمام من أول مرة.",
    heroSub:
      "مفتوح كل يوم من 9 الصبح لـ 11 بالليل. احجز دورك عالواتساب قبل ما تيجي.",
    ctaCall: "اتصل فينا",
    ctaWhatsapp: "واتساب",
    heroRating: `من ${REVIEW_COUNT} تقييم على خرائط جوجل`,
    heroScroll: "انزل",
    ticker: [
      `${RATING} ★ على خرائط جوجل`,
      `${REVIEW_COUNT} تقييم`,
      "مفتوح كل يوم حتى 11 مساءً",
      "أدوات معقّمة",
      "تدريج نظيف وخطوط مضبوطة",
      "عمّان",
    ],
    aboutEyebrow: "عنّا",
    aboutHeading: "الحكاية قصيرة.",
    aboutBody: [
      `${CATEGORY_AR} في عمّان — كرسي، مرايا، وشغل مضبوط.`,
      "مفتوح كل يوم من الساعة 9 الصبح لحد 11 بالليل، بدون عطلة أسبوعية.",
      `و${REVIEW_COUNT} زبون حطولنا ${RATING} على جوجل. هاي الحكاية كلها، وبتكفي.`,
    ],
    aboutQuote: "تمام من أول مرة.",
    servicesEyebrow: "الخدمات",
    servicesHeading: "شو منعمل",
    servicesNote:
      "الأسعار بتفرق حسب الشغل — اسألنا عالواتساب وبنجاوبك عالطول.",
    askPrice: "اسأل عن السعر",
    galleryEyebrow: "من جوّا",
    galleryHeading: "شوف الصالون",
    galleryStatLabel: "تقييم على خرائط جوجل",
    captions: {
      interiorWide: "الصالون من جوّا — كراسي، مرايا، ورف المنتجات",
      barberAtWork: "قصة شعر",
      washStation: "كرسي الغسيل، وإطلالة على عمّان",
      interiorChairs: "كراسي الحلاقة والمرايا",
      beardComb: "تهذيب وتحديد اللحية",
      razorLineup: "تحديد بالموس",
      kidCut: "قصة أطفال",
      storefront: "واجهة الصالون",
    },
    // No individual is named in facts.json, so the storefront alt describes
    // the awning without transcribing the personal name printed on the sign.
    alts: {
      storefront:
        "واجهة صالون مكاوي في عمّان — تندة حمراء عليها اسم الصالون، والصالون مضاء من جوّا",
      interiorWide:
        "داخل صالون مكاوي — كراسي حلاقة سوداء، مرايا طويلة، طاولات خشب، ورف منتجات على الحيط",
      barberAtWork:
        "حلاق بقميص مكتوب عليه MAKKAWI BARBER SHOP عم يقصّ شعر زبون بالمقص والمشط",
      washStation: "كرسي غسيل الشعر جنب شبّاك بيطلّ على عمّان وقت المغرب",
      interiorChairs: "كراسي جلد سوداء ومرايا طويلة على حيط أبيض داخل الصالون",
      beardComb: "مشط ومقص عم يهذّبوا لحية زبون مشكّلة",
      razorLineup: "موس حلاقة عم يحدّد خط الصدغ والحاجب بدقّة",
      kidCut: "ولد صغير مبتسم قاعد على كرسي الحلاقة أثناء قصّة شعره",
    },
    lightboxClose: "إغلاق",
    trustEyebrow: "التقييم",
    trustHeading: "الرقم بحكي عنّا",
    trustOutOf: "من 5",
    trustReviewsLabel: "تقييم على خرائط جوجل",
    trustCaption:
      "التقييمات مأخوذة من ملف النشاط على خرائط جوجل.",
    trustReadAll: `اقرأ الـ ${REVIEW_COUNT} تقييم على جوجل`,
    trustLeave: "اكتب تقييمك",
    craft: [
      { title: "أدوات معقّمة", line: "لكل زبون أدوات نظيفة ومعقّمة. بدون استثناء." },
      { title: "تدريج نظيف", line: "خطوط مضبوطة وتدريج ناعم — هاد شغلنا الأساسي." },
      { title: "مفتوح كل يوم", line: "سبعة أيام بالأسبوع، لحد 11 بالليل." },
    ],
    locEyebrow: "الموقع",
    locHeading: "وين بتلاقينا",
    locPlusLabel: "كود بلس",
    locCity: CITY_AR,
    locNote:
      "انسخ كود بلس أو افتح الخريطة مباشرة — بتوصلك عالباب.",
    locOpenMaps: "افتح في خرائط جوجل",
    locMapTitle: `خريطة موقع ${NAME_AR} في عمّان`,
    contactEyebrow: "احجز دورك",
    contactHeading: "جاهز؟",
    contactLine: "رنّ علينا أو ابعتلنا رسالة عالواتساب. بنردّ بسرعة.",
    contactPhoneLabel: "الهاتف",
    contactWaLabel: "واتساب",
    contactWaValue: "ابعتلنا رسالة",
    hoursHeading: "أوقات الدوام",
    openNow: "مفتوح الآن",
    closedNow: "مسكّر الآن",
    footerRights: `${NAME_AR} — ${CITY_AR}`,
    footerRate: "قيّمنا على جوجل",
    days: {
      Saturday: "السبت",
      Sunday: "الأحد",
      Monday: "الاثنين",
      Tuesday: "الثلاثاء",
      Wednesday: "الأربعاء",
      Thursday: "الخميس",
      Friday: "الجمعة",
    },
    timeFmt: AR_TIME,
  },

  en: {
    htmlLang: "en",
    title: `${NAME} — Barber Shop in Amman | ${NAME_AR}`,
    description: `A men's barbershop in Amman. Haircuts, skin fades, beard work and hot towel shaves. Open every day until 11 PM. Rated ${RATING} by ${REVIEW_COUNT} people on Google. Book on WhatsApp.`,
    ogAlt: `The ${NAME} storefront in Amman with its red awning`,
    skip: "Skip to content",
    navItems: [
      { id: "about", label: "About" },
      { id: "services", label: "Services" },
      { id: "gallery", label: "The Shop" },
      { id: "trust", label: "Rating" },
      { id: "location", label: "Find Us" },
      { id: "contact", label: "Book" },
    ],
    langSwitch: "ع",
    langSwitchAria: "التبديل إلى العربية",
    heroEyebrow: "Barber shop · Amman",
    heroLockup: NAME_AR,
    heroTagline: "Sharp lines. Every single time.",
    heroSub:
      "Open every day, 9 AM to 11 PM. Message us on WhatsApp and grab your slot before you come.",
    ctaCall: "Call us",
    ctaWhatsapp: "WhatsApp",
    heroRating: `from ${REVIEW_COUNT} Google reviews`,
    heroScroll: "Scroll",
    ticker: [
      `${RATING} ★ on Google Maps`,
      `${REVIEW_COUNT} reviews`,
      "Open every day until 11 PM",
      "Sterilised tools",
      "Clean fades, sharp lines",
      "Amman",
    ],
    aboutEyebrow: "About",
    aboutHeading: "Short story.",
    aboutBody: [
      "A men's barbershop in Amman — a chair, a mirror, and work that holds up.",
      "Open every single day, 9 AM till 11 PM. No day off.",
      `And ${REVIEW_COUNT} people put us at ${RATING} on Google. That's the whole story, and it's enough.`,
    ],
    aboutQuote: "Right the first time.",
    servicesEyebrow: "Services",
    servicesHeading: "What we do",
    servicesNote:
      "Pricing depends on the work — ask us on WhatsApp and you'll get an answer straight away.",
    askPrice: "Ask about pricing",
    galleryEyebrow: "Inside",
    galleryHeading: "See the shop",
    galleryStatLabel: "Google reviews",
    captions: {
      interiorWide: "Inside the shop — chairs, mirrors and the product wall",
      barberAtWork: "Haircut",
      washStation: "The wash station, with a window onto Amman",
      interiorChairs: "Barber chairs and mirrors",
      beardComb: "Beard trim and shape-up",
      razorLineup: "Razor line-up",
      kidCut: "Kids haircut",
      storefront: "The storefront",
    },
    // facts.json names no individual, so the sign's personal name is not
    // transcribed here either.
    alts: {
      storefront:
        "The MAKKAWI BARBERSHOP storefront in Amman — a red awning carrying the shop name, with the lit interior visible through the glass",
      interiorWide:
        "Inside MAKKAWI BARBERSHOP — black barber chairs, tall mirrors, wooden stations and a wall of hair products",
      barberAtWork:
        "A barber in a MAKKAWI BARBER SHOP polo cutting a client's hair with scissors and comb",
      washStation:
        "The hair-wash chair beside a window looking out over Amman at dusk",
      interiorChairs:
        "Black leather barber chairs and tall mirrors along a white wall inside the shop",
      beardComb: "A comb and scissors shaping a client's trimmed beard",
      razorLineup:
        "A straight razor edging the temple and brow line with precision",
      kidCut: "A smiling young boy in the barber chair mid-haircut",
    },
    lightboxClose: "Close",
    trustEyebrow: "Rating",
    trustHeading: "The number does the talking",
    trustOutOf: "out of 5",
    trustReviewsLabel: "Google reviews",
    trustCaption: "Ratings taken from our Google Business profile.",
    trustReadAll: `Read all ${REVIEW_COUNT} reviews on Google`,
    trustLeave: "Leave a review",
    craft: [
      { title: "Sterilised tools", line: "Clean, sterilised tools for every client. No exceptions." },
      { title: "Clean fades", line: "Sharp lines and a smooth gradient — that's the core of the job." },
      { title: "Open every day", line: "Seven days a week, right through to 11 PM." },
    ],
    locEyebrow: "Location",
    locHeading: "Where to find us",
    locPlusLabel: "Plus Code",
    locCity: CITY_EN,
    locNote:
      "Copy the Plus Code or open the map directly — it'll take you to the door.",
    locOpenMaps: "Open in Google Maps",
    locMapTitle: `Map showing ${NAME} in Amman`,
    contactEyebrow: "Book",
    contactHeading: "Ready?",
    contactLine: "Give us a ring or drop a WhatsApp message. We answer fast.",
    contactPhoneLabel: "Phone",
    contactWaLabel: "WhatsApp",
    contactWaValue: "Send a message",
    hoursHeading: "Opening hours",
    openNow: "Open now",
    closedNow: "Closed now",
    footerRights: `${NAME} — ${CITY_EN}`,
    footerRate: "Rate us on Google",
    days: {
      Saturday: "Saturday",
      Sunday: "Sunday",
      Monday: "Monday",
      Tuesday: "Tuesday",
      Wednesday: "Wednesday",
      Thursday: "Thursday",
      Friday: "Friday",
    },
    timeFmt: EN_TIME,
  },
};

export { PHONE_DISPLAY, PLUS_CODE, RATING, REVIEW_COUNT, NAME };

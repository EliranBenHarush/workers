export type JobCategory =
  | "חשמלאי"
  | "שרברב"
  | "נגר"
  | "צבעי"
  | "מזגנים"
  | "גינון"
  | "ניקיון"
  | "הובלות"
  | "אינסטלטור"
  | "שיפוצניק"
  | "מנעולן"
  | "טכנאי מחשבים"
  | "אחר";

export const JOB_CATEGORIES: JobCategory[] = [
  "חשמלאי",
  "שרברב",
  "נגר",
  "צבעי",
  "מזגנים",
  "גינון",
  "ניקיון",
  "הובלות",
  "אינסטלטור",
  "שיפוצניק",
  "מנעולן",
  "טכנאי מחשבים",
  "אחר",
];

export const CITIES = [
  "תל אביב",
  "ירושלים",
  "חיפה",
  "ראשון לציון",
  "פתח תקווה",
  "אשדוד",
  "נתניה",
  "באר שבע",
  "בני ברק",
  "רמת גן",
  "גבעתיים",
  "חולון",
  "בת ים",
  "הרצליה",
  "כפר סבא",
  "רעננה",
  "רחובות",
  "אשקלון",
  "עפולה",
  "נהריה",
  "אלעד",
  "מודיעין",
  "לוד",
  "רמלה",
  "קריית גת",
  "אחר",
];

export interface Job {
  id?: string;
  category: JobCategory;
  description: string;
  city: string;
  phone: string;
  name: string;
  createdAt: Date | null;
  status: "open" | "closed";
}

export interface Professional {
  id?: string;
  name: string;
  phone: string;
  email: string;
  categories: JobCategory[];
  cities: string[];
  description: string;
  createdAt: Date | null;
}

export interface Interest {
  id?: string;
  jobId: string;
  professionalId: string;
  professionalName: string;
  professionalPhone: string;
  createdAt: Date | null;
}

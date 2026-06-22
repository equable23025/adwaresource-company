import type { Dictionary, Locale } from "../types";
import en from "./en";
import th from "./th";

export const dictionaries: Record<Locale, Dictionary> = {
  th,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

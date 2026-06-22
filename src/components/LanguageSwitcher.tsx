"use client";

import { useI18n } from "@/i18n/I18nProvider";
import type { Locale } from "@/i18n/types";

const options: { locale: Locale; label: string }[] = [
  { locale: "th", label: "TH" },
  { locale: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          className={`lang-switch-btn ${locale === option.locale ? "active" : ""}`}
          onClick={() => setLocale(option.locale)}
          aria-pressed={locale === option.locale}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

import { Country } from "@/types/queries";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const countCommonLanguages = (countries: Country[]) => {
  const languageCounts: Record<string, number> = {};
  countries.forEach(country => {
    country.languages.forEach(language => {
      languageCounts[language.name] = (languageCounts[language.name] || 0) + 1;
    });
  });
  return languageCounts;
}
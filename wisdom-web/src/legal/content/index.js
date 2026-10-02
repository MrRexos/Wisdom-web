import es from './es.json';
import en from './en.json';
import ca from './ca.json';
import fr from './fr.json';
import ar from './ar.json';
import zh from './zh.json';

export const legalDocuments = { es, en, ca, fr, ar, zh };
export const LEGAL_LANGUAGES = Object.keys(legalDocuments);

export function normalizeLegalLanguage(language) {
  const primary = String(language || 'en').toLowerCase().split(/[-_]/)[0];
  return LEGAL_LANGUAGES.includes(primary) ? primary : 'en';
}

export function getLegalDocument(language, documentKey) {
  return legalDocuments[normalizeLegalLanguage(language)][documentKey];
}

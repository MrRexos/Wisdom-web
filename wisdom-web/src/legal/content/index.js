import es from './es.json';
import en from './en.json';
import { normalizeLegalLanguage } from '../language';

export const legalDocuments = { es, en };

export function getLegalDocument(language, documentKey) {
  return legalDocuments[normalizeLegalLanguage(language)][documentKey];
}

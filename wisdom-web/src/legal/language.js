import { getBrowserLocale } from '../i18n/detectLocale.js';

export const LEGAL_LANGUAGES = ['es', 'en'];

export function normalizeLegalLanguage(language) {
  const primary = String(language || 'en').toLowerCase().split(/[-_]/)[0];
  return primary === 'es' || primary === 'ca' ? 'es' : 'en';
}

export function getLegalLocale(device) {
  // El catalán usa el texto legal en castellano; el resto respeta las preferencias disponibles.
  return normalizeLegalLanguage(getBrowserLocale(device, ['es', 'ca', 'en']));
}

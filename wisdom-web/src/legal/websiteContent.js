import { getLegalDocument } from './content';
import { getServiceFaqSections } from './serviceFaq';

export function getWebsiteDocument(language, documentKey) {
  const document = getLegalDocument(language, documentKey);
  if (documentKey !== 'faq') return document;
  return {
    ...document,
    title: language === 'es' ? 'Preguntas frecuentes sobre servicios a domicilio' : 'Frequently asked questions about home services',
    description: language === 'es'
      ? 'Resuelve tus dudas sobre limpieza a domicilio, profesionales cerca de ti, precios, reservas y servicios del hogar con Wisdom.'
      : 'Answers about home cleaning, nearby professionals, prices, bookings and home services with Wisdom.',
    lastUpdated: language === 'es' ? 'Última actualización: 7 de octubre de 2026' : 'Last updated: October 7, 2026',
    sections: [...getServiceFaqSections(language), ...document.sections],
  };
}

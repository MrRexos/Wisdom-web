/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { getBrowserLocale, getRequestedLocale } from './detectLocale';
import { getCopy } from './translations';
import { buildServiceFamilies } from './serviceFamilyData';

const LocaleContext = createContext({
  locale: 'en',
  copy: getCopy('en'),
  serviceFamilies: buildServiceFamilies(getCopy('en')),
});

const getPageLocale = () => (typeof window !== 'undefined'
  && getRequestedLocale(window.location.search, undefined, window.location.pathname)) || getBrowserLocale();

export const LocaleProvider = ({ children, initialLocale }) => {
  const [locale, setLocale] = useState(() => initialLocale || getPageLocale());

  useEffect(() => {
    const updateLocale = () => setLocale(getPageLocale());
    window.addEventListener('languagechange', updateLocale);
    return () => window.removeEventListener('languagechange', updateLocale);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const value = useMemo(() => {
    const copy = getCopy(locale);
    return {
      locale,
      copy,
      serviceFamilies: buildServiceFamilies(copy),
    };
  }, [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);

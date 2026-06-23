import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { detectLocale, getInitialLocale, getStoredLocale } from './detectLocale';
import { getCopy } from './translations';
import { buildServiceFamilies } from './serviceFamilyData';

const LocaleContext = createContext({
  locale: 'en',
  copy: getCopy('en'),
  serviceFamilies: buildServiceFamilies(getCopy('en')),
  isDetecting: true,
});

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState(getInitialLocale);
  const [isDetecting, setIsDetecting] = useState(() => !getStoredLocale());

  useEffect(() => {
    let isMounted = true;

    detectLocale()
      .then((nextLocale) => {
        if (!isMounted) return;
        setLocale(nextLocale);
      })
      .finally(() => {
        if (isMounted) setIsDetecting(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => {
    const copy = getCopy(locale);
    return {
      locale,
      copy,
      serviceFamilies: buildServiceFamilies(copy),
      isDetecting,
    };
  }, [locale, isDetecting]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);

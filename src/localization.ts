import { configureLocalization } from '@lit/localize';
import { sourceLocale, targetLocales } from '../lit-localize.json';

export const allLocales = [sourceLocale, ...targetLocales];

const getUrlLocale = () => {
    const params = new URLSearchParams(window.location.search);
    const locale = params.get('lang');
    if (locale && allLocales.includes(locale)) {
        return locale;
    }
    return sourceLocale;
};

export const { getLocale, setLocale } = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: (locale: string) => import(`./generated/locales/${locale}.js`),
});

setLocale(getUrlLocale()); 
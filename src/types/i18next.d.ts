import {en, pt, es} from '../i18n/locales';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'en';
        resources: {
            en: typeof en.translation;
            pt: typeof pt.translation;
            es: typeof es.translation;
        };
    }
}
import i18next, { FormatFunction } from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as locales from './locales';
import { getLocales, getCurrencies } from "react-native-localize";

const formatValue: FormatFunction = (value, format, lng): string => {
    if (!format || !lng) {
        return value;
    }
    
    switch (format) {
        case 'currency':
            return new Intl.NumberFormat(lng, { 
                style: 'currency', 
                currency: getCurrencies()[0] 
            }).format(value / 100);
        
        case 'date':
            return new Intl.DateTimeFormat(lng, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }).format(new Date(value));
        
        case 'dateTime':
            return new Intl.DateTimeFormat(lng, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(new Date(value));
        
        default:
            return value;
    }
};

i18next.use(initReactI18next).init({
    fallbackLng: 'en',
    resources: locales,
    lng: getLocales()[0].languageTag,
    interpolation: {
        format: formatValue
    }
})


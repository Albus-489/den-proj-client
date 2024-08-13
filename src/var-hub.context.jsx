import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('isDarkTheme');
    return savedTheme !== null ? JSON.parse(savedTheme) : false;
};

const getInitialLanguage = () => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
};

const vars = {
    isDarkTheme: getInitialTheme(),
    language: getInitialLanguage(),
};

export const Varhub = React.createContext();

const Store = ({ children }) => {
    const [appVars, setVars] = useState(vars);

    useEffect(() => {
        localStorage.setItem('isDarkTheme', JSON.stringify(appVars.isDarkTheme));
    }, [appVars.isDarkTheme]);

    useEffect(() => {
        localStorage.setItem('language', appVars.language);

        // Update meta tags based on the selected language
        const metaDescription = document.querySelector('meta[name="description"]');
        if (appVars.language === 'fi') {
            metaDescription.setAttribute('content', 'Asunnon remontti - laadukasta palvelua ja ammattitaitoa');
            document.title = 'Asunnon Remontti';
        } else {
            metaDescription.setAttribute('content', 'Apartment renovation - quality service and professionalism');
            document.title = 'Apartment Renovation';
        }
    }, [appVars.language]);

    return (
        <Varhub.Provider value={[appVars, setVars]}>{children}</Varhub.Provider>
    )
}

export default Store;
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

    // theme switch
    useEffect(() => {
        localStorage.setItem('isDarkTheme', JSON.stringify(appVars.isDarkTheme));
    }, [appVars.isDarkTheme]);


    // when language changed
    useEffect(() => {
        localStorage.setItem('language', appVars.language);

        // Update meta tags and document title based on the selected language
        const metaDescription = document.querySelector('meta[name="description"]');
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const twitterTitle = document.querySelector('meta[property="twitter:title"]');
        const twitterDescription = document.querySelector('meta[property="twitter:description"]');

        if (appVars.language === 'fi') {
            metaDescription.setAttribute('content', 'Suunnitteletko asunnon remonttia tai myyntiä? Lue vinkkimme, jotka auttavat päivittämään kotisi toimivammaksi ja tyylikkäämmäksi. Tutustu myös remontin hintoihin ja mitä remontti voi lisätä asunnon arvoon.');
            metaKeywords.setAttribute('content', 'asunnon remontointi, kotiremontti, asunnon myynti, remonttivinkit, remontin hinta, remonttiopas, asunnon arvonnousu');
            ogTitle.setAttribute('content', 'Asunnon remontointi ja myynti | Vinkit ja hinta-arviot');
            ogDescription.setAttribute('content', 'Päivitä kotisi tyylikkäämmäksi ja toimivammaksi asunnon remontilla. Lue parhaat vinkit onnistuneeseen remonttiin ja selvitä, miten remontti voi vaikuttaa asuntosi arvoon.');
            twitterTitle.setAttribute('content', 'Asunnon remontointi ja myynti | Vinkit ja hinta-arviot');
            twitterDescription.setAttribute('content', 'Tarkista vinkkimme asunnon remonttiin ja myyntiin. Selvitä, miten voit päivittää kotisi ja lisätä sen arvoa remontin avulla.');
            document.title = 'Ammattimainen asunnon remontointi Suomessa';
        } else {
            metaDescription.setAttribute('content', 'Planning a home renovation or sale? Read our tips to update your home to be more functional and stylish. Learn about renovation costs and how it can increase your home\'s value.');
            metaKeywords.setAttribute('content', 'home renovation, house renovation, home selling, renovation tips, renovation cost, renovation guide, home value increase');
            ogTitle.setAttribute('content', 'Home Renovation and Selling | Tips and Cost Estimates');
            ogDescription.setAttribute('content', 'Update your home to be more stylish and functional with a renovation. Read our best tips for a successful renovation and find out how it can impact your home’s value.');
            twitterTitle.setAttribute('content', 'Home Renovation and Selling | Tips and Cost Estimates');
            twitterDescription.setAttribute('content', 'Check out our tips for home renovation and selling. Find out how you can update your home and increase its value with a renovation.');
            document.title = 'Professional Apartment Renovation in Finland';
        }
    }, [appVars.language]);

    return (
        <Varhub.Provider value={[appVars, setVars]}>{children}</Varhub.Provider>
    )
}

export default Store;
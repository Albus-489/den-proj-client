import { useContext, useEffect, useState } from 'react';
import './App.css';
import { NavComponent } from './components/nav/nav.component';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/home/home.page';
import { Varhub } from './var-hub.context';
import { FooterComponent } from './components/footer/footer.component';

import enTranslations from './locale_test/i18n/en.json';
import fiTranslations from './locale_test/i18n/fi.json';
import TestComponent from './components/test/test-locale';
import { useTranslation } from 'react-i18next';
import { ServicesComponent } from './pages/services/services.component';

function App() {
  const [vars, setVars] = useContext(Varhub);
  const [t, i18n] = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Update the background color of the >> body << based on the theme
    if (vars.isDarkTheme) {
      document.body.style.backgroundColor = '#27284E'; // Dark background color
    } else {
      document.body.style.backgroundColor = '#FFFFFF'; // Light background color
    }
  }, [vars.isDarkTheme]); // Only re-run the effect if vars.isDarkTheme changes

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/en')) {
      setVars((prevVars) => ({
        ...prevVars,
        language: 'en',
      }));
      i18n.changeLanguage('en');
    } else {
      setVars((prevVars) => ({
        ...prevVars,
        language: 'fi',
      }));
      i18n.changeLanguage('fi');
    }
  }, [setVars, i18n]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setVars((prevVars) => ({
      ...prevVars,
      language: lang,
    }));

    let currentPath = location.pathname;
    currentPath = currentPath.replace(/^\/(en|fi)/, '');

    // Navigate to the same path with the new language prefix
    if (lang === 'en') {
      navigate(`/en${currentPath}${location.search}`);
    } else {
      navigate(`${currentPath}${location.search}`);
    }
  };

  return (
    <div
      className={`${
        vars.isDarkTheme ? 'dark' : ''
      } flex flex-col min-h-screen`}>
      <div className="btns fixed bottom-5 left-5 z-50 rounded-md p-5 flex flex-col gap-5">
        <button
          className="p-2 text-center  w-20 rounded-lg shadow-xl dark:bg-light-background bg-dark-background text-light-background dark:text-light-foreground"
          onClick={() => changeLanguage('en')}>
          EN
        </button>
        <button
          className="p-2 text-center w-20 rounded-lg shadow-xl dark:bg-light-background bg-dark-background text-light-background dark:text-light-foreground"
          onClick={() => changeLanguage('fi')}>
          FI
        </button>
      </div>
      <div>
        <NavComponent />
      </div>
      <main className="flex flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/en" element={<HomePage />} />

          <Route path="/services" element={<ServicesComponent />} />
          <Route path="/en/services" element={<ServicesComponent />} />
        </Routes>
      </main>
      <FooterComponent />
    </div>
  );
}

export default App;

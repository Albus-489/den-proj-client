import { useContext, useEffect, useState } from 'react';
import './App.css';
import { NavComponent } from './components/nav/nav.component';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/home/home.page';
import { Varhub } from './var-hub.context';
import { FooterComponent } from './components/footer/footer.component';
import { useTranslation } from 'react-i18next';
import { ServicesPage } from './pages/services/services.page';

function App() {
  const [vars, setVars] = useContext(Varhub);
  const [t, i18n] = useTranslation();

  useEffect(() => {
    // Update the background color of the >> body << based on the theme
    if (vars.isDarkTheme) {
      document.body.style.backgroundColor = '#27284E'; // Dark background color
    } else {
      document.body.style.backgroundColor = '#FFFFFF'; // Light background color
    }
  }, [vars.isDarkTheme]);

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

  return (
    <div
      className={`${
        vars.isDarkTheme ? 'dark' : ''
      } flex flex-col min-h-screen`}>
      <div>
        <NavComponent />
      </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/en" element={<HomePage />} />

          <Route path="/services" element={<ServicesPage />} />
          <Route path="/en/services" element={<ServicesPage />} />
        </Routes>
      <FooterComponent />
    </div>
  );
}

export default App;

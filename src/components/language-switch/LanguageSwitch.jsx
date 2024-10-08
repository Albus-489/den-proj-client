import { FiSun, FiMoon } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { Varhub } from '../../var-hub.context';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitch() {
  const [vars, setVars] = useContext(Varhub);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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
    <div className="btns z-50 rounded-md p-3 flex gap-5">
      <button
        className={BtnClassname()}
        onClick={() => changeLanguage('en')}>
        EN
      </button>
      <button
        className={BtnClassname()}
        onClick={() => changeLanguage('fi')}>
        FI
      </button>
    </div>
  );
}

function BtnClassname(){
  const className = "p-1 text-center w-9 h-9 rounded-md shadow-xl dark:bg-light-background bg-dark-background text-light-background dark:text-light-foreground";
  return className;
}

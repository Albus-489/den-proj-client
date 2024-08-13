import React, { useContext, useState } from 'react';

import menu_ico_dark from '../../assets/images/menu_ico_dark.svg';
import close_ico_dark from '../../assets/images/close_ico_dark.svg';
import menu_ico_light from '../../assets/images/menu_ico_light.svg';
import close_ico_light from '../../assets/images/close_ico_light.svg';

import { NavOptions } from '../../assets/collections/nav-options.js';
import { BtnComponent } from '../btn/btn-component.jsx';
import { Link } from 'react-router-dom';
import useWidth from '../../hooks/useWindowWidth.hook.jsx';
import { SideNavComponent } from './sidenav.component.jsx';
import { Varhub } from '../../var-hub.context.jsx';

import asunno_logo from '../../assets/images/asunno_logo.svg';
import asunno_logo_dark from '../../assets/images/asunno_logo_dark.svg';

import './nav.style.css';
import { useTranslation } from 'react-i18next';

export const NavComponent = () => {
  const { t, i18n } = useTranslation();
  const width = useWidth();
  const [isSidenav, setSidenav] = useState(false);
  const [vars, setVars] = useContext(Varhub);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const toggleSidenav = () => {
    setSidenav((prevState) => {
      const newSidenavState = !prevState;
      document.body.style.overflow = newSidenavState ? 'hidden' : 'auto';
      return newSidenavState;
    });
  };

  const toggleTheme = () => {
    setVars((prevVars) => ({
      ...prevVars,
      isDarkTheme: !vars.isDarkTheme,
    }));
  };

  return (
    <div
      className="navbar bg-light-background dark:bg-dark-background dark:text-dark-foreground
                    md:px-18 md:py-8 p-5 max-w-[1200px] my-0 mx-auto 
                    flex items-center justify-between z-40 select-none">
      <div className="navbar-logo cursor-pointer">
        <Link to="/">
          {/* <h1 className="text-2xl text-orange-500">DEN LOGO</h1> */}
          <img
            src={vars.isDarkTheme ? asunno_logo_dark : asunno_logo}
            className="w-[200px]"
            alt=""
          />
        </Link>
      </div>

      {width > 770 ? (
        <div className="navbar-options flex justify-between flex-1">
          <NavOptionsCmp />

          <div className="buttons" onClick={toggleTheme}>
            <BtnComponent
              btnText={vars.isDarkTheme ? t('nav.themes.0') : t('nav.themes.1')}
            />
          </div>
        </div>
      ) : (
        <div>
          {vars.isDarkTheme ? (
            <img
              src={isSidenav ? close_ico_light : menu_ico_light}
              onClick={toggleSidenav}
              alt=""
            />
          ) : (
            <img
              src={isSidenav ? close_ico_dark : menu_ico_dark}
              onClick={toggleSidenav}
              alt=""
            />
          )}
          <>
            {isSidenav && (
              <SideNavComponent
                toggleSideNav={toggleSidenav}
                toggleTheme={toggleTheme}
              />
            )}
          </>
        </div>
      )}
    </div>
  );
};

const NavOptionsCmp = () => {
  const [t, i18n] = useTranslation();
  const langPrefix = i18n.language === 'en' ? '/en' : '';

  return (
    <ul className="links ml-8 flex items-center gap-8">
      {t('nav.options', { returnObjects: true }).map((option, index) => {
        return (
          <li
            key={index}
            className="cursor-pointer hover:text-light-primary1 transition-all ease-in-out duration-100">
            <Link to={`${langPrefix}${option.path}`}>{option.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

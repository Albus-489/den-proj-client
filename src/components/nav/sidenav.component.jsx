import React, { useContext, useState } from 'react';
import { NavOptions } from '../../assets/collections/nav-options.js';
import { Link } from 'react-router-dom';
import { BtnComponent } from '../btn/btn-component.jsx';
import { Varhub } from '../../var-hub.context.jsx';
import { useTranslation } from 'react-i18next';
import ThemeSwitch from '../theme-switch/ThemeSwitch.jsx';
import LanguageSwitch from '../language-switch/LanguageSwitch.jsx';

export const SideNavComponent = ({ toggleSideNav }) => {
  const [t, i18n] = useTranslation()
  const [vars, setVars] = useContext(Varhub);

  const langPrefix = i18n.language === 'en' ? '/en' : '';

  return (
    <div className={`${vars.isDarkTheme ? 'dark' : ''}`}>
      <div className="nc-sidenav absolute top-[18%] left-0 z-10
                      bg-light-background dark:bg-dark-background h-full w-full">

      <div className='flex justify-center items-center mt-5 pt-5 px-10'>
      <div className="buttons flex gap-2 items-center justify-between">
            <LanguageSwitch />
            <ThemeSwitch />
          </div>
        </div>

        <ul className="sidenav-options flex flex-col items-center justify-center lg:gap-[45px] gap-[25px] text-md lg:text-lg mt-10">
          {t('nav.options', { returnObjects: true }).map((option, index) => {
            return (
              <li
                key={index}
                className="cursor-pointer dark:border-2 border-[#ffffff7b] p-2 drop-shadow-2xl shadow w-[60%] md:w-[40%] text-center rounded-lg">
                <Link onClick={toggleSideNav} to={`${langPrefix}${option.path}`}>{option.name}</Link>
              </li>
            );
          })}
        </ul>
        
      </div>
    </div>
  );
};

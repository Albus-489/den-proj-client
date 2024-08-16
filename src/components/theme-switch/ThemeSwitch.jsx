import { FiSun, FiMoon } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { Varhub } from '../../var-hub.context';

export default function ThemeSwitch() {
    const [vars, setVars] = useContext(Varhub)

    const toggleTheme = () => {
        setVars((prevVars) => ({
          ...prevVars,
          isDarkTheme: !vars.isDarkTheme,
        }));
      };

  return (
    <>
      {vars.isDarkTheme ? (
        <FiSun className='cursor-pointer w-5 h-5' onClick={() => toggleTheme()} />
      ) : (
        <FiMoon className='cursor-pointer w-5 h-5' onClick={() => toggleTheme()} />
      )}
    </>
  );
}

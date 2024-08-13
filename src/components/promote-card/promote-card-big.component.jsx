import React, { useState, useContext } from 'react';
import './promote-card.style.css';
import { BtnComponent } from '../btn/btn-component';
import useWindowWidth from '../../hooks/useWindowWidth.hook';
import PromoteCardContext from './promotecard.context';
import { useTranslation } from 'react-i18next';

export const PromoteCardBigComponent = () => {
  const [t, i18n] = useTranslation()
  const [isHovered, setIsHovered] = useState(false);
  const width = useWindowWidth();

  return (
    <div
      className={`promote-card-wrapper relative lg:h-[350px] md:h-[450px] sm:h-[550px] h-[550px] flex justify-center px-16`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <PromoteNoteCmp isHovered={isHovered} />
      <PromoteNoteCmp
        heading={t('promote-card.heading')}
        note={t('promote-card.card-text')}
        isFront={true}
        isHovered={isHovered}
      />
    </div>
  );
};

const PromoteNoteCmp = ({
  heading = '',
  note = '',
  isFront = false,
  isHovered,
}) => {
  const { hoveredFront, defaultFront, hoveredBack, defaultBack } =
    useContext(PromoteCardContext);
    const [t, i18n] = useTranslation()

  return (
    <div
      className={`promote-card
                absolute w-[80%] 
                px-10 max-sm:py-7 py-20 
                flex max-[965px]:flex-col max-[965px]:gap-10 justify-evenly items-center
                transition-all duration-200 ease-linear
                rounded-xl
                ${isHovered & isFront && hoveredFront}
                ${!isHovered & isFront && defaultFront}
                ${!isHovered & !isFront && defaultBack}
                ${isHovered & !isFront && hoveredBack}`}>
      <div className="card-notes">
        <div className={`heading font-bold text-[35px] ${i18n.language === 'fi' && 'break-all'}`}>{heading}</div>
        <div className="text text-[18px] mt-5">{note}</div>
      </div>
      <div className="card-btn">
        {isFront && (
          <a href="#contact-us">
            <BtnComponent
            btnText={t('contact-us-now')}
            btnType="wide"
            className="w-56"
          />
          </a>
        )}
      </div>
    </div>
  );
};

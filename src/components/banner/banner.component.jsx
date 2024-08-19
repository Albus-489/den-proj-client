import React, { useEffect } from 'react';
import './banner.style.css';
import { useTranslation } from 'react-i18next';

const BannerComponent = ({
  speed = 30,
  images,
  isReverse = false,
  alts = [],
  isSecond = false,
}) => {
  return (
    <div className="scroll__inner h-[400px]">
      <div className="scroll__wrapper">
        <SectionsCmp
          speed={speed}
          images={images}
          isReverse={isReverse}
          isSecond={isSecond}
        />
      </div>
    </div>
  );
};
export default BannerComponent;

const SectionsCmp = ({ speed, images, isReverse, isSecond }) => {
  const { t } = useTranslation();

  return (
    <>
      <section
        className={isReverse ? 'scroll__section_reverse' : 'scroll__section'}
        style={{ '--speed': `${speed}s` }}>
        {images.map((image, index) => (
          <div className="image" key={index}>
            <img
              src={image}
              alt={
                !isSecond
                  ? t(`Banner.alts-first.${index}`)
                  : t(`Banner.alts-second.${index}`)
              }
            />
          </div>
        ))}
      </section>
      <section
        className={isReverse ? 'scroll__section_reverse' : 'scroll__section'}
        style={{ '--speed': `${speed}s` }}>
        {images.map((image, index) => (
          <div className="image" key={index}>
            <img
              src={image}
              alt={
                !isSecond
                  ? t(`Banner.alts-first.${index}`)
                  : t(`Banner.alts-second.${index}`)
              }
            />
          </div>
        ))}
      </section>
    </>
  );
};

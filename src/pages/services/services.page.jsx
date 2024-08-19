import React from 'react';
import { MainComponent } from '../../components/Main/Main.component';
import { useTranslation } from 'react-i18next';
import { ServiceCardComponent } from '../../components/ServiceCard/Service-card.component';

export const ServicesPage = () => {
  const { t } = useTranslation();

  return (
    <MainComponent>
      <div className="flex flex-col w-full pt-10">
        {/* <HeadingCmp /> */}
        <div className='service-cards flex flex-col gap-5'>
        {t('services-page', { returnObjects: true }).map((item, index) => {
          return (
            <ServiceCardComponent
              headingText={t(`services-page.${index}.heading.text`)}
              content={t(`services-page.${index}.content`, {returnObjects:true})}
              img={t(`services-page.${index}.heading.image`)}
              alt={t(`services-page.${index}.heading.alt`)}
            />
          );
        })}
        </div>
      </div>
    </MainComponent>
  );
};

const HeadingCmp = ({ isBottom = false }) => {
  const [t, i18n] = useTranslation();

  return (
    <div
      className={`px-11 ${
        i18n.language === 'fi' && 'break-all'
      } flex flex-col justify-center items-center`}>
      <h1
        style={{ wordBreak: 'anywhere' }}
        className="homepage-column flex flex-col 
                     items-center justify-center
                     text-[48px] font-bold text-center leading-normal">
        {isBottom
          ? t('heading-cmp.bottom.heading')
          : t('heading-cmp.top.heading')}
      </h1>

      <p className="text-start text-[18px] my-5">
        {isBottom ? t('heading-cmp.bottom.text') : t('heading-cmp.top.text')}
      </p>
    </div>
  );
};

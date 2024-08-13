// HomePage.js
import React, { useContext } from 'react';
import { BtnComponent } from '../../components/btn/btn-component';
import HomePageContext, { HomePageProvider } from './home.context';
import BannerComponent from '../../components/banner/banner.component';
import { FeaturesComponent } from '../../components/features/features.component';
import {
  featuresContentFirst,
  featuresContentSecond,
} from '../../assets/collections/features-content.collection';
import { AboutUsCpmponent } from '../../components/about-us/about-us.component';
import { PromoteCardBigComponent } from '../../components/promote-card/promote-card-big.component';
import { CardComponentProvider } from '../../components/promote-card/promotecard.context';
import { useTranslation } from 'react-i18next';

export const HomePage = () => {
  const { heroImages } = useContext(HomePageContext);
  const [t, i18n] = useTranslation()
  return (
    <HomePageProvider>
      <div className="home-page dark:text-dark-foreground select-none my-0 mx-auto max-w-[1800px] md:shadow-inner-light md:dark:shadow-inner-daynight-dim">
        <div className="p-10 max-sm:px-2 grid grid-flow-col auto-cols-fr gap-2 max-lg:grid-flow-row">
          <HeadingCmp />
          <AboutUsCpmponent />
        </div>
        <div className="mb-5"></div>
        <BannerComponent speed={30} images={heroImages.slice(0, 5)} />
        <div className="mb-5"></div>
        <BannerComponent
          speed={20}
          images={heroImages.slice(5)}
          isReverse={true}
        />
        <div className="mb-10"></div>

        <FeaturesComponent featuresContent={t('features.firstInstance', {returnObjects: true})} />
        <div className="mb-16"></div>
        <div className="mb-10">
            <PromoteCardBigComponent />
        </div>
        <div className="mb-16"></div>
        <FeaturesComponent
          featuresContent={t('features.secondInstance', {returnObjects: true})}
          isReverse={true}
          aspect="square"
        />
        <div className="mb-16"></div>
        <HeadingCmp isBottom={true} />
        <div className="flex justify-center">
          <a href="#contact-us">
            <BtnComponent
              className="w-[160px] h-[50px]"
              btnType="wide"
              btnText={t('contact-us-now')}
            />
          </a>
        </div>
        <div className="mb-16"></div>
      </div>
    </HomePageProvider>
  );
};

const HeadingCmp = ({ isBottom = false }) => {

  const [t, i18n] = useTranslation()

  return (
    <div className="px-11">
      <h1
      style={{wordBreak:'anywhere'}}
        className="homepage-column flex flex-col 
                     items-center justify-center 
                     text-[48px] font-bold text-center leading-normal">
        {isBottom ? t('heading-cmp.bottom.heading') : t('heading-cmp.top.heading')}
      </h1>

      <p className="text-start text-[18px] my-5">
        {isBottom ? t('heading-cmp.bottom.text') : t('heading-cmp.top.text')}
      </p>
    </div>
  );
};

const ButtonsCmp = () => {
  return (
    <div className="buttons max-sm:flex-col max-sm:px-4 flex justify-center items-center gap-5">
      <BtnComponent
        btnType="wide"
        btnWidth="190px"
        btnText="Get a Free Quote"
        className="w-[190px] max-sm:w-full"
      />
      <BtnComponent
        btnType="wide-outline"
        btnWidth="190px"
        btnText="View Our Portfolio"
        className="w-[190px] max-sm:w-full"
      />
    </div>
  );
};

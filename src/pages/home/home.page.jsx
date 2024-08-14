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
import { ContactUsCpmponent } from '../../components/about-us/contact-us.component';
import { PromoteCardBigComponent } from '../../components/promote-card/promote-card-big.component';
import { CardComponentProvider } from '../../components/promote-card/promotecard.context';
import { useTranslation } from 'react-i18next';
import f1 from '../../assets/images/features/f1.jpg'
import f2 from '../../assets/images/features/f2.jpg'
import f3 from '../../assets/images/features/f3.jpg'
import f4 from '../../assets/images/features/f4.jpg'
import f5 from '../../assets/images/features/f5.jpg'
import f6 from '../../assets/images/features/f6.jpg'

export const HomePage = () => {
  const { heroImages } = useContext(HomePageContext);
  const featuresImagesFirst = [f1, f2, f3]
  const featuresImagesSecond = [f4, f5, f6]
  const [t, i18n] = useTranslation()
  return (
    <HomePageProvider>
      <div className="home-page dark:text-dark-foreground select-none my-0 mx-auto max-w-[1800px] md:shadow-inner-light md:dark:shadow-inner-daynight-dim">
        <div className="homepage-contact-us p-10 max-sm:px-2 grid grid-flow-col auto-cols-fr gap-2 max-lg:grid-flow-row">
          <HeadingCmp />
          <ContactUsCpmponent />
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
        <div className="mb-16 max-sm:mt-[150px]"></div>
        <FeaturesComponent
          featuresContent={t('features.secondInstance', {returnObjects: true})}
          isReverse={true}
          aspect="square"
          imgs={featuresImagesSecond}
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
    <div className={`px-11 ${i18n.language === 'fi' && 'break-all'}`}>
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
import React, { useContext } from 'react';
import fb_dark_ico from '../../assets/images/social/dark/facebook.svg';
import insta_dark_ico from '../../assets/images/social/dark/instagram.svg';
import yt_dark_ico from '../../assets/images/social/dark/youtube.svg';
import x_dark_ico from '../../assets/images/social/dark/twitter.svg';
import lin_dark_ico from '../../assets/images/social/dark/linkedin.svg';
import fb_ico from '../../assets/images/social/light/facebook.svg';
import insta_ico from '../../assets/images/social/light/instagram.svg';
import yt_ico from '../../assets/images/social/light/youtube.svg';
import x_ico from '../../assets/images/social/light/twitter.svg';
import lin_ico from '../../assets/images/social/light/linkedin.svg';

import { Varhub } from '../../var-hub.context';
import { useTranslation } from 'react-i18next';

const policies = ['#privacy-policy', '#terms-of-service', 'Cookie Policy'];

export const FooterComponent = ({ footer_position = '' }) => {
  return (
    <footer className="footer mt-5 dark:bg-[#112342] bg-light-accent1">
      <FooterTopCmp />
      <DividerCmp />
      <FooterBottomCmp />
    </footer>
  );
};

const FooterTopCmp = () => {
  const [vars, setVars] = useContext(Varhub);
  const { t } = useTranslation();

  const content = [
    {
      name: 'Services',
      items: [
        'Home Renovation',
        'Kitchen Remodeling',
        'Bathroom Renovation',
        'About Us',
        'Contact Us',
      ],
    },
    {
      name: 'Company',
      items: [
        'FAQs',
        'Testimonials',
        'Privacy Policy',
        'Terms of Service',
        'Sitemap',
      ],
    },
    {
      name: 'Connect with us',
      items: [
        { pic: vars.isDarkTheme ? fb_ico : fb_dark_ico, name: 'Facebook' },
        {
          pic: vars.isDarkTheme ? insta_ico : insta_dark_ico,
          name: 'Instagram',
        },
        { pic: vars.isDarkTheme ? yt_ico : yt_dark_ico, name: 'YouTube' },
        { pic: vars.isDarkTheme ? x_ico : x_dark_ico, name: 'X' },
        { pic: vars.isDarkTheme ? lin_ico : lin_dark_ico, name: 'LinkedIn' },
      ],
    },
  ];

  return (
    <div
      className={`w-full lg:px-[30%] px-10 py-8 dark:text-dark-foreground max-sm:text-center max-sm:gap-4 flex max-sm:flex-col justify-between items-center`}>
      {content.map((item, parentIndex) => {
        const columns = ['services-content', 'company-content'];
        return parentIndex < 2 ? (
          <>
            <div className="flex flex-col gap-2" key={parentIndex}>
              <span className="font-bold text-lg mb-3" key={`s${parentIndex}`}>
                {parentIndex < 1
                  ? t('footer.headings.services')
                  : t('footer.headings.copmpany')}
              </span>

              {item.items.map((text, index) => {
                return text === 'Contact Us' ? (
                  <a href="#contact-us" key={index}>
                    {t(`footer.content.services-content.${index}`)}
                  </a>
                ) : (
                  <div className="cursor-pointer" key={index}>
                    {t(`footer.content.${columns[parentIndex]}.${index}`)}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <span className="font-bold text-lg mb-3">
                {t('footer.headings.connect')}
              </span>

              {item.items.map((socialItem, index) => {
                return (
                  <div className="flex gap-2" key={index}>
                    <img
                      className="w-[25px]"
                      src={socialItem.pic}
                      key={`i${index}`}
                      alt=""
                    />
                    <div className="cursor-pointer" key={`d${index}`}>
                      {socialItem.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

const DividerCmp = () => {
  return (
    <div className="w-[90%] lg:w-[60%] my-0 mx-auto border-b-[3px] border-light-foreground dark:border-dark-foreground"></div>
  );
};

const FooterBottomCmp = () => {
  return (
    <div
      className={`w-full h-44 px-4 md:px-[20%] py-8 dark:text-dark-foreground
                  flex justify-between max-sm:flex-col max-sm:items-center`}>
      <div className="copyright">
        &copy; 2024 Den Company. All rights reserved.
      </div>
      <div className="policies">
        <ul>
          {policies.map((item, index) => {
            return (
              <li className="cursor-pointer" key={index}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

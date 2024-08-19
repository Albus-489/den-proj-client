import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import f1 from '../../assets/images/features/f1.jpg';
import f2 from '../../assets/images/features/f2.jpg';
import f3 from '../../assets/images/features/f3.jpg';

export const FeaturesComponent = ({
  featuresContent,
  isReverse = false,
  aspect = 'video',
  imgs = [f1, f2, f3],
}) => {
  const { t } = useTranslation();
  const [selectedFeature, setSelectedFeature] = useState(0);

  const toggleSelected = (index) => {
    setSelectedFeature(index);
  };

  return (
    <div
      className={`features_instance ${isReverse && 'flex-row-reverse'} 
                  flex justify-between items-center 
                  max-md:flex-col gap-20 px-2 sm:px-10 md:p-9 max-sm:gap-8 md:gap-14 lg:p-15`}>
      <FeaturesImageCmp 
        featureImage={imgs[selectedFeature]} 
        aspect={aspect} 
        alt={t(featuresContent[selectedFeature]?.alt || '')} 
      />
      <FeaturesHeadingsCmp
        featuresContent={featuresContent}
        isSelectedFeature={selectedFeature}
        toggleSelected={toggleSelected}
      />
    </div>
  );
};

const FeaturesImageCmp = ({ featureImage, aspect, alt = '' }) => {
  return (
    <div className="features__image max-md:w-full w-1/2 flex justify-center items-center">
      <img
        className={`w-full max-sm:max-h-[210px] max-h-[400px] aspect-${aspect} object-cover rounded-lg`}
        src={featureImage}
        alt={alt}
      />
    </div>
  );
};

const FeaturesHeadingsCmp = ({
  featuresContent,
  isSelectedFeature,
  toggleSelected,
}) => {
  const { t } = useTranslation();

  return (
    <div className="features__headings w-full md:w-1/2 flex flex-col items-stretch gap-8 md:gap-16 select-none">
      {featuresContent.map((item, index) => (
        <div
          className={`features_text w-full cursor-pointer px-8 py-2 flex flex-col gap-5
            ${index === isSelectedFeature ? 'border-l-2 border-dark-background dark:border-dark-foreground' : ''}`}
          onClick={() => toggleSelected(index)}
          role="button"
          key={index}>
          <div>
            <h2 className="text-3xl font-bold">{t(item.heading)}</h2>
          </div>
          <div>
            <p>{t(item.text)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

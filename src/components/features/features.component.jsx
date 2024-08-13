import React, { useEffect, useState } from 'react';
import f1 from '../../assets/images/features/f1.jpg';
import f2 from '../../assets/images/features/f2.jpg';
import f3 from '../../assets/images/features/f3.jpg';

export const FeaturesComponent = ({
  featuresContent,
  isReverse = false,
  aspect = 'video',
  imgs = [f1, f2, f3]
}) => {
  const [featureImage, setFeatureImage] = useState(
    imgs[0]
  );
  const [isSelectedFeature, setSelectedFeature] = useState(0);
  const borderedFeature =
    'border-l-2 border-dark-background dark:border-dark-foreground';

  const toggleSelected = (index) => {
    setFeatureImage(imgs[index]);
    setSelectedFeature(index);
  };

  useEffect(() => {
    console.log(featureImage);
  }, []);

  return (
    <div
      className={`features_instance ${isReverse && 'flex-row-reverse'} 
                  flex justify-between items-center 
                  max-md:flex-col gap-20 px-10 sm:px-20 md:p-9 max-sm:gap-8 md:gap-14 lg:p-15`}>
      <FeaturesImageCmp featureImage={featureImage} aspect={aspect} />
      <FeaturesHeadingsCmp
        featuresContent={featuresContent}
        borderedFeature={borderedFeature}
        isSelectedFeature={isSelectedFeature}
        toggleSelected={toggleSelected}
      />
    </div>
  );
};

const FeaturesImageCmp = ({ featureImage, aspect }) => {
  return (
    <div className="features__image max-md:w-full w-1/2 flex justify-center items-center">
      <img
        className={`w-full max-sm:max-h-[210px] max-h-[400px] aspect-${aspect} object-cover rounded-lg`}
        src={featureImage}
        alt="feature image"
      />
    </div>
  );
};

const FeaturesHeadingsCmp = ({
  featuresContent,
  borderedFeature,
  isSelectedFeature,
  toggleSelected,
}) => {
  return (
    <div className="features__headings w-full md:w-1/2 flex flex-col items-stretch gap-8 md:gap-16 select-none">
      {featuresContent.map((item, index) => {
        return (
          <div
            className={`features_text w-full cursor-pointer px-8 py-2 flex flex-col gap-5
              ${index === isSelectedFeature ? borderedFeature : ''}`}
            onClick={() => toggleSelected(index)}
            role="button"
            key={index}>
            <div>
              <h2 className="text-3xl font-bold">{item.heading}</h2>
            </div>
            <div>
              <p>{item.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

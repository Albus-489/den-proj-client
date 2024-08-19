import React, { useEffect } from 'react';

export const ServiceCardComponent = ({
  headingText = '',
  img,
  alt = '',
  content = [],
}) => {
  useEffect(() => {
    console.log(content);
  }, []);
  return (
    <div className="service-card shadow-lg flex w-[95%] my-0 mx-auto rounded-l-lg dark:bg-[#14101036]">
      <div className="services-list w-1/2 ">
        <h1 className="text-[42px] py-3 pl-5 rounded-tl-lg mb-3 border-dark-background dark:border-dark-foreground border-b-2 dark:bg-[#fff4] ">
          {headingText}
        </h1>
        <ul className="content pl-20 text-lg">
          {content.map((item, index) => {
            return (
              <li className="" key={index}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="service-picture w-1/2">
        <img className="object-cover rounded-r-md" src={img} alt={alt} />
      </div>
    </div>
  );
};

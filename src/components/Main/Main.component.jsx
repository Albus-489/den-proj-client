import React from 'react';

export const MainComponent = ({ children }) => {
  return (
    <main className="home-page dark:text-dark-foreground select-none my-0 mx-auto max-w-[1800px] md:shadow-inner-light md:dark:shadow-inner-daynight-dim">
      {children}
    </main>
  );
};

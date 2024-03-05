import React, { createContext, useContext, useState } from 'react';

const RadiusContext = createContext();
const SetRadiusContext = createContext();

export const useRadius = () => useContext(RadiusContext);
export const useSetRadius = () => useContext(SetRadiusContext);

export const RadiusProvider = ({ children }) => {
  const [radius, setRadius] = useState(500);

  return (
    <RadiusContext.Provider value={radius}>
      <SetRadiusContext.Provider value={setRadius}>
        {children}
      </SetRadiusContext.Provider>
    </RadiusContext.Provider>
  );
};
import { createContext, useContext, useState } from "react";

export const CurrentSearchContext = createContext();
export const SetCurrentSearchContext = createContext();

export const useCurrentSearch = () => useContext(CurrentSearchContext);
export const useSetCurrentSearch = () => useContext(SetCurrentSearchContext);

export const CurrentSearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CurrentSearchContext.Provider value={searchQuery}>
      <SetCurrentSearchContext.Provider value={setSearchQuery}>
        {children}
      </SetCurrentSearchContext.Provider>
    </CurrentSearchContext.Provider>
  );
};

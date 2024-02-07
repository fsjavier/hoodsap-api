import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [errors, setErrors] = useState({});

  const getUser = async () => {
    try {
      const data = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (error) {
      setErrors(error);
      console.log(errors);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};

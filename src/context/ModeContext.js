import { createContext, useContext, useState } from "react";

const InitialState = {
  darkMode: true,
  isNavOpen: false,
};

const ModeContext = createContext();

export const ModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(InitialState);

  const darkModeFunc = () => {
    setMode((prev) => ({ ...prev, darkMode: true }));
  };

  const lightModeFunc = () => {
    setMode((prev) => ({ ...prev, darkMode: false }));
  };
  const toggleModeFunc = () => {
    setMode((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const openNavFunc = () => {
    setMode((prev) => ({ ...prev, isNavOpen: true }));
  };

  const closeNavFunc = () => {
    setMode((prev) => ({ ...prev, isNavOpen: false }));
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        darkModeFunc,
        lightModeFunc,
        toggleModeFunc,
        openNavFunc,
        closeNavFunc,
      }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => useContext(ModeContext);

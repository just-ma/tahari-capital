import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext<{
  scrollTop: number;
}>({
  scrollTop: 0,
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = () => {
    setScrollTop(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const value = useMemo(
    () => ({
      scrollTop,
    }),
    [scrollTop]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;

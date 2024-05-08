import { useState, useEffect, useMemo } from "react";
import { MOBILE_WIDTH } from "../constants";

export default function useWindowSize() {
  const [screenSize, setScreenSize] = useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  const handleResize = () => {
    setScreenSize({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return useMemo(() => {
    const isMobile = screenSize.windowWidth <= MOBILE_WIDTH;

    return {
      ...screenSize,
      isMobile,
      isMobilePortrait:
        isMobile && screenSize.windowWidth < screenSize.windowHeight,
      isMobileLandscape:
        isMobile && screenSize.windowWidth >= screenSize.windowHeight,
    };
  }, [screenSize]);
}
